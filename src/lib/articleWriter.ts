import { aiComplete, parseAiJson } from "@/lib/ai";

// ---------------------------------------------------------------------------
// Shared bilingual article writer used by the daily cron and the admin
// article publisher. Research (RSS / page fetch) + AI writing live here
// so both entry points produce identical quality.
// ---------------------------------------------------------------------------

export interface RssItem {
  title: string;
  link: string;
  pubDate: string;
  publisher: string;
  description: string;
  category: string;
  country: string | null;
}

export interface ArticleJson {
  titleEn: string;
  titleNe: string;
  excerptEn: string;
  excerptNe: string;
  bodyEn: string;
  bodyNe: string;
  category: string;
  country: string | null;
}

export const VALID_CATEGORIES = new Set([
  "nepal",
  "gulf",
  "korea-japan",
  "work-abroad",
  "remote",
  "global",
  "career",
]);

export function decodeEntities(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'");
}

export function parseRss(
  xml: string,
  category: string,
  country: string | null
): RssItem[] {
  const items: RssItem[] = [];
  const itemRe = /<item>([\s\S]*?)<\/item>/g;
  let m: RegExpExecArray | null;
  const get = (block: string, tag: string) => {
    const r = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`);
    const x = block.match(r);
    return x ? decodeEntities(x[1].trim()) : "";
  };
  while ((m = itemRe.exec(xml))) {
    const block = m[1];
    const rawTitle = get(block, "title");
    if (!rawTitle) continue;
    const dashIdx = rawTitle.lastIndexOf(" - ");
    items.push({
      title: (dashIdx > 0 ? rawTitle.slice(0, dashIdx) : rawTitle).trim(),
      publisher: (dashIdx > 0 ? rawTitle.slice(dashIdx + 3) : get(block, "source")).trim(),
      link: get(block, "link"),
      pubDate: get(block, "pubDate"),
      description: get(block, "description"),
      category,
      country,
    });
  }
  return items;
}

export function extractText(html: string): string {
  const t = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ");
  return decodeEntities(t).replace(/\s+/g, " ").trim().slice(0, 3000);
}

export async function fetchPageText(link: string): Promise<string> {
  try {
    const res = await fetch(link, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; GrowentixBot/1.0)" },
      signal: AbortSignal.timeout(12_000),
      redirect: "follow",
    });
    if (!res.ok) return "";
    return extractText(await res.text());
  } catch {
    return "";
  }
}

const SYSTEM_PROMPT =
  "You are a senior job-news editor for Growentix, Nepal's opportunity radar. You write in British English and in natural, fluent Nepali (Devanagari script). You never invent facts. Your writing must read as fully human: varied sentence rhythm, concrete specifics, no AI-telltale phrasing. Output JSON only.";

function buildPrompt(
  item: RssItem,
  pageText: string,
  focusKeyword?: string
): string {
  const material = pageText || item.description || "(no further text available)";
  const keywordRule = focusKeyword
    ? `\n- Naturally include the focus keyword "${focusKeyword}" in the English title, the first paragraph of bodyEn, and at least one <h2> heading. Never stuff it unnaturally.`
    : "";
  return `Write a job-news article based ONLY on the material below. Do not invent facts, numbers, dates, names, or quotes that are not in the material. If the material is thin, write a concise piece and add general, clearly-labelled context that a jobseeker would find useful (without inventing specifics).

MATERIAL:
Headline: ${item.title}
Publisher: ${item.publisher}
Published: ${item.pubDate}
Page text: ${material}

Return JSON with exactly these keys:
- "titleEn": short punchy headline, British English, max 90 characters
- "titleNe": the same headline in natural Nepali (Devanagari script) — fluent and idiomatic, not a word-for-word translation
- "excerptEn": 1-2 sentence summary, British English
- "excerptNe": the summary in fluent Nepali (Devanagari script)
- "bodyEn": article body as HTML using only <h2>, <p>, <ul>, <li>, <strong>, <a> tags. 600-800 words. Structure:
  1. <p> lead — what happened, with the key facts up front.
  2. <h2>Why it matters</h2> — explain the background and what this means practically for a jobseeker. Add clearly-labelled general context where the material is thin (never invent specifics).
  3. <h2>Key details</h2> — the concrete facts: who, how many posts, eligibility, salary, dates, deadlines.
  4. <h2>How to apply</h2> — step-by-step, plain-language instructions a reader can actually follow (where to go, what documents, what to watch out for). If the story has no application process, replace this section with <h2>What to do next</h2> giving practical next steps.
  5. Short closing <p> — one honest takeaway, no hype.
  British English.
- "bodyNe": full Nepali (Devanagari script) version of bodyEn — rewrite it the way a skilled Nepali journalist would write it: natural sentence flow, common Nepali job vocabulary (रोजगारी, भर्ना, आवेदन, तलब, योग्यता), same HTML tags and structure. Never transliterate English sentences word-for-word.
- "category": one of: nepal, gulf, korea-japan, work-abroad, remote, global, career (pick the best fit)
- "country": the main country this story is about, or null

RULES:
- British English spelling in all English text (e.g. "organised", "favour", "labour").
- Write like a human journalist: vary sentence length and rhythm; lead with concrete facts, not throat-clearing. Never open with "In today's fast-paced world" or similar filler.
- Banned AI-telltale words: delve, moreover, furthermore, additionally (as sentence starter), tapestry, landscape (as metaphor), "game-changer", "in conclusion". Contractions (don't, it's, here's) are fine and encouraged.
- INLINE LINKS: link key entities in the body text itself using <a href="..."> tags — the first mention of the source publication, official portals (e.g. ferms.dofe.gov.np), and organisations should link to the source URL: ${item.link}. Example: <a href="${item.link}">Department of Foreign Employment</a>. 2-4 inline links per article; never link the same phrase twice.
- Every claim of fact must come from the material. If the material is thin, say what is known and add useful general context clearly framed as context.
- No emojis. No markdown. HTML only in the body fields.${keywordRule}
- Never mention that you are an AI.`;
}

/** Writes one bilingual article from a researched item. Returns null on failure. */
export async function writeArticle(
  item: RssItem,
  pageText: string,
  focusKeyword?: string
): Promise<ArticleJson | null> {
  const raw = await aiComplete(
    [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: buildPrompt(item, pageText, focusKeyword) },
    ],
    { json: true, maxTokens: 5000 }
  );
  const data = parseAiJson<ArticleJson>(raw);
  if (!data || !data.titleEn || !data.bodyEn || !data.bodyNe) return null;
  return data;
}
