import Link from "next/link";
import { db } from "@/lib/db";
import { articleCategoryLabel, matchesSearch } from "@/lib/articles";
import { ArticleCards } from "@/components/articles/ArticleCards";
import { SmallSearch } from "@/components/articles/SmallSearch";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Stories — Search Job News",
  description: "Search stories and job news from around the world by keyword, region or category.",
  robots: { index: false, follow: true },
};

/**
 * Stories — the search page, rebuilt clean in the same body as every other
 * section (eyebrow + heading + small search + cards). The old /search route
 * redirects here. Search is by keyword over the newest 200 articles.
 */
export default async function StoriesPage({
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
  const articles = results.map((a) => ({ ...a, publishedAt: a.publishedAt.toISOString() }));

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <p className="gx-eyebrow">Stories</p>
      <h1 className="gx-h2 mt-2">Stories</h1>
      <p className="gx-sub mt-2 max-w-2xl">Search stories and job news from around the world.</p>
      <div className="mt-5">
        <SmallSearch defaultValue={query} />
      </div>

      {query && (
        <p className="mt-8 text-sm text-slate-600">
          {results.length} matching {results.length === 1 ? "article" : "articles"} for <strong className="text-slate-900">“{query}”</strong>
          {active && <> in <strong className="text-slate-900">{articleCategoryLabel(active)}</strong></>}
        </p>
      )}

      {!query ? (
        <p className="mt-10 text-center text-sm text-slate-500">Type a keyword above to search stories and job news.</p>
      ) : results.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-10 text-center">
          <p className="text-lg font-semibold text-slate-900">No articles found for “{query}”</p>
          <p className="mt-2 text-sm text-slate-600">
            Try fewer or different words — e.g. <Link href="/stories?search=AI%20jobs" className="font-semibold text-emerald-700 hover:underline">AI jobs</Link>, <Link href="/stories?search=Korea" className="font-semibold text-emerald-700 hover:underline">Korea</Link>, or <Link href="/stories?search=Gulf" className="font-semibold text-emerald-700 hover:underline">Gulf</Link>.
          </p>
        </div>
      ) : (
        <ArticleCards
          articles={articles}
          categories={[]}
          basePath="/stories"
          allLabel="All"
          variant="list"
          active=""
          page={1}
          totalPages={1}
        />
      )}
    </div>
  );
}
