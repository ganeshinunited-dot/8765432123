import type { Metadata } from "next";
import { db } from "@/lib/db";
import { ARTICLE_CATEGORIES } from "@/lib/articles";
import { ArticleCards } from "@/components/articles/ArticleCards";

type SearchParams = Promise<{ category?: string | string[] }>;

function activeCategory(params: { category?: string | string[] }): string {
  return Array.isArray(params.category) ? params.category[0] ?? "" : params.category ?? "";
}

export async function generateMetadata({ searchParams }: { searchParams: SearchParams }): Promise<Metadata> {
  const category = activeCategory(await searchParams);
  return {
    title: "Job News & Articles",
    description:
      "Daily job news from around the world — hiring trends, Gulf jobs, Korea & Japan opportunities, remote work and career guides.",
    alternates: { canonical: "https://growentix.cloud/articles" },
    ...(category ? { robots: { index: false, follow: true } } : {}),
  };
}

export default async function ArticlesPage({ searchParams }: { searchParams: SearchParams }) {
  // Server-side category filtering: reading searchParams makes this route
  // dynamic (no ISR cache), but every article link is rendered into the raw
  // HTML, so crawlers discover articles without executing JavaScript.
  const active = activeCategory(await searchParams);
  const rows = await db.article.findMany({
    orderBy: { publishedAt: "desc" },
    take: 60,
    select: {
      slug: true,
      category: true,
      country: true,
      titleEn: true,
      excerptEn: true,
      publishedAt: true,
    },
  });
  const articles = rows.map((a) => ({ ...a, publishedAt: a.publishedAt.toISOString() }));

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <p className="gx-eyebrow">Daily job news</p>
      <h1 className="gx-h2 mt-2">Articles</h1>
      <p className="gx-sub mt-2 max-w-2xl">Fresh job stories from around the world.</p>
      <ArticleCards
        articles={articles}
        categories={ARTICLE_CATEGORIES}
        basePath="/articles"
        allLabel="All"
        variant="grid"
        active={active}
      />
    </div>
  );
}
