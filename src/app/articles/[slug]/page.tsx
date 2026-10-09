import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { db } from "@/lib/db";
import { articleCategoryLabel } from "@/lib/articles";
import { ArticleView } from "@/components/articles/ArticleView";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = await db.article.findUnique({
    where: { slug },
    select: { titleEn: true, excerptEn: true, updatedAt: true },
  });
  if (!a) return {};
  return {
    title: `${a.titleEn} | Growentix`,
    description: a.excerptEn,
    alternates: { canonical: `https://growentix.cloud/articles/${slug}` },
    openGraph: {
      title: a.titleEn,
      description: a.excerptEn,
      type: "article",
      url: `https://growentix.cloud/articles/${slug}`,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = await db.article.findUnique({ where: { slug } });
  if (!a) notFound();

  const related = await db.article.findMany({
    where: { category: a.category, slug: { not: a.slug } },
    orderBy: { publishedAt: "desc" },
    take: 5,
    select: { slug: true, titleEn: true, publishedAt: true },
  });

  const [newer, older] = await Promise.all([
    db.article.findFirst({
      where: { publishedAt: { gt: a.publishedAt } },
      orderBy: { publishedAt: "asc" },
      select: { slug: true, titleEn: true },
    }),
    db.article.findFirst({
      where: { publishedAt: { lt: a.publishedAt } },
      orderBy: { publishedAt: "desc" },
      select: { slug: true, titleEn: true },
    }),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: a.titleEn,
    description: a.excerptEn,
    datePublished: a.publishedAt.toISOString(),
    dateModified: a.updatedAt.toISOString(),
    author: { "@type": "Organization", name: "Growentix" },
    publisher: { "@type": "Organization", name: "Growentix" },
    inLanguage: ["en", "ne"],
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArticleView
        article={{
          slug: a.slug,
          category: a.category,
          country: a.country,
          titleEn: a.titleEn,
          titleNe: a.titleNe,
          excerptEn: a.excerptEn,
          bodyEn: a.bodyEn,
          bodyNe: a.bodyNe,
          sources: a.sources,
          publishedAt: a.publishedAt.toISOString(),
        }}
      />

      {related.length > 0 && (
        <div className="mt-12 border-t border-slate-200 pt-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">Related articles</h2>
            <Link
              href={`/articles?category=${a.category}`}
              className="text-sm font-semibold text-emerald-700 hover:underline"
            >
              More in {articleCategoryLabel(a.category)} <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
          <div className="mt-4 space-y-3">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/articles/${r.slug}`}
                className="block rounded-xl border border-slate-200 bg-white p-4 transition hover:border-emerald-300"
              >
                <p className="text-xs font-semibold text-emerald-700">
                  {articleCategoryLabel(a.category)}
                </p>
                <p className="mt-1 font-semibold text-slate-900">{r.titleEn}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {(newer || older) && (
        <nav aria-label="Article navigation" className="mt-8 grid gap-3 sm:grid-cols-2">
          {older ? (
            <Link
              href={`/articles/${older.slug}`}
              className="rounded-xl border border-slate-200 bg-white p-4 transition hover:border-emerald-300"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">&larr; Older</p>
              <p className="mt-1 text-sm font-semibold text-slate-900">{older.titleEn}</p>
            </Link>
          ) : <span />}
          {newer && (
            <Link
              href={`/articles/${newer.slug}`}
              className="rounded-xl border border-slate-200 bg-white p-4 text-right transition hover:border-emerald-300"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Newer &rarr;</p>
              <p className="mt-1 text-sm font-semibold text-slate-900">{newer.titleEn}</p>
            </Link>
          )}
        </nav>
      )}
    </div>
  );
}
