// ---------------------------------------------------------------------------
// Fact Check engine — cache-first $0 API waterfall (Spec 2, 2026-11-22;
// ~/workspace/user/files/free_apis_fact_check_spec_261122_214213_5_wgpv.pdf).
//
// Server-only: uses fetch + process.env, no Next.js or database imports —
// the own-store lookup is injected as a callback so this module can be
// tested offline with stubbed fetch.
//
// Order (each step optional — skipped cleanly when its key is absent):
//   -1. Link fetch (2026-11-22 redesign) — when the input is a bare link
//      with no claim text: open the page (3s, 200KB cap, browser
//      User-Agent), extract its title + readable text, and check THAT
//      text. A failed fetch ends the run with fetchFailed — never invent
//      page content.
//   0. Rule-based extraction (free, instant) — produces the checkable text
//      the cache lookup needs. Groq extraction (step 3) only runs on a
//      cache miss, so no tokens are spent on claims we already verified.
//   1. Google Fact Check Tools API claims.search (GOOGLE_FACT_CHECK_API_KEY)
//      — verified ClaimReview records, BEFORE any web search.
//   2. The site's own fact-check store (Postgres keyword cache, injected
//      callback) — our verified verdicts.
//      -> A hit at step 1 or 2 ends the run: no further API spend.
//   3. Groq openai/gpt-oss-20b (GROQ_API_KEY) — claim extraction /
//      decomposition; falls back to the rule-based result on any failure.
//   4. Tavily search_depth="basic" (TAVILY_API_KEY, 1 credit/query — NEVER
//      "advanced" unless basic lacks primary sources); Serper
//      (SERPER_API_KEY) as news/backup when Tavily is absent or empty.
//   5. Wayback Machine Availability + CDX APIs (NO key) — original publish
//      timestamp of the submitted "seen on" URL, when one was given.
//   6. Groq openai/gpt-oss-120b (GROQ_API_KEY) — stance / verdict
//      synthesis from the retrieved evidence; Google Gemini (GEMINI_API_KEY)
//      does the same synthesis when no Groq key is set (Gemini screenshot
//      OCR activates when the form gains an image upload — no image input
//      exists in v1, so no OCR call is made here).
//   7. OpenRouter :free models (OPENROUTER_API_KEY) — ONLY when a Groq or
//      Gemini synthesis attempt failed or rate-limited (HTTP 429).
//   8. Store: verified verdicts live in the site's Article rows (the
//      fact-check store) — Qdrant is DEFERRED to Phase 2. Do NOT build it.
//      Do NOT use Brave Search API (needs a payment card) or Hugging Face
//      Inference (free = $0.10/month) — the spec explicitly excludes them.
//
// HARD RULES (from the spec):
//   - ALL keys are optional env vars. No key => skip the step, degrade to
//     cache + the human-review queue. NEVER call an API without a key,
//     NEVER hardcode or invent a key value.
//   - NEVER invent a verdict. A preliminary assessment is produced ONLY
//     from retrieved evidence, ONLY with confidence >= 40, and is ALWAYS
//     labelled PRELIMINARY / AI-assisted, with citations. Published
//     verdicts stay HUMAN-verified — this path never publishes anything.
//   - NO external API is called during the build (no keys exist yet) —
//     only the no-key degradation path is verified offline.
//   - Time budget: 8s overall, 4s per call — the route must stay inside
//     Vercel Hobby's 10s serverless limit. Steps that would overrun are
//     skipped and recorded, never awaited past the deadline.
// ---------------------------------------------------------------------------

import {
  extractAssertions,
  isFactCheckVerdict,
  type CacheMatch,
  type ExtractedAssertion,
  type FactCheckVerdict,
} from "./factCheck";

export interface WaterfallStep {
  step: string;
  status: "hit" | "miss" | "skipped" | "error";
  detail: string;
}

export interface ExternalFactCheck {
  source: "google-fact-check";
  publisher: string;
  rating: string;
  title: string;
  url: string;
  reviewDate: string | null;
}

export interface EvidenceItem {
  title: string;
  url: string;
  snippet: string;
}

export interface PreliminaryAssessment {
  verdict: FactCheckVerdict;
  confidence: number;
  stance: "supports" | "refutes" | "neutral";
  reasoning: string;
  citations: EvidenceItem[];
  /** Which services produced this assessment (e.g. ["tavily","groq-70b"]). */
  sourcesUsed: string[];
}

export interface WaybackCheck {
  url: string;
  /** First archived snapshot (YYYYMMDDHHMMSS), or null when never archived. */
  firstSeen: string | null;
  status: string;
}

export interface WaterfallResult {
  assertions: ExtractedAssertion[];
  /** Our own verified verdict (Postgres keyword cache), if any. */
  match: CacheMatch | null;
  /** A verified ClaimReview from Google's Fact Check index, if any. */
  externalMatch: ExternalFactCheck | null;
  /** AI-assisted assessment from retrieved evidence — PRELIMINARY only. */
  preliminary: PreliminaryAssessment | null;
  wayback: WaybackCheck | null;
  steps: WaterfallStep[];
  /** True when at least one optional API key is configured. */
  automatedEnabled: boolean;
  /** The linked page, when the input was a bare link that opened. */
  linkedPage: { title: string; url: string } | null;
  /** True when a pasted link could not be opened at all. */
  fetchFailed: boolean;
}

const OVERALL_BUDGET_MS = 8_000;
const PER_CALL_MS = 4_000;

const GOOGLE_FC_URL = "https://factchecktools.googleapis.com/v1alpha1/claims:search";
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const TAVILY_URL = "https://api.tavily.com/search";
const SERPER_URL = "https://google.serper.dev/search";
const GEMINI_BASE = "https://generativelanguage.googleapis.com/v1beta/models";
const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const WAYBACK_AVAILABLE = "https://archive.org/wayback/available";
const WAYBACK_CDX = "https://web.archive.org/cdx/search/cdx";

function env(name: string): string | undefined {
  const v = process.env[name];
  return v && v.trim() !== "" ? v.trim() : undefined;
}

function timedFetch(url: string, init: RequestInit, ms: number): Promise<Response> {
  return fetch(url, { ...init, signal: AbortSignal.timeout(ms) });
}

/** Strip ```json fences and parse; null on any failure (never throws). */
function parseJsonLoose(text: string): unknown {
  try {
    const cleaned = text.replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/, "").trim();
    return JSON.parse(cleaned);
  } catch {
    return null;
  }
}

function clampConfidence(n: unknown): number {
  const v = typeof n === "number" && Number.isFinite(n) ? Math.round(n) : 0;
  return Math.max(0, Math.min(100, v));
}

// ---------------------------------------------------------------------------
// Step 1 — Google Fact Check Tools API claims.search
// ---------------------------------------------------------------------------

async function googleFactCheck(
  query: string,
  key: string,
  budgetMs: number
): Promise<ExternalFactCheck | null> {
  const url =
    `${GOOGLE_FC_URL}?query=${encodeURIComponent(query)}` +
    `&languageCode=en&pageSize=5&key=${encodeURIComponent(key)}`;
  const res = await timedFetch(url, { method: "GET" }, Math.min(PER_CALL_MS, budgetMs));
  if (!res.ok) return null;
  const data = (await res.json()) as {
    claims?: Array<{
      claimReview?: Array<{
        publisher?: { name?: string };
        url?: string;
        title?: string;
        reviewDate?: string;
        textualRating?: string;
      }>;
    }>;
  };
  for (const claim of data.claims ?? []) {
    for (const review of claim.claimReview ?? []) {
      if (review.url && review.textualRating) {
        return {
          source: "google-fact-check",
          publisher: review.publisher?.name ?? "Fact-checker",
          rating: review.textualRating,
          title: review.title ?? "Fact-check",
          url: review.url,
          reviewDate: review.reviewDate ?? null,
        };
      }
    }
  }
  return null;
}

// ---------------------------------------------------------------------------
// Step 3 — Groq extraction (openai/gpt-oss-20b)
// ---------------------------------------------------------------------------

async function groqExtract(
  claim: string,
  key: string,
  budgetMs: number
): Promise<{ assertions: ExtractedAssertion[] | null; status: number | null }> {
  const res = await timedFetch(
    GROQ_URL,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "openai/gpt-oss-20b",
        temperature: 0.1,
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content:
              "You extract checkable factual claims from user-submitted text. Return JSON only: " +
              '{"assertions": [{"text": "...", "checkable": true}]}. Keep each assertion in English. A claim ' +
              "is checkable when it states a concrete fact: a number, date, quote, or something a " +
              "named person or organisation said or did. Drop opinions, questions, jokes and satire.",
          },
          { role: "user", content: claim },
        ],
      }),
    },
    Math.min(PER_CALL_MS, budgetMs)
  );
  // HTTP status is returned on failure so the step detail can tell a bad
  // key (401) apart from a retired model (400/404) — otherwise both look
  // like a silent "extraction failed".
  if (!res.ok) return { assertions: null, status: res.status };
  const data = (await res.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const content = data.choices?.[0]?.message?.content ?? "";
  const parsed = parseJsonLoose(content) as { assertions?: unknown } | null;
  if (!parsed || !Array.isArray(parsed.assertions)) return { assertions: null, status: null };
  const out: ExtractedAssertion[] = [];
  for (const a of parsed.assertions) {
    const item = a as { text?: unknown; checkable?: unknown };
    if (typeof item.text === "string" && item.text.trim().length >= 10) {
      out.push({
        text: item.text.trim(),
        checkable: item.checkable === true,
        reason: item.checkable === true ? "States a checkable fact." : "Too vague to check.",
      });
    }
  }
  return { assertions: out.length > 0 ? out : null, status: null };
}

// ---------------------------------------------------------------------------
// Step 4 — Tavily (basic) + Serper backup
// ---------------------------------------------------------------------------

async function tavilySearch(
  query: string,
  key: string,
  budgetMs: number
): Promise<{ items: EvidenceItem[] | null; status: number | null }> {
  const res = await timedFetch(
    TAVILY_URL,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      // search_depth "basic" = 1 credit/query. NEVER "advanced" (2 credits)
      // unless basic returns no primary sources.
      body: JSON.stringify({ query, search_depth: "basic", max_results: 5, include_answer: false }),
    },
    Math.min(PER_CALL_MS, budgetMs)
  );
  // HTTP status is returned on failure so the step detail can tell a bad
  // key (401) apart from a genuine empty result — otherwise a 401 looks
  // like "No results."
  if (!res.ok) return { items: null, status: res.status };
  const data = (await res.json()) as {
    results?: Array<{ title?: string; url?: string; content?: string }>;
  };
  const items = (data.results ?? [])
    .filter((r) => r.url && r.title)
    .map((r) => ({ title: r.title as string, url: r.url as string, snippet: (r.content ?? "").slice(0, 300) }));
  return { items: items.length > 0 ? items : null, status: null };
}

async function serperSearch(
  query: string,
  key: string,
  budgetMs: number
): Promise<EvidenceItem[] | null> {
  const res = await timedFetch(
    SERPER_URL,
    {
      method: "POST",
      headers: { "X-API-KEY": key, "Content-Type": "application/json" },
      body: JSON.stringify({ q: query, num: 5 }),
    },
    Math.min(PER_CALL_MS, budgetMs)
  );
  if (!res.ok) return null;
  const data = (await res.json()) as {
    organic?: Array<{ title?: string; link?: string; snippet?: string }>;
  };
  const items = (data.organic ?? [])
    .filter((r) => r.link && r.title)
    .map((r) => ({ title: r.title as string, url: r.link as string, snippet: (r.snippet ?? "").slice(0, 300) }));
  return items.length > 0 ? items : null;
}

// ---------------------------------------------------------------------------
// Step 5 — Wayback Availability + CDX (no key needed)
// ---------------------------------------------------------------------------

async function waybackCheck(url: string, budgetMs: number): Promise<WaybackCheck> {
  // Availability first: the closest snapshot to "now" tells us the page
  // existed and when it was first captured near today.
  try {
    const res = await timedFetch(
      `${WAYBACK_AVAILABLE}?url=${encodeURIComponent(url)}`,
      { method: "GET" },
      Math.min(PER_CALL_MS, budgetMs)
    );
    if (res.ok) {
      const data = (await res.json()) as {
        archived_snapshots?: { closest?: { timestamp?: string; status?: string } };
      };
      const ts = data.archived_snapshots?.closest?.timestamp;
      if (ts) return { url, firstSeen: ts, status: "archived" };
    }
  } catch {
    // Fall through to CDX below.
  }
  // CDX: earliest snapshot on record (limit 1, earliest first).
  try {
    const res = await timedFetch(
      `${WAYBACK_CDX}?url=${encodeURIComponent(url)}&output=json&limit=1&filter=statuscode:200`,
      { method: "GET" },
      Math.min(PER_CALL_MS, budgetMs)
    );
    if (res.ok) {
      const data = (await res.json()) as unknown;
      if (Array.isArray(data) && data.length > 1 && Array.isArray(data[1])) {
        const ts = data[1][1];
        if (typeof ts === "string") return { url, firstSeen: ts, status: "archived" };
      }
    }
  } catch {
    // Both Wayback endpoints failed — recorded as "unknown", never fatal.
  }
  return { url, firstSeen: null, status: "unknown" };
}

// ---------------------------------------------------------------------------
// Link fetch — open a pasted link and extract its readable text (2026-11-22
// redesign: the search box accepts a claim OR a link). Server-side only.
// 3s cap, 200KB cap, browser User-Agent, redirects followed. Anything that
// is not an HTML page, is too large, or will not load returns null — the
// caller reports "could not open this link" and NEVER invents page content.
// ---------------------------------------------------------------------------

const LINK_FETCH_MS = 3_000;
const LINK_MAX_BYTES = 200 * 1024;

function decodeEntities(s: string): string {
  return s
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;|&#x27;/gi, "'")
    .replace(/&#(\d+);/g, (_m, n) => String.fromCodePoint(Math.min(0x10ffff, parseInt(n, 10)) || 32))
    .replace(/&#x([0-9a-f]+);/gi, (_m, h) => String.fromCodePoint(Math.min(0x10ffff, parseInt(h, 16)) || 32));
}

function extractPageText(html: string): { title: string; text: string } {
  const titleMatch = html.match(/<title[^>]*>([\s\S]{0,500}?)<\/title>/i);
  const title = titleMatch ? decodeEntities(titleMatch[1].replace(/\s+/g, " ").trim()) : "";
  const body = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<svg[\s\S]*?<\/svg>/gi, " ")
    .replace(/<(nav|header|footer|aside|form|iframe)[\s\S]*?<\/\1>/gi, " ")
    .replace(/<[^>]+>/g, " ");
  const text = decodeEntities(body).replace(/\s+/g, " ").trim();
  return { title, text: text.slice(0, 4000) };
}

async function fetchLinkedPage(
  url: string,
  budgetMs: number
): Promise<{ title: string; text: string } | null> {
  const ms = Math.min(LINK_FETCH_MS, budgetMs);
  if (ms <= 0) return null;
  try {
    const res = await timedFetch(
      url,
      {
        method: "GET",
        headers: {
          "User-Agent":
            "Mozilla/5.0 (compatible; GrowentixFactCheck/1.0; +https://growentix.cloud/fact-check)",
          Accept: "text/html,application/xhtml+xml",
        },
        redirect: "follow",
      },
      ms
    );
    if (!res.ok) return null;
    const type = res.headers.get("content-type") ?? "";
    if (type && !/text\/html|application\/xhtml\+xml/.test(type)) return null;
    const len = res.headers.get("content-length");
    if (len && Number(len) > LINK_MAX_BYTES) return null;
    // Capped body read: never buffer more than LINK_MAX_BYTES, even when
    // the server sends no content-length.
    const reader = res.body?.getReader();
    if (!reader) return null;
    const chunks: Uint8Array[] = [];
    let total = 0;
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      if (value) {
        total += value.length;
        if (total > LINK_MAX_BYTES) {
          try {
            await reader.cancel();
          } catch {
            // Already closed — nothing to do.
          }
          return null;
        }
        chunks.push(value);
      }
    }
    const merged = new Uint8Array(total);
    let offset = 0;
    for (const c of chunks) {
      merged.set(c, offset);
      offset += c.length;
    }
    const html = new TextDecoder().decode(merged);
    const { title, text } = extractPageText(html);
    if (text.length < 100) return null;
    return { title, text };
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Step 6/7 — verdict synthesis (Groq 70B -> OpenRouter :free on 429/error,
// or Gemini when no Groq key is set)
// ---------------------------------------------------------------------------

const SYNTH_SYSTEM =
  "You are a fact-checking assistant. Given a claim and web evidence, judge the stance of the " +
  "evidence toward the claim and suggest a verdict. Return JSON only: " +
  '{"verdict": "TRUE|MOSTLY_TRUE|MISLEADING|FALSE|UNVERIFIED", "confidence": 0-100, ' +
  '"stance": "supports|refutes|neutral", "reasoning": "one or two sentences"}. ' +
  "Base the verdict ONLY on the evidence provided. If the evidence is thin, contradictory or " +
  "missing, use UNVERIFIED with low confidence. Never invent sources, dates or figures.";

function synthesisUserPrompt(claim: string, evidence: EvidenceItem[]): string {
  const lines = evidence
    .map((e, i) => `${i + 1}. ${e.title} — ${e.url}\n   ${e.snippet}`)
    .join("\n");
  return `Claim: ${claim}\n\nEvidence:\n${lines}`;
}

function parseSynthesis(content: string): Omit<PreliminaryAssessment, "citations" | "sourcesUsed"> | null {
  const parsed = parseJsonLoose(content) as {
    verdict?: unknown;
    confidence?: unknown;
    stance?: unknown;
    reasoning?: unknown;
  } | null;
  if (!parsed || typeof parsed.verdict !== "string" || !isFactCheckVerdict(parsed.verdict)) return null;
  const stance =
    parsed.stance === "supports" || parsed.stance === "refutes" || parsed.stance === "neutral"
      ? parsed.stance
      : "neutral";
  return {
    verdict: parsed.verdict,
    confidence: clampConfidence(parsed.confidence),
    stance,
    reasoning: typeof parsed.reasoning === "string" ? parsed.reasoning.slice(0, 500) : "",
  };
}

async function groqSynthesize(
  claim: string,
  evidence: EvidenceItem[],
  key: string,
  budgetMs: number
): Promise<{ assessment: ReturnType<typeof parseSynthesis>; rateLimited: boolean; status: number | null } | null> {
  const res = await timedFetch(
    GROQ_URL,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "openai/gpt-oss-120b",
        temperature: 0.2,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: SYNTH_SYSTEM },
          { role: "user", content: synthesisUserPrompt(claim, evidence) },
        ],
      }),
    },
    Math.min(PER_CALL_MS, budgetMs)
  );
  // HTTP status is returned on failure so the step detail can tell a bad
  // key (401) apart from a retired model (400/404).
  if (!res.ok) return { assessment: null, rateLimited: res.status === 429, status: res.status };
  const data = (await res.json()) as { choices?: Array<{ message?: { content?: string } }> };
  return { assessment: parseSynthesis(data.choices?.[0]?.message?.content ?? ""), rateLimited: false, status: null };
}

async function geminiSynthesize(
  claim: string,
  evidence: EvidenceItem[],
  key: string,
  budgetMs: number
): Promise<ReturnType<typeof parseSynthesis>> {
  const model = env("GEMINI_MODEL") ?? "gemini-2.0-flash";
  const res = await timedFetch(
    `${GEMINI_BASE}/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(key)}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `${SYNTH_SYSTEM}\n\n${synthesisUserPrompt(claim, evidence)}` }] }],
        generationConfig: { responseMimeType: "application/json", temperature: 0.2, maxOutputTokens: 1200 },
      }),
    },
    Math.min(PER_CALL_MS, budgetMs)
  );
  if (!res.ok) return null;
  const data = (await res.json()) as {
    candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
  };
  return parseSynthesis(data.candidates?.[0]?.content?.parts?.[0]?.text ?? "");
}

async function openRouterSynthesize(
  claim: string,
  evidence: EvidenceItem[],
  key: string,
  budgetMs: number
): Promise<ReturnType<typeof parseSynthesis>> {
  const model = env("OPENROUTER_MODEL") ?? "meta-llama/llama-3.1-8b-instruct:free";
  const res = await timedFetch(
    OPENROUTER_URL,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://growentix.cloud",
        "X-Title": "Growentix Fact Check",
      },
      body: JSON.stringify({
        model,
        temperature: 0.2,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: SYNTH_SYSTEM },
          { role: "user", content: synthesisUserPrompt(claim, evidence) },
        ],
      }),
    },
    Math.min(PER_CALL_MS, budgetMs)
  );
  if (!res.ok) return null;
  const data = (await res.json()) as { choices?: Array<{ message?: { content?: string } }> };
  return parseSynthesis(data.choices?.[0]?.message?.content ?? "");
}

// ---------------------------------------------------------------------------
// Orchestrator
// ---------------------------------------------------------------------------

export async function runFactCheckWaterfall(opts: {
  claim: string;
  claimUrl?: string;
  /** Own-store lookup: keyword-overlap match over verified fact-check rows. */
  findOwnCache: (checkableText: string) => Promise<CacheMatch | null>;
}): Promise<WaterfallResult> {
  const started = Date.now();
  const remaining = () => Math.max(0, OVERALL_BUDGET_MS - (Date.now() - started));
  const steps: WaterfallStep[] = [];
  const groqKey = env("GROQ_API_KEY");
  const tavilyKey = env("TAVILY_API_KEY");
  const serperKey = env("SERPER_API_KEY");
  const googleFcKey = env("GOOGLE_FACT_CHECK_API_KEY");
  const geminiKey = env("GEMINI_API_KEY");
  const openRouterKey = env("OPENROUTER_API_KEY");
  const automatedEnabled = Boolean(
    groqKey || tavilyKey || serperKey || googleFcKey || geminiKey || openRouterKey
  );

  // Link fetch (redesign 2026-11-22): when the input is a bare link with
  // no claim text, open the page first and check what it says. A failed
  // fetch ends the run honestly — the visitor is told the link would not
  // open and can send it to the editors instead. Never invent page content.
  let claimText = opts.claim;
  let linkedPage: { title: string; url: string } | null = null;
  let fetchFailed = false;
  if (!claimText.trim() && opts.claimUrl) {
    if (remaining() > 0) {
      const fetched = await fetchLinkedPage(opts.claimUrl, remaining());
      if (fetched) {
        claimText = `${fetched.title ? `${fetched.title}. ` : ""}${fetched.text}`;
        linkedPage = { title: fetched.title, url: opts.claimUrl };
        steps.push({
          step: "link-fetch",
          status: "hit",
          detail: fetched.title ? `Opened the linked page — "${fetched.title}".` : "Opened the linked page.",
        });
      } else {
        fetchFailed = true;
        steps.push({ step: "link-fetch", status: "error", detail: "Could not open the linked page." });
      }
    } else {
      fetchFailed = true;
      steps.push({ step: "link-fetch", status: "skipped", detail: "Time budget reached before the link could be opened." });
    }
    if (fetchFailed) {
      return {
        assertions: [],
        match: null,
        externalMatch: null,
        preliminary: null,
        wayback: null,
        linkedPage: null,
        fetchFailed: true,
        steps,
        automatedEnabled,
      };
    }
  }

  // Step 0 — rule-based extraction (free). Needed before the cache lookup.
  let assertions = extractAssertions(claimText);
  const checkableText = assertions
    .filter((a) => a.checkable)
    .map((a) => a.text)
    .join(" ");

  // Step 1 — Google Fact Check Tools API (verified ClaimReview records).
  let externalMatch: ExternalFactCheck | null = null;
  if (!googleFcKey) {
    steps.push({ step: "google-fact-check", status: "skipped", detail: "No GOOGLE_FACT_CHECK_API_KEY set." });
  } else if (remaining() <= 0) {
    steps.push({ step: "google-fact-check", status: "skipped", detail: "Time budget reached." });
  } else {
    try {
      externalMatch = await googleFactCheck(claimText, googleFcKey, remaining());
      steps.push(
        externalMatch
          ? { step: "google-fact-check", status: "hit", detail: `Matched a ClaimReview by ${externalMatch.publisher}.` }
          : { step: "google-fact-check", status: "miss", detail: "No verified ClaimReview found." }
      );
    } catch {
      steps.push({ step: "google-fact-check", status: "error", detail: "Google Fact Check request failed." });
    }
  }

  // Step 2 — own Postgres keyword cache (our verified verdicts).
  let match: CacheMatch | null = null;
  if (checkableText) {
    try {
      match = await opts.findOwnCache(checkableText);
      steps.push(
        match
          ? { step: "own-cache", status: "hit", detail: `Matched our verified check (${match.matchScore}% match).` }
          : { step: "own-cache", status: "miss", detail: "No verified verdict on file." }
      );
    } catch {
      steps.push({ step: "own-cache", status: "error", detail: "Cache lookup failed." });
    }
  } else {
    steps.push({ step: "own-cache", status: "skipped", detail: "No checkable assertion in the claim." });
  }

  // A verified hit ends the run — no further API spend.
  if (externalMatch || match) {
    return { assertions, match, externalMatch, preliminary: null, wayback: null, linkedPage, fetchFailed, steps, automatedEnabled };
  }
  if (!checkableText) {
    return { assertions, match: null, externalMatch: null, preliminary: null, wayback: null, linkedPage, fetchFailed, steps, automatedEnabled };
  }

  // Step 3 — Groq fast extraction (only on a cache miss).
  if (!groqKey) {
    steps.push({ step: "groq-extract", status: "skipped", detail: "No GROQ_API_KEY set — rule-based extraction stands." });
  } else if (remaining() <= 0) {
    steps.push({ step: "groq-extract", status: "skipped", detail: "Time budget reached." });
  } else {
    try {
      const refined = await groqExtract(claimText, groqKey, remaining());
      if (refined.assertions) {
        assertions = refined.assertions;
        steps.push({ step: "groq-extract", status: "hit", detail: "Claim extracted with openai/gpt-oss-20b." });
      } else {
        steps.push({
          step: "groq-extract",
          status: "error",
          detail: refined.status
            ? `Groq extraction failed (HTTP ${refined.status}) — rule-based extraction stands.`
            : "Groq extraction failed — rule-based extraction stands.",
        });
      }
    } catch {
      steps.push({ step: "groq-extract", status: "error", detail: "Groq extraction failed — rule-based extraction stands." });
    }
  }
  const searchText = assertions
    .filter((a) => a.checkable)
    .map((a) => a.text)
    .join(" ");
  if (!searchText) {
    return { assertions, match: null, externalMatch: null, preliminary: null, wayback: null, linkedPage, fetchFailed, steps, automatedEnabled };
  }

  // Step 4 — Tavily (basic) as primary RAG search; Serper as backup.
  let evidence: EvidenceItem[] | null = null;
  let evidenceSource = "";
  if (!tavilyKey) {
    steps.push({ step: "tavily", status: "skipped", detail: "No TAVILY_API_KEY set." });
  } else if (remaining() <= 0) {
    steps.push({ step: "tavily", status: "skipped", detail: "Time budget reached." });
  } else {
    try {
      const tavily = await tavilySearch(searchText, tavilyKey, remaining());
      evidence = tavily.items;
      steps.push(
        evidence
          ? { step: "tavily", status: "hit", detail: `${evidence.length} result(s), search_depth basic.` }
          : tavily.status
            ? { step: "tavily", status: "error", detail: `Tavily request failed (HTTP ${tavily.status}).` }
            : { step: "tavily", status: "miss", detail: "No results." }
      );
      if (evidence) evidenceSource = "tavily";
    } catch {
      steps.push({ step: "tavily", status: "error", detail: "Tavily request failed." });
    }
  }
  if (!evidence) {
    if (!serperKey) {
      steps.push({ step: "serper", status: "skipped", detail: "No SERPER_API_KEY set." });
    } else if (remaining() <= 0) {
      steps.push({ step: "serper", status: "skipped", detail: "Time budget reached." });
    } else {
      try {
        evidence = await serperSearch(searchText, serperKey, remaining());
        steps.push(
          evidence
            ? { step: "serper", status: "hit", detail: `${evidence.length} result(s).` }
            : { step: "serper", status: "miss", detail: "No results." }
        );
        if (evidence) evidenceSource = "serper";
      } catch {
        steps.push({ step: "serper", status: "error", detail: "Serper request failed." });
      }
    }
  }

  // Step 5 — Wayback timestamp of the submitted "seen on" URL (no key).
  let wayback: WaybackCheck | null = null;
  if (!opts.claimUrl) {
    steps.push({ step: "wayback", status: "skipped", detail: "No source URL was given." });
  } else if (remaining() <= 0) {
    steps.push({ step: "wayback", status: "skipped", detail: "Time budget reached." });
  } else {
    try {
      wayback = await waybackCheck(opts.claimUrl, remaining());
      steps.push(
        wayback.firstSeen
          ? { step: "wayback", status: "hit", detail: `First archived ${wayback.firstSeen}.` }
          : { step: "wayback", status: "miss", detail: "URL has no archived snapshot." }
      );
    } catch {
      steps.push({ step: "wayback", status: "error", detail: "Wayback request failed." });
    }
  }

  // No evidence => no preliminary assessment. The claim goes to editors.
  if (!evidence || evidence.length === 0) {
    return { assertions, match: null, externalMatch: null, preliminary: null, wayback, linkedPage, fetchFailed, steps, automatedEnabled };
  }

  // Step 6 — verdict synthesis: Groq 70B first; Gemini when no Groq key;
  // OpenRouter :free only when a Groq/Gemini attempt failed or hit 429.
  let synthesis: ReturnType<typeof parseSynthesis> = null;
  let synthesisSource = "";
  let synthesisFailed = false;
  if (groqKey && remaining() > 0) {
    try {
      const r = await groqSynthesize(searchText, evidence, groqKey, remaining());
      if (r) {
        synthesis = r.assessment;
        synthesisSource = "groq-70b";
        if (!synthesis) {
          synthesisFailed = true;
          steps.push({
            step: "groq-verdict",
            status: "error",
            detail: r.rateLimited
              ? "Groq rate-limited (429)."
              : r.status
                ? `Groq verdict synthesis failed (HTTP ${r.status}).`
                : "Groq verdict synthesis failed.",
          });
        } else {
          steps.push({ step: "groq-verdict", status: "hit", detail: "Stance/verdict synthesised with openai/gpt-oss-120b." });
        }
      } else {
        synthesisFailed = true;
        steps.push({ step: "groq-verdict", status: "error", detail: "Groq verdict synthesis failed." });
      }
    } catch {
      synthesisFailed = true;
      steps.push({ step: "groq-verdict", status: "error", detail: "Groq verdict synthesis failed." });
    }
  } else if (!groqKey) {
    steps.push({ step: "groq-verdict", status: "skipped", detail: "No GROQ_API_KEY set." });
  }
  if (!synthesis && !groqKey && geminiKey && remaining() > 0) {
    try {
      synthesis = await geminiSynthesize(searchText, evidence, geminiKey, remaining());
      if (synthesis) {
        synthesisSource = "gemini";
        steps.push({ step: "gemini-verdict", status: "hit", detail: "Stance/verdict synthesised with Gemini." });
      } else {
        synthesisFailed = true;
        steps.push({ step: "gemini-verdict", status: "error", detail: "Gemini verdict synthesis failed." });
      }
    } catch {
      synthesisFailed = true;
      steps.push({ step: "gemini-verdict", status: "error", detail: "Gemini verdict synthesis failed." });
    }
  } else if (!synthesis && !groqKey && !geminiKey) {
    steps.push({ step: "gemini-verdict", status: "skipped", detail: "No GEMINI_API_KEY set." });
  }
  if (!synthesis && synthesisFailed && openRouterKey && remaining() > 0) {
    try {
      synthesis = await openRouterSynthesize(searchText, evidence, openRouterKey, remaining());
      if (synthesis) {
        synthesisSource = "openrouter";
        steps.push({ step: "openrouter-verdict", status: "hit", detail: "Fallback synthesis with an OpenRouter :free model." });
      } else {
        steps.push({ step: "openrouter-verdict", status: "error", detail: "OpenRouter fallback synthesis failed." });
      }
    } catch {
      steps.push({ step: "openrouter-verdict", status: "error", detail: "OpenRouter fallback synthesis failed." });
    }
  } else if (!synthesis && synthesisFailed && !openRouterKey) {
    steps.push({ step: "openrouter-verdict", status: "skipped", detail: "No OPENROUTER_API_KEY set." });
  }

  // A preliminary assessment needs evidence + a synthesis, and confidence
  // >= 40 — anything weaker goes to a human editor, never to the visitor.
  let preliminary: PreliminaryAssessment | null = null;
  if (synthesis) {
    if (synthesis.confidence < 40) {
      steps.push({
        step: "preliminary",
        status: "skipped",
        detail: `Synthesis confidence ${synthesis.confidence}% is too low — sent to editors instead.`,
      });
    } else {
      preliminary = {
        verdict: synthesis.verdict,
        confidence: synthesis.confidence,
        stance: synthesis.stance,
        reasoning: synthesis.reasoning,
        citations: evidence.slice(0, 5),
        sourcesUsed: [evidenceSource, synthesisSource].filter(Boolean),
      };
      steps.push({ step: "preliminary", status: "hit", detail: "Preliminary AI-assisted assessment ready (NOT a published verdict)." });
    }
  }

  return { assertions, match: null, externalMatch: null, preliminary, wayback, linkedPage, fetchFailed, steps, automatedEnabled };
}
