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
