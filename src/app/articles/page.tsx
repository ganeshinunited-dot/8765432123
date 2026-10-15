import Link from "next/link";
import { db } from "@/lib/db";
import { ARTICLE_CATEGORIES, articleCategoryLabel } from "@/lib/articles";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string }>;
}) {
  const sp = await searchParams;
  // Category-filtered and search views are thin duplicates — keep them out of the index.
  if (sp.category || sp.search) {
    return {
      robots: { index: false, follow: true },
    };
  }
  return {
    title: "Job News & Articles",
    description:
      "Daily job news from around the world — hiring trends, Gulf jobs, Korea & Japan opportunities, remote work and career guides.",
    alternates: { canonical: "https://growentix.cloud/articles" },
  };
}

function formatDate(d: Date): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(d);
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
function matchesSearch(
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

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string }>;
}) {
  const sp = await searchParams;
  const active = sp.category ?? "";
  const search = (sp.search ?? "").trim();

  const rows = await db.article.findMany({
    where: active ? { category: active } : undefined,
    orderBy: { publishedAt: "desc" },
    take: 200,
    select: {
      slug: true,
      category: true,
      country: true,
      titleEn: true,
      excerptEn: true,
      titleNe: true,
      excerptNe: true,
      publishedAt: true,
    },
  });
  const articles = search ? rows.filter((a) => matchesSearch(a, search)) : rows.slice(0, 60);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <p className="gx-eyebrow">Daily job news</p>
      <h1 className="gx-h2 mt-2">{search ? `Results for “${search}”` : "Articles"}</h1>
      <p className="gx-sub mt-2 max-w-2xl">
        {search
          ? `${articles.length} matching ${articles.length === 1 ? "article" : "articles"}.`
          : "Fresh job stories from around the world."}
      </p>

      <form action="/articles" method="get" role="search" className="mt-6 flex max-w-xl gap-2">
        <label htmlFor="articles-search" className="sr-only">Search articles</label>
        <input
          id="articles-search"
          name="search"
          type="search"
          defaultValue={search}
          placeholder="Search job news — try “AI jobs”…"
          className="h-12 w-full flex-1 rounded-xl border border-slate-300 bg-white px-4 text-[15px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600"
        />
        <button type="submit" className="h-12 shrink-0 rounded-xl gx-btn gx-btn-primary px-5 text-sm font-bold text-white">
          Search
        </button>
      </form>

      {search && (
        <Link href="/articles" className="mt-4 inline-block text-sm font-semibold text-emerald-700 hover:underline">
          ← Clear search
        </Link>
      )}

      <div className="mt-6 flex flex-wrap gap-2">
        <Link
          href="/articles"
          className={`rounded-full px-4 py-2 text-sm font-medium transition ${
            !active
              ? "bg-emerald-600 text-white"
              : "border border-slate-200 bg-white text-slate-700 hover:border-emerald-300"
          }`}
        >
          All
        </Link>
        {ARTICLE_CATEGORIES.map((c) => (
          <Link
            key={c.slug}
            href={`/articles?category=${c.slug}`}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              active === c.slug
                ? "bg-emerald-600 text-white"
                : "border border-slate-200 bg-white text-slate-700 hover:border-emerald-300"
            }`}
          >
            {c.label}
          </Link>
        ))}
      </div>

      {articles.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-10 text-center">
          <p className="text-lg font-semibold text-slate-900">
            {search ? `No articles found for “${search}”` : "New articles are on the way"}
          </p>
          <p className="mt-2 text-sm text-slate-600">
            {search ? (
              <>Try fewer or different words — e.g. <Link href="/articles?search=AI%20jobs" className="font-semibold text-emerald-700 hover:underline">AI jobs</Link>, <Link href="/articles?search=Korea" className="font-semibold text-emerald-700 hover:underline">Korea</Link>, or <Link href="/articles?search=Gulf" className="font-semibold text-emerald-700 hover:underline">Gulf</Link>.</>
            ) : (
              "We publish fresh job news every morning — check back soon."
            )}
          </p>
        </div>
      ) : (
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => (
            <Link
              key={a.slug}
              href={`/articles/${a.slug}`}
              className="gx-lift group flex flex-col rounded-2xl border border-slate-200 bg-white p-6"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                  {articleCategoryLabel(a.category)}
                </span>
                {a.country && (
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                    {a.country}
                  </span>
                )}
              </div>
              <h2 className="mt-3 text-lg font-bold leading-snug text-slate-900 group-hover:text-emerald-700">
                {a.titleEn}
              </h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{a.excerptEn}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-slate-500">{formatDate(a.publishedAt)}</span>
                <span className="text-sm font-semibold text-emerald-700 group-hover:underline">
                  Read article <span aria-hidden="true">&rarr;</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
