// ---------------------------------------------------------------------------
// Fact Check engine — shared verdict scale, claim extraction and cache
// matching (MVP, 2026-11-22; spec: ~/workspace/user/files/
// fact_check_engine_spec_261122_212945_4_kcjg.pdf).
//
// What the MVP does (all $0, no paid search/LLM key):
//  - Verdict scale: TRUE / MOSTLY_TRUE / MISLEADING / FALSE / UNVERIFIED.
//  - Rule-based claim extraction (v1): split submitted text into
//    sentences and keep check-worthy factual assertions — numbers, dates,
//    named entities, quotes. Opinions, questions, satire markers and
//    vague praise are dropped, never checked. This is a heuristic, not
//    an NLI model: anything ambiguous goes to a human editor, never to
//    an automated verdict.
//  - Semantic-cache lookup: keyword-overlap match of a submitted claim
//    against already-verified fact-check articles (title + excerpt +
//    factCheckClaim). A match shows the stored verdict instantly.
//  - NO automated verdict is ever produced for an unmatched claim: it
//    goes to the human-review queue (POST /api/fact-check/submit).
//
// Phase 2 (NOT built — needs paid search/LLM keys): atomic claim
// decomposition, image/audio forensics, data/chart audit,
// coordinated-spread detection, HITL dashboard, pgvector semantic cache.
// The free-key parts of Phase 2 (live web retrieval, stance/NLI scoring)
// now live in factCheckWaterfall.ts as a PRELIMINARY-only path — see
// that file's header for the waterfall order and the no-key rules.
// ---------------------------------------------------------------------------

export const FACT_CHECK_VERDICTS = [
  "TRUE",
  "MOSTLY_TRUE",
  "MISLEADING",
  "FALSE",
  "UNVERIFIED",
] as const;

export type FactCheckVerdict = (typeof FACT_CHECK_VERDICTS)[number];

export function isFactCheckVerdict(v: string): v is FactCheckVerdict {
  return (FACT_CHECK_VERDICTS as readonly string[]).includes(v);
}

/** Display label for a verdict value. */
export const VERDICT_LABELS: Record<FactCheckVerdict, string> = {
  TRUE: "True",
  MOSTLY_TRUE: "Mostly true",
  MISLEADING: "Misleading",
  FALSE: "False",
  UNVERIFIED: "Unverified",
};

/** Schema.org reviewRating value (1–5) for a verdict, or null when the
 *  claim could not be rated — UNVERIFIED carries no rating. */
export const VERDICT_RATINGS: Record<FactCheckVerdict, number | null> = {
  TRUE: 5,
  MOSTLY_TRUE: 4,
  MISLEADING: 2,
  FALSE: 1,
  UNVERIFIED: null,
};

/** Tailwind classes for the verdict pill/banner, per verdict. */
// Verdict colours (owner order 2026-11-22 ~22:19): TRUE green, FALSE red,
// MISLEADING yellow; MOSTLY_TRUE a lighter green than TRUE, UNVERIFIED
// neutral grey. Every verdict display — the article banner, the hub list
// pills, the checker results — reads from this one map, so the colours
// cannot drift apart again.
export const VERDICT_STYLES: Record<FactCheckVerdict, { pill: string; banner: string; text: string }> = {
  TRUE: {
    pill: "bg-emerald-600 text-white",
    banner: "border-emerald-600 bg-emerald-50",
    text: "text-emerald-700",
  },
  MOSTLY_TRUE: {
    pill: "bg-emerald-500 text-white",
    banner: "border-emerald-500 bg-emerald-50",
    text: "text-emerald-600",
  },
  MISLEADING: {
    pill: "bg-amber-500 text-white",
    banner: "border-amber-500 bg-amber-50",
    text: "text-amber-700",
  },
  FALSE: {
    pill: "bg-red-600 text-white",
    banner: "border-red-600 bg-red-50",
    text: "text-red-700",
  },
  UNVERIFIED: {
    pill: "bg-slate-500 text-white",
    banner: "border-slate-400 bg-slate-50",
    text: "text-slate-600",
  },
};

// ---------------------------------------------------------------------------
// Claim extraction (v1, rule-based — see the header note)
// ---------------------------------------------------------------------------

export interface ExtractedAssertion {
  text: string;
  checkable: boolean;
  /** Why it was kept or dropped — shown to the submitter for honesty. */
  reason: string;
}

const OPINION_MARKERS =
  /\b(i think|i feel|in my opinion|in my view|should|must|best|worst|greatest|amazing|terrible|beautiful|love|hate|hope|wish|probably|maybe|perhaps)\b/i;

// Satire / joke markers — never treated as a factual claim.
const SATIRE_MARKERS =
  /\b(satire|parody|joke|just kidding|jk\b|meme|humour|humor|funny|lol|lmao)\b/i;

// A sentence is check-worthy when it asserts something concrete: a
// number, a date/year, a quoted statement, or a named-entity-style
// capitalised phrase. Plain vague statements are not checkable.
// Spelled-out numbers count too — "two lakh" and "five thousand jobs"
// are as concrete as "200000" (fix 2026-11-22: claims written with
// number-words were dropped as "Too vague to check").
const FACT_MARKERS = [
  /\d/, // a number (amount, count, percentage, year)
  /\b(19|20)\d{2}\b/, // a year
  /[""“”]/, // a quote
  /\b(said|announced|claimed|reported|confirmed|denied|according to)\b/i,
  /\b[A-Z][a-z]+ [A-Z][a-z]+\b/, // a two-word proper name
  // Spelled-out numbers: one–nineteen, tens, and scale words.
  /\b(one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety|hundred|thousand|lakh|crore|million|billion)\b/i,
];

/** Split text into sentences. Devanagari danda (।) ends a sentence too,
 *  so Romanized and Devanagari Nepali input both work. */
function splitSentences(text: string): string[] {
  return text
    .split(/(?<=[.!?।])\s+|\n+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

export function extractAssertions(text: string): ExtractedAssertion[] {
  const sentences = splitSentences(text);
  return sentences.map((sentence) => {
    if (sentence.endsWith("?") || /^(who|what|when|where|why|how|is|are|was|were|do|does|did|can|could|will|would|ke |kasto|kina|kahile|kaha)\b/i.test(sentence)) {
      return { text: sentence, checkable: false, reason: "A question, not a claim." };
    }
    if (SATIRE_MARKERS.test(sentence)) {
      return { text: sentence, checkable: false, reason: "Reads as satire or a joke." };
    }
    if (OPINION_MARKERS.test(sentence) && !FACT_MARKERS.some((rx) => rx.test(sentence))) {
      return { text: sentence, checkable: false, reason: "An opinion, not a checkable fact." };
    }
    if (FACT_MARKERS.some((rx) => rx.test(sentence))) {
      return { text: sentence, checkable: true, reason: "States a checkable fact." };
    }
    return { text: sentence, checkable: false, reason: "Too vague to check." };
  });
}

/**
 * Detect a bare link in the single search box (redesign 2026-11-22): the
 * trimmed input is a URL when it starts with http:// or https://, or when
 * it is a bare domain (e.g. example.com/some-post) with no spaces.
 * Returns the normalised https URL, or null for claim text. A claim that
 * merely mentions a link ("See https://…") is NOT a URL — it has spaces.
 */
export function detectUrl(input: string): string | null {
  const raw = input.trim().replace(/[.,;:!?)]+$/, "");
  if (!raw || /\s/.test(raw)) return null;
  if (/^https?:\/\//i.test(raw)) {
    try {
      const u = new URL(raw);
      if (u.protocol === "http:" || u.protocol === "https:") return u.href;
    } catch {
      return null;
    }
    return null;
  }
  if (/^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}(?:[/?#]\S*)?$/i.test(raw)) {
    try {
      return new URL(`https://${raw}`).href;
    } catch {
      return null;
    }
  }
  return null;
}

// ---------------------------------------------------------------------------
// Cache matching — keyword overlap against verified fact-check rows
// ---------------------------------------------------------------------------

const STOPWORDS = new Set([
  "the", "a", "an", "and", "or", "of", "to", "in", "on", "for", "with",
  "is", "are", "was", "were", "be", "been", "has", "have", "had", "will",
  "would", "can", "could", "that", "this", "it", "its", "by", "at", "from",
  "as", "not", "no", "yes", "after", "before", "over", "under", "into",
  "about", "than", "then", "when", "who", "what", "where", "why", "how",
  "claim", "claims", "claimed", "says", "said", "report", "reported",
  "ko", "cha", "chha", "ho", "ra", "ma", "le", "lai", "bhanne", "gareko",
]);

function contentTokens(text: string): Set<string> {
  return new Set(
    text
      .toLowerCase()
      .replace(/[^a-z0-9\u0900-\u097f\s]/g, " ")
      .split(/\s+/)
      .filter((t) => t.length > 2 && !STOPWORDS.has(t))
      .map((t) => (t.length > 4 && t.endsWith("s") ? t.slice(0, -1) : t))
  );
}

// Spelled-out numbers, for normalizing amounts before comparison
// ("2 lakh" and "200000" are the same amount — fix 2026-11-22: the
// cache matcher compared raw digit strings, so a digit claim never
// matched a stored "lakh"/"crore" claim).
const NUMBER_ONES: Record<string, number> = {
  one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8,
  nine: 9, ten: 10, eleven: 11, twelve: 12, thirteen: 13, fourteen: 14,
  fifteen: 15, sixteen: 16, seventeen: 17, eighteen: 18, nineteen: 19,
};
const NUMBER_TENS: Record<string, number> = {
  twenty: 20, thirty: 30, forty: 40, fifty: 50, sixty: 60,
  seventy: 70, eighty: 80, ninety: 90,
};
const NUMBER_SCALES: Record<string, number> = {
  hundred: 100, thousand: 1_000, lakh: 100_000, crore: 10_000_000,
  million: 1_000_000, billion: 1_000_000_000,
};

const isNumberToken = (w: string): boolean =>
  NUMBER_ONES[w] !== undefined ||
  NUMBER_TENS[w] !== undefined ||
  NUMBER_SCALES[w] !== undefined ||
  /^\d[\d,]*$/.test(w);

/** Value of a run of number words/digits, or null when the run holds no number. */
function numberRunValue(run: string[]): number | null {
  let result = 0;
  let current = 0;
  let seen = false;
  for (const w of run) {
    if (w === "and") continue;
    if (/^\d[\d,]*$/.test(w)) {
      // A digit joins the run only as its first element ("2 lakh");
      // a digit after words ("twenty 5") is a separate, malformed
      // amount and is left alone rather than merged in.
      if (current === 0) current = Number(w.replace(/,/g, ""));
      seen = true;
      continue;
    }
    if (NUMBER_ONES[w] !== undefined) {
      current += NUMBER_ONES[w];
      seen = true;
      continue;
    }
    if (NUMBER_TENS[w] !== undefined) {
      current += NUMBER_TENS[w];
      seen = true;
      continue;
    }
    const scale = NUMBER_SCALES[w];
    if (scale !== undefined) {
      if (scale === 100) current = (current || 1) * 100;
      else {
        result += (current || 1) * scale;
        current = 0;
      }
      seen = true;
    }
  }
  if (!seen) return null;
  return result + current;
}

/**
 * Rewrite spelled-out numbers as digits ("2 lakh" -> "200000",
 * "five thousand" -> "5000", "2,00,000" -> "200000"). Used ONLY for
 * number comparison in sharedNumbers — display text is never rewritten.
 * "and" joins one number only when it sits between a scale word and a
 * ones/tens word ("two hundred and fifty" = 250); otherwise it separates
 * two numbers ("5 jobs and 10 visas" keeps 5 and 10 apart).
 */
function normalizeNumbers(text: string): string {
  const words = text.toLowerCase().replace(/-/g, " ").split(/\s+/);
  const out: string[] = [];
  let i = 0;
  while (i < words.length) {
    if (!isNumberToken(words[i])) {
      out.push(words[i]);
      i++;
      continue;
    }
    const run: string[] = [];
    while (i < words.length) {
      const w = words[i];
      if (w === "and") {
        const next = words[i + 1];
        const hasScale = run.some((r) => NUMBER_SCALES[r] !== undefined);
        const nextIsSmall =
          next !== undefined &&
          (NUMBER_ONES[next] !== undefined || NUMBER_TENS[next] !== undefined);
        if (hasScale && nextIsSmall) {
          run.push(w);
          i++;
          continue;
        }
        break;
      }
      if (!isNumberToken(w)) break;
      run.push(w);
      i++;
    }
    const value = numberRunValue(run);
    out.push(value === null ? run.join(" ") : String(value));
  }
  return out.join(" ");
}

/** Distinctive numbers (amounts, counts — not years) shared by claim and row. */
function sharedNumbers(a: string, b: string): string[] {
  const nums = (s: string) =>
    [...normalizeNumbers(s).matchAll(/\d[\d,.]*/g)].map((m) => m[0].replace(/[,.]/g, ""));
  const setB = new Set(nums(b));
  return nums(a).filter((n) => n.length >= 2 && !(Number(n) >= 1900 && Number(n) <= 2100) && setB.has(n));
}

export interface CacheRow {
  slug: string;
  titleEn: string;
  excerptEn: string;
  factCheckClaim: string | null;
  factCheckVerdict: string | null;
  verifiedAt: Date | null;
}

export interface CacheMatch {
  slug: string;
  titleEn: string;
  verdict: FactCheckVerdict;
  /** 0–100: how closely the submitted claim matches the verified one. */
  matchScore: number;
  checkedAt: string | null;
}

/**
 * Best keyword-overlap match for a claim, or null. A match needs either
 * 2+ shared content tokens with Jaccard overlap >= 0.30, or a shared
 * distinctive number plus 1 content token — so "Rs 2 lakh Europe" finds
 * the Europe-jobs check, but "Taylor Swift" alone never matches a random
 * fact-check. The score is a match confidence, NOT a verdict confidence.
 */
export function findCacheMatch(
  claim: string,
  rows: CacheRow[]
): CacheMatch | null {
  const claimTokens = contentTokens(claim);
  if (claimTokens.size === 0) return null;
  let best: CacheMatch | null = null;
  for (const row of rows) {
    if (!row.factCheckVerdict || !isFactCheckVerdict(row.factCheckVerdict)) continue;
    const hay = `${row.factCheckClaim ?? ""} ${row.titleEn} ${row.excerptEn}`;
    const rowTokens = contentTokens(hay);
    const shared = [...claimTokens].filter((t) => rowTokens.has(t));
    const union = new Set([...claimTokens, ...rowTokens]);
    const jaccard = union.size === 0 ? 0 : shared.length / union.size;
    const numbers = sharedNumbers(claim, hay);
    const ok = (shared.length >= 2 && jaccard >= 0.3) || (numbers.length > 0 && shared.length >= 1);
    if (!ok) continue;
    const score = Math.min(
      98,
      Math.round(55 + jaccard * 40 + Math.min(shared.length, 5) * 2 + (numbers.length > 0 ? 5 : 0))
    );
    if (!best || score > best.matchScore) {
      best = {
        slug: row.slug,
        titleEn: row.titleEn,
        verdict: row.factCheckVerdict,
        matchScore: score,
        checkedAt: row.verifiedAt ? row.verifiedAt.toISOString() : null,
      };
    }
  }
  return best;
}
