/**
 * Growentix MCP tool logic (read-only).
 *
 * Data sources (the same ones the live site renders):
 * - Government vacancy listings: src/data/sarkariJobs.ts (curated public notices).
 *   Every listing carries a real deadline from its notice; nothing is inferred.
 * - Career/job-news articles: the Article table (Prisma), same rows as /articles.
 *
 * Honesty rules enforced here, not left to the caller:
 * - A listing is "active" only when its deadline is today or later in
 *   Asia/Kathmandu (the site's own rule). Earlier deadlines are "expired".
 * - A missing or malformed deadline is "unknown", never guessed.
 * - Articles have no deadline field, so their deadline is always "unknown".
 * - Seats, salary, location and qualification are returned as null when the
 *   source notice does not state them — never filled in.
 * - Employment type is NOT offered as a filter: the source data carries no
 *   such field, and deriving it from prose would risk fabrication.
 * - Government listings are Nepal public-sector notices; the country filter
 *   exists on article search, where the data actually carries a country.
 */

import { z } from "zod";
import { db } from "@/lib/db";
import {
  SARKARI_JOBS,
  sarkariSlug,
  type SarkariJob,
} from "@/data/sarkariJobs";

const SITE_URL = "https://growentix.cloud";

/** Domain error: returned to the MCP client as a tool error (isError). */
export class ToolError extends Error {}

export type VacancyStatus = "active" | "expired" | "unknown";

/** Today's calendar date in Asia/Kathmandu, YYYY-MM-DD (site's own rule). */
export function todayNpt(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kathmandu",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

export function vacancyStatus(
  deadline: string | null | undefined,
): VacancyStatus {
  if (!deadline || !/^\d{4}-\d{2}-\d{2}$/.test(deadline)) return "unknown";
  return deadline >= todayNpt() ? "active" : "expired";
}

export interface VacancyResult {
  id: string;
  slug: string;
  url: string;
  organization: string;
  post_title: string;
  level: string | null;
  seats: number | null;
  deadline: string;
  status: VacancyStatus;
  location: string | null;
  min_qualification: string | null;
  salary: string | null;
  category: string;
  source_url: string;
  notice_url: string;
}

function toVacancyResult(j: SarkariJob): VacancyResult {
  const slug = sarkariSlug(j);
  return {
    id: j.id,
    slug,
    url: `${SITE_URL}/sarkari-jobs/${slug}`,
    organization: j.organization,
    post_title: j.postTitle,
    level: j.level,
    seats: j.seats,
    deadline: j.deadline,
    status: vacancyStatus(j.deadline),
    location: j.location,
    min_qualification: j.minQualification,
    salary: j.salary ?? null,
    category: j.category,
    source_url: j.sourceUrl,
    notice_url: j.noticeUrl,
  };
}

function numericId(id: string): number {
  const n = parseInt(id.replace(/^sj-/, ""), 10);
  return Number.isFinite(n) ? n : 0;
}

/* ------------------------------------------------------------------ */
/* search_jobs                                                         */
/* ------------------------------------------------------------------ */

const searchJobsArgs = z.object({
  query: z.string().max(200).optional(),
  category: z
    .enum([
      "psc",
      "security",
      "health",
      "education",
      "local",
      "bank",
      "enterprise",
      "other",
    ])
    .optional(),
  location: z.string().max(200).optional(),
  deadline_from: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Use YYYY-MM-DD")
    .optional(),
  deadline_to: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Use YYYY-MM-DD")
    .optional(),
  status: z.enum(["active", "expired", "all"]).default("active"),
  page: z.number().int().min(1).max(10000).default(1),
  page_size: z.number().int().min(1).max(50).default(20),
});

export function searchJobs(raw: unknown) {
  const a = searchJobsArgs.parse(raw);
  const q = a.query?.toLowerCase();
  const loc = a.location?.toLowerCase();
  const matched = SARKARI_JOBS.filter((j) => {
    if (a.category && j.category !== a.category) return false;
    if (
      q &&
      !(
        j.organization.toLowerCase().includes(q) ||
        j.postTitle.toLowerCase().includes(q) ||
        (j.location ?? "").toLowerCase().includes(q)
      )
    )
      return false;
    if (loc && !(j.location ?? "").toLowerCase().includes(loc)) return false;
    if (a.deadline_from && j.deadline < a.deadline_from) return false;
    if (a.deadline_to && j.deadline > a.deadline_to) return false;
    if (a.status !== "all" && vacancyStatus(j.deadline) !== a.status)
      return false;
    return true;
  });
  const active = matched
    .filter((j) => vacancyStatus(j.deadline) === "active")
    .sort((x, y) => x.deadline.localeCompare(y.deadline));
  const expired = matched
    .filter((j) => vacancyStatus(j.deadline) === "expired")
    .sort((x, y) => y.deadline.localeCompare(x.deadline));
  const unknown = matched
    .filter((j) => vacancyStatus(j.deadline) === "unknown")
    .sort((x, y) => numericId(y.id) - numericId(x.id));
  const sorted = [...active, ...expired, ...unknown];
  const total = sorted.length;
  const results = sorted
    .slice((a.page - 1) * a.page_size, a.page * a.page_size)
    .map(toVacancyResult);
  return { total, page: a.page, page_size: a.page_size, results };
}

/* ------------------------------------------------------------------ */
/* get_job_details                                                     */
/* ------------------------------------------------------------------ */

const jobDetailsArgs = z
  .object({
    id: z.string().max(50).optional(),
    slug: z.string().max(200).optional(),
  })
  .refine((v) => v.id || v.slug, {
    message: "Provide id (e.g. sj-162) or slug",
  });

export function getJobDetails(raw: unknown) {
  const a = jobDetailsArgs.parse(raw);
  const job = a.id
    ? SARKARI_JOBS.find((j) => j.id === a.id)
    : SARKARI_JOBS.find((j) => sarkariSlug(j) === a.slug);
  if (!job) {
    throw new ToolError(
      a.id ? `No vacancy found with id ${a.id}` : `No vacancy found with slug ${a.slug}`,
    );
  }
  return toVacancyResult(job);
}

/* ------------------------------------------------------------------ */
/* latest_vacancies                                                    */
/* ------------------------------------------------------------------ */

const latestVacanciesArgs = z.object({
  limit: z.number().int().min(1).max(20).default(10),
  category: z
    .enum([
      "psc",
      "security",
      "health",
      "education",
      "local",
      "bank",
      "enterprise",
      "other",
    ])
    .optional(),
});

export function latestVacancies(raw: unknown) {
  const a = latestVacanciesArgs.parse(raw);
  const items = SARKARI_JOBS.filter(
    (j) => !a.category || j.category === a.category,
  )
    .sort((x, y) => numericId(y.id) - numericId(x.id))
    .slice(0, a.limit)
    .map(toVacancyResult);
  return { total_listed: SARKARI_JOBS.length, count: items.length, results: items };
}

/* ------------------------------------------------------------------ */
/* search_articles / get_article                                       */
/* ------------------------------------------------------------------ */

const searchArticlesArgs = z.object({
  query: z.string().max(200).optional(),
  category: z.string().max(100).optional(),
  country: z.string().max(100).optional(),
  page: z.number().int().min(1).max(10000).default(1),
  page_size: z.number().int().min(1).max(50).default(20),
});

export async function searchArticles(raw: unknown) {
  const a = searchArticlesArgs.parse(raw);
  const and: Record<string, unknown>[] = [];
  if (a.query) {
    and.push({
      OR: [
        { titleEn: { contains: a.query, mode: "insensitive" } },
        { excerptEn: { contains: a.query, mode: "insensitive" } },
        { bodyEn: { contains: a.query, mode: "insensitive" } },
      ],
    });
  }
  if (a.category) {
    and.push({ category: { equals: a.category, mode: "insensitive" } });
  }
  if (a.country) {
    and.push({ country: { equals: a.country, mode: "insensitive" } });
  }
  const where = and.length ? { AND: and } : {};
  const [total, rows] = await Promise.all([
    db.article.count({ where }),
    db.article.findMany({
      where,
      orderBy: { publishedAt: "desc" },
      skip: (a.page - 1) * a.page_size,
      take: a.page_size,
      select: {
        slug: true,
        category: true,
        country: true,
        titleEn: true,
        excerptEn: true,
        sources: true,
        publishedAt: true,
      },
    }),
  ]);
  return {
    total,
    page: a.page,
    page_size: a.page_size,
    results: rows.map((r) => ({
      slug: r.slug,
      url: `${SITE_URL}/articles/${r.slug}`,
      title: r.titleEn,
      excerpt: r.excerptEn,
      category: r.category,
      country: r.country,
      sources: r.sources,
      published_at: r.publishedAt.toISOString(),
    })),
  };
}

const getArticleArgs = z.object({
  slug: z.string().min(1).max(200),
});

export async function getArticle(raw: unknown) {
  const a = getArticleArgs.parse(raw);
  const r = await db.article.findUnique({
    where: { slug: a.slug },
    select: {
      slug: true,
      category: true,
      country: true,
      titleEn: true,
      titleNe: true,
      excerptEn: true,
      excerptNe: true,
      bodyEn: true,
      sources: true,
      publishedAt: true,
    },
  });
  if (!r) throw new ToolError(`No article found with slug ${a.slug}`);
  return {
    slug: r.slug,
    url: `${SITE_URL}/articles/${r.slug}`,
    title: r.titleEn,
    title_ne: r.titleNe,
    excerpt: r.excerptEn,
    excerpt_ne: r.excerptNe,
    body: r.bodyEn,
    body_note:
      "body is the full English article text; a Nepali version is available on the article page via its language picker.",
    category: r.category,
    country: r.country,
    sources: r.sources,
    published_at: r.publishedAt.toISOString(),
    deadline: null,
    deadline_note:
      "Articles carry no deadline field; any deadline mentioned lives in the body text and must be quoted from there, never inferred.",
  };
}

/* ------------------------------------------------------------------ */
/* Tool registry (JSON Schema is hand-written: no extra dependency, and
 * it stays in lockstep with the zod validators above by construction). */
/* ------------------------------------------------------------------ */

export interface McpToolDef {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  run: (args: unknown) => unknown | Promise<unknown>;
}

const categoryEnum = [
  "psc",
  "security",
  "health",
  "education",
  "local",
  "bank",
  "enterprise",
  "other",
];

export const MCP_TOOLS: McpToolDef[] = [
  {
    name: "search_jobs",
    description:
      "Search Growentix Nepal government vacancy listings (public-sector notices: PSC, security forces, hospitals, local levels, enterprises, banks). Returns real listings only, each with its deadline as stated in the official notice and a computed status: active (deadline today or later, Asia/Kathmandu), expired (deadline passed), or unknown. Expired listings are never presented as active. Null seats, salary, location or qualification means the notice did not state it. All listings are Nepal public-sector notices.",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string", description: "Keyword matched against organisation, post title and location.", maxLength: 200 },
        category: { type: "string", enum: categoryEnum },
        location: { type: "string", description: "Substring match on the listing location.", maxLength: 200 },
        deadline_from: { type: "string", description: "YYYY-MM-DD, inclusive." },
        deadline_to: { type: "string", description: "YYYY-MM-DD, inclusive." },
        status: { type: "string", enum: ["active", "expired", "all"], default: "active" },
        page: { type: "integer", minimum: 1, default: 1 },
        page_size: { type: "integer", minimum: 1, maximum: 50, default: 20 },
      },
    },
    run: (args) => searchJobs(args),
  },
  {
    name: "get_job_details",
    description:
      "Full details for one Nepal government vacancy listing, by its id (e.g. sj-162) or its Growentix slug. Returns the listing with its real deadline, computed status, official source and notice links, and the Growentix page URL. Null fields mean the notice did not state them.",
    inputSchema: {
      type: "object",
      properties: {
        id: { type: "string", description: "Listing id, e.g. sj-162.", maxLength: 50 },
        slug: { type: "string", description: "Growentix listing slug.", maxLength: 200 },
      },
    },
    run: (args) => getJobDetails(args),
  },
  {
    name: "latest_vacancies",
    description:
      "The newest Nepal government vacancy listings, newest first, each with its real deadline and computed status (active, expired, or unknown). Use this for 'what is new' questions. Status is always shown; expired entries are never hidden or relabelled as active.",
    inputSchema: {
      type: "object",
      properties: {
        limit: { type: "integer", minimum: 1, maximum: 20, default: 10 },
        category: { type: "string", enum: categoryEnum },
      },
    },
    run: (args) => latestVacancies(args),
  },
  {
    name: "search_articles",
    description:
      "Search Growentix job-news and career articles (international and national coverage: Nepal, USA, India, Canada and more). Filter by keyword, category and country. Returns title, excerpt, Growentix URL, publication date and the article's own source list. Articles carry no deadline field, so never attribute a deadline to an article unless its body text states one.",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string", description: "Keyword matched against title, excerpt and body.", maxLength: 200 },
        category: { type: "string", description: "Article category, e.g. global, nepal, career.", maxLength: 100 },
        country: { type: "string", description: "Country the article is about, e.g. India, USA, Canada, Nepal.", maxLength: 100 },
        page: { type: "integer", minimum: 1, default: 1 },
        page_size: { type: "integer", minimum: 1, maximum: 50, default: 20 },
      },
    },
    run: (args) => searchArticles(args),
  },
  {
    name: "get_article",
    description:
      "Full text of one Growentix job-news or career article, by its slug. Returns the complete English body, Nepali title and excerpt, Growentix URL, publication date and sources. The article's deadline field is null by design: quote deadlines only from the body text itself.",
    inputSchema: {
      type: "object",
      properties: {
        slug: { type: "string", description: "Article slug, e.g. upsssc-inter-level-1784-posts-20261025.", minLength: 1, maxLength: 200 },
      },
      required: ["slug"],
    },
    run: (args) => getArticle(args),
  },
];

export function findTool(name: string): McpToolDef | undefined {
  return MCP_TOOLS.find((t) => t.name === name);
}
