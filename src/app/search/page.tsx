import Link from "next/link";
import { db } from "@/lib/db";
import { ARTICLE_CATEGORIES, articleCategoryLabel, matchesSearch } from "@/lib/articles";
import { articleImagesFor } from "@/data/articleImages";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Search Job News",
  description: "Search job news from around the world by keyword, region or category.",
  robots: { index: false, follow: true },
};

function formatDate(d: Date) {
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" }).format(d);
}

const TRENDING = ["AI jobs", "EPS Korea", "Gulf", "Caregiver", "Remote", "USA visa"];

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; category?: string }>;
}) {
  const sp = await searchParams;
  const query = (sp.search ?? "").trim();
  const active = sp.category ?? "";

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
  const results = query ? rows.filter((a) => matchesSearch(a, query)) : [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <p className="gx-eyebrow">Find your next opportunity</p>
      <h1 className="gx-h2 mt-2">Search</h1>

      <form action="/search" method="get" role="search" className="mt-6 flex max-w-2xl items-center rounded-full bg-white p-1.5 shadow-lg shadow-slate-200 ring-1 ring-slate-200">
        <label htmlFor="search-q" className="sr-only">Search job news</label>
        <svg className="ml-3 h-5 w-5 shrink-0 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
        <input
          id="search-q"
          name="search"
          type="search"
          defaultValue={query}
          placeholder="Search job news (e.g. “remote jobs”, “web developer”)…"
          className="h-11 w-full flex-1 bg-transparent px-3 text-[15px] text-slate-900 placeholder:text-slate-400 focus:outline-none"
        />
        <button type="submit" aria-label="Search" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white transition hover:bg-emerald-700">
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
      </form>

      {/* Category filter */}
      <div className="mt-6 flex flex-wrap gap-2">
        <Link
          href="/search"
          className={`rounded-full px-4 py-2 text-sm font-medium transition ${!active ? "bg-emerald-600 text-white" : "border border-slate-200 bg-white text-slate-700 hover:border-emerald-300"}`}
        >
          All
        </Link>
        {ARTICLE_CATEGORIES.map((c) => (
          <Link
            key={c.slug}
            href={`/search?category=${c.slug}${query ? `&search=${encodeURIComponent(query)}` : ""}`}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${active === c.slug ? "bg-emerald-600 text-white" : "border border-slate-200 bg-white text-slate-700 hover:border-emerald-300"}`}
          >
            {c.label}
          </Link>
        ))}
      </div>

      {!query && (
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Trending:</span>
          {TRENDING.map((t) => (
            <Link key={t} href={`/search?search=${encodeURIComponent(t)}`} className="rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-emerald-400 hover:text-emerald-800">
              {t}
            </Link>
          ))}
        </div>
      )}

      {query && (
        <p className="mt-8 text-sm text-slate-600">
          {results.length} matching {results.length === 1 ? "article" : "articles"} for <strong className="text-slate-900">“{query}”</strong>
          {active && <> in <strong className="text-slate-900">{articleCategoryLabel(active)}</strong></>}
        </p>
      )}

      {!query ? (
        <p className="mt-10 text-center text-sm text-slate-500">Type a keyword above to search job news from around the world.</p>
      ) : results.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-10 text-center">
          <p className="text-lg font-semibold text-slate-900">No articles found for “{query}”</p>
          <p className="mt-2 text-sm text-slate-600">
            Try fewer or different words — e.g. <Link href="/search?search=AI%20jobs" className="font-semibold text-emerald-700 hover:underline">AI jobs</Link>, <Link href="/search?search=Korea" className="font-semibold text-emerald-700 hover:underline">Korea</Link>, or <Link href="/search?search=Gulf" className="font-semibold text-emerald-700 hover:underline">Gulf</Link>.
          </p>
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          {results.map((a) => {
            const images = articleImagesFor(a.slug);
            return (
              <Link key={a.slug} href={`/articles/${a.slug}`} className="gx-lift group flex gap-4 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
                {images ? (
                  <img src={images[0]} alt="" loading="lazy" className="hidden h-20 w-24 shrink-0 rounded-xl object-cover sm:block" />
                ) : (
                  <span className="hidden h-20 w-24 shrink-0 items-center justify-center rounded-xl bg-emerald-50 font-display text-2xl font-extrabold text-emerald-700 sm:flex">
                    {articleCategoryLabel(a.category).charAt(0)}
                  </span>
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-display text-[15px] font-bold leading-snug text-slate-900 group-hover:text-emerald-800 sm:text-base">{a.titleEn}</p>
                    <span className="shrink-0 text-xs text-slate-500">{formatDate(a.publishedAt)}</span>
                  </div>
                  <p className="mt-1 truncate text-sm text-slate-600">{a.country ?? articleCategoryLabel(a.category)}</p>
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">{articleCategoryLabel(a.category)}</span>
                    {a.country && (
                      <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">{a.country}</span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
