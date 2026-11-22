import { db } from "@/lib/db";
import {
  INDUSTRIES,
  industryBySlug,
  isGovernmentJob,
  isPrivateJob,
} from "@/lib/articles";

export const JOB_LISTING_PAGE_SIZE = 20;

export interface JobListingArticle {
  slug: string;
  category: string;
  country: string | null;
  titleEn: string;
  excerptEn: string;
  publishedAt: string;
}

/**
 * The pool every Batch 2 listing draws from: job-category articles only.
 * pop-music / tech-ai / news have their own sections; the 14 legacy
 * `taylor-swift` articles are pop content misfiled under Jobs and are
 * excluded here (the classifier would drop them anyway — none matches
 * a government, private or industry pattern).
 */
async function fetchJobPool(): Promise<(JobListingArticle & { sources: string[] })[]> {
  const rows = await db.article.findMany({
    where: { category: { notIn: ["pop-music", "tech-ai", "news", "fact-check", "taylor-swift"] } },
    orderBy: { publishedAt: "desc" },
    select: {
      slug: true,
      category: true,
      country: true,
      titleEn: true,
      excerptEn: true,
      publishedAt: true,
      sources: true,
    },
  });
  return rows.map((a) => ({ ...a, publishedAt: a.publishedAt.toISOString() }));
}

export interface JobListingResult {
  articles: JobListingArticle[];
  total: number;
  totalPages: number;
  page: number;
}

/**
 * One filtered listing: "government", "private", or an industry slug.
 * Returns null for an unknown industry slug (the page then 404s).
 * Filtering happens in memory over the job pool — the corpus is small
 * (164 job articles at Batch 2 time) and the classifier is pure, so new
 * articles are classified automatically at publish time with no
 * migration and no stored field to keep in sync.
 */
export async function getJobListing(
  kind: "government" | "private" | string,
  requestedPage: number
): Promise<JobListingResult | null> {
  const pool = await fetchJobPool();
  let filtered: (JobListingArticle & { sources: string[] })[];
  if (kind === "government") {
    filtered = pool.filter((a) => isGovernmentJob(a));
  } else if (kind === "private") {
    filtered = pool.filter((a) => isPrivateJob(a));
  } else {
    const industry = industryBySlug(kind);
    if (!industry) return null;
    filtered = pool.filter((a) =>
      industry.patterns.some((rx) => rx.test(a.titleEn))
    );
  }
  const totalPages = Math.max(1, Math.ceil(filtered.length / JOB_LISTING_PAGE_SIZE));
  const page = Math.min(Math.max(1, requestedPage), totalPages);
  const slice = filtered.slice(
    (page - 1) * JOB_LISTING_PAGE_SIZE,
    page * JOB_LISTING_PAGE_SIZE
  );
  return {
    // ArticleCards takes FilterableArticle (no sources) — drop the field.
    articles: slice.map(({ sources: _sources, ...rest }) => rest),
    total: filtered.length,
    totalPages,
    page,
  };
}

/** Live article count per industry, for the /industries index. Only
 *  industries with 5+ articles are listed. */
export async function getIndustryCounts(): Promise<
  { slug: string; name: string; description: string; count: number }[]
> {
  const pool = await fetchJobPool();
  return INDUSTRIES.map((ind) => ({
    slug: ind.slug,
    name: ind.name,
    description: ind.description,
    count: pool.filter((a) =>
      ind.patterns.some((rx) => rx.test(a.titleEn))
    ).length,
  })).filter((i) => i.count >= 5);
}
