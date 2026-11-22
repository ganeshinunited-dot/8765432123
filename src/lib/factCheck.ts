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
export const VERDICT_STYLES: Record<FactCheckVerdict, { pill: string; banner: string }> = {
  TRUE: {
    pill: "bg-emerald-600 text-white",
    banner: "border-emerald-600 bg-emerald-50",
  },
  MOSTLY_TRUE: {
    pill: "bg-teal-600 text-white",
    banner: "border-teal-600 bg-teal-50",
  },
  MISLEADING: {
    pill: "bg-amber-500 text-white",
    banner: "border-amber-500 bg-amber-50",
  },
  FALSE: {
    pill: "bg-red-600 text-white",
    banner: "border-red-600 bg-red-50",
  },
  UNVERIFIED: {
    pill: "bg-slate-500 text-white",
    banner: "border-slate-400 bg-slate-50",
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
const FACT_MARKERS = [
  /\d/, // a number (amount, count, percentage, year)
  /\b(19|20)\d{2}\b/, // a year
  /[""“”]/, // a quote
  /\b(said|announced|claimed|reported|confirmed|denied|according to)\b/i,
  /\b[A-Z][a-z]+ [A-Z][a-z]+\b/, // a two-word proper name
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

/** Distinctive numbers (amounts, counts — not years) shared by claim and row. */
function sharedNumbers(a: string, b: string): string[] {
  const nums = (s: string) => [...s.matchAll(/\d[\d,.]*/g)].map((m) => m[0].replace(/[,.]/g, ""));
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
