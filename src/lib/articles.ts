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
