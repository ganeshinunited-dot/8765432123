import {
  articleCategoryLabel,
  industriesForTitle,
  isGovernmentJob,
  isJobCategory,
  isPrivateJob,
} from "@/lib/articles";

export interface TopicLink {
  label: string;
  url: string;
}

/**
 * "More in this topic" hub links for an article (GEO Step 8, plan §9).
 * Derived only from data the article already carries — category, title,
 * sources. Nothing invented:
 * - the section hub: every job-category slug is its own listing route
 *   (/usa, /asia, /remote, /work-abroad, …)
 * - Government Jobs / Private Jobs hub from the Batch 2 classifier
 *   (title + sources; government takes precedence, layoff news never counts)
 * - the first matching industry hub from the title classifier
 * News, pop-music and tech-ai articles get no row: their section link
 * already sits in the visible breadcrumb, so a second copy would add
 * nothing for the reader.
 */
export function topicLinksForArticle(a: {
  category: string;
  titleEn: string;
  sources: string[];
}): TopicLink[] {
  if (!isJobCategory(a.category)) return [];
  const links: TopicLink[] = [
    { label: articleCategoryLabel(a.category), url: `/${a.category}` },
  ];
  if (isGovernmentJob(a)) {
    links.push({ label: "Government jobs", url: "/government-jobs" });
  } else if (isPrivateJob(a)) {
    links.push({ label: "Private jobs", url: "/private-jobs" });
  }
  const industry = industriesForTitle(a.titleEn)[0];
  if (industry) {
    links.push({ label: `${industry.name} jobs`, url: `/industries/${industry.slug}` });
  }
  return links;
}

/**
 * Curated work-visa guide cluster — the guides readers actually move
 * between. Slugs and titles verified live 2026-11-19; labels are short
 * descriptions of the linked article, not new claims. A guide that stops
 * existing is dropped at render time (the page queries the DB for the
 * slugs and only links the ones still there).
 */
export const VISA_GUIDES: { slug: string; label: string }[] = [
  { slug: "singapore-work-visa-for-indians-employment-pass-s-pass-20261120", label: "Singapore work visa" },
  { slug: "japan-work-visa-ssw-specified-skilled-worker-indians-20261120", label: "Japan SSW visa" },
  { slug: "south-korea-to-hire-7-200-nepalis-in-2026-under-eps-20261015", label: "Korea EPS" },
  { slug: "japan-work-visa-requirements-process-and-eligibility-explained-20261016", label: "Japan visa requirements" },
  { slug: "uk-nhs-jobs-visa-sponsorship-november-2026-20261121", label: "UK NHS sponsorship" },
  { slug: "caregiver-jobs-abroad-in-2026-salaries-and-visa-routes-in-focus-20261024", label: "Caregiver jobs abroad" },
  { slug: "no-experience-jobs-abroad-nepal-legal-guide-to-gulf-korea-more-20261021", label: "No-experience jobs abroad" },
];

export function isVisaGuide(slug: string): boolean {
  return VISA_GUIDES.some((g) => g.slug === slug);
}
