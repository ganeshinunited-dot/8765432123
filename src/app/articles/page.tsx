import { db } from "@/lib/db";
import { ARTICLE_CATEGORIES } from "@/lib/articles";
import { FilteredArticleList } from "@/components/articles/FilteredArticleList";

export const revalidate = 300; // ISR: serve cached HTML, regenerate in background; admin/cron purge on publish

export const metadata = {
  title: "Job News & Articles",
  description:
    "Daily job news from around the world — hiring trends, Gulf jobs, Korea & Japan opportunities, remote work and career guides.",
  alternates: { canonical: "https://growentix.cloud/articles" },
};

export default async function ArticlesPage() {
  // NOTE: no searchParams here on purpose — reading searchParams on the
  // server forces full dynamic rendering and kills the ISR cache. Category
  // filtering happens client-side in FilteredArticleList; filtered URLs
  // canonicalise to /articles.
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
      <FilteredArticleList
        articles={articles}
        categories={ARTICLE_CATEGORIES}
        basePath="/articles"
        allLabel="All"
        variant="grid"
      />
    </div>
  );
}
