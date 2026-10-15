export const ARTICLE_CATEGORIES = [
  { slug: "nepal", label: "Nepal Jobs" },
  { slug: "gulf", label: "Gulf Jobs" },
  { slug: "korea-japan", label: "Korea & Japan" },
  { slug: "usa", label: "USA Jobs" },
  { slug: "uk", label: "UK Jobs" },
  { slug: "canada", label: "Canada Jobs" },
  { slug: "australia", label: "Australia Jobs" },
  { slug: "europe", label: "Europe Jobs" },
  { slug: "asia", label: "Asia Jobs" },
  { slug: "work-abroad", label: "Work Abroad" },
  { slug: "remote", label: "Remote Work" },
  { slug: "global", label: "Global Trends" },
  { slug: "career", label: "Career Guide" },
] as const;

export function articleCategoryLabel(slug: string): string {
  return ARTICLE_CATEGORIES.find((c) => c.slug === slug)?.label ?? slug;
}

export function articleSlug(titleEn: string): string {
  return titleEn
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

/** Categories that count as international (everything except Nepal + career guides). */
export const INTERNATIONAL_CATEGORIES = [
  "gulf",
  "korea-japan",
  "usa",
  "uk",
  "canada",
  "australia",
  "europe",
  "asia",
  "work-abroad",
  "remote",
  "global",
] as const;

/**
 * Title-similarity dedupe. The cron used to dedupe by source link only, so
 * the same story from different outlets slipped through (the Korea EPS
 * 7,200 story published 3 times: 9, 10, 15 Oct 2026). Two titles are
 * duplicates when their content-token Jaccard similarity is high, OR when
 * they share a distinctive (non-year) number plus at least two content
 * tokens — e.g. "7,200" + Korea + EPS catches reworded versions whose
 * Jaccard alone is low. Year tokens (1900–2100) are excluded from the
 * number rule so "Remote Jobs USA 2026" vs "Remote Jobs Canada 2026"
 * are NOT flagged.
 */
const TITLE_STOPWORDS = new Set([
  "the", "a", "an", "to", "in", "for", "of", "and", "on", "with", "from", "by",
  "at", "as", "is", "are", "will", "new", "after", "over", "amid", "amidst",
]);

function titleTokens(title: string): string[] {
  return title
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .map((t) => (t.length > 3 && t.endsWith("s") ? t.slice(0, -1) : t)) // naive singularise: nepalis -> nepali
    .filter((t) => !TITLE_STOPWORDS.has(t));
}

export function titlesAreDuplicates(a: string, b: string): boolean {
  const ta = new Set(titleTokens(a));
  const tb = new Set(titleTokens(b));
  if (ta.size === 0 || tb.size === 0) return false;
  const shared = [...ta].filter((t) => tb.has(t));
  const union = new Set([...ta, ...tb]);
  const symDiff = union.size - shared.length;
  // Jaccard rule, but a symmetric difference of exactly 2 means "same
  // template, one entity swapped" (USA vs Canada, engineers vs designers)
  // — different stories, not duplicates. Identical (0) or heavily
  // reworded (>= 3) differences with >= 50% overlap are duplicates.
  if (shared.length / union.size >= 0.5 && (symDiff <= 1 || symDiff >= 3)) return true;
  // Distinctive-number rule: shared non-year number + >= 3 other tokens +
  // heavily reworded (>= 3 differing tokens). The rewording requirement
  // keeps round-number templates apart: "500 Engineers" vs "500
  // Designers" and "200 Nurses Dubai" vs "200 Nurses Qatar" share a
  // number but differ by one swapped entity only.
  const isDistinctiveNumber = (t: string) =>
    /^\d{3,}$/.test(t) && !(Number(t) >= 1900 && Number(t) <= 2100);
  const sharedNumbers = shared.filter(isDistinctiveNumber);
  return sharedNumbers.length > 0 && shared.length >= 4 && symDiff >= 3;
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Word matching: every query word must appear as a whole word in the article
 * text (title + excerpt, both languages, category, country). Whole-word
 * matching matters for short words — "ai" must not match "training".
 * Non-Latin words (e.g. Nepali) fall back to substring matching.
 */
export function matchesSearch(
  a: { titleEn: string; excerptEn: string; titleNe: string; excerptNe: string; category: string; country: string | null },
  query: string
): boolean {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (words.length === 0) return true;
  const haystack = `${a.titleEn} ${a.excerptEn} ${a.titleNe} ${a.excerptNe} ${articleCategoryLabel(a.category)} ${a.country ?? ""}`.toLowerCase();
  return words.every((w) => {
    if (/^[a-z0-9]+$/.test(w)) {
      return new RegExp(`(^|[^a-z0-9])${escapeRegExp(w)}([^a-z0-9]|$)`, "i").test(haystack);
    }
    return haystack.includes(w);
  });
}
