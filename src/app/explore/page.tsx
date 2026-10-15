import { db } from "@/lib/db";
import { ARTICLE_CATEGORIES, INTERNATIONAL_CATEGORIES } from "@/lib/articles";
import { articleImagesFor } from "@/data/articleImages";
import { FilteredArticleList } from "@/components/articles/FilteredArticleList";

export const revalidate = 300; // ISR: serve cached HTML, regenerate in background; admin/cron purge on publish

export const metadata = {
  title: "Explore International Jobs — Big Companies, Big Countries",
  description:
    "Job news from big companies in big countries — USA, UK, Canada, Australia, Europe, Asia, Gulf, Korea & Japan, remote work and work abroad.",
  alternates: { canonical: "https://growentix.cloud/explore" },
};

export default async function ExplorePage() {
  // NOTE: no searchParams here on purpose — reading searchParams on the
  // server forces full dynamic rendering and kills the ISR cache. Category
  // filtering happens client-side in FilteredArticleList; filtered URLs
  // canonicalise to /explore.
  const rows = await db.article.findMany({
    where: { category: { in: [...INTERNATIONAL_CATEGORIES] } },
    orderBy: { publishedAt: "desc" },
    take: 60,
    select: { slug: true, category: true, country: true, titleEn: true, excerptEn: true, publishedAt: true },
  });
  const articles = rows.map((a) => ({
    ...a,
    publishedAt: a.publishedAt.toISOString(),
    image: articleImagesFor(a.slug)?.[0] ?? null,
  }));
  const regions = ARTICLE_CATEGORIES.filter((c) =>
    (INTERNATIONAL_CATEGORIES as readonly string[]).includes(c.slug)
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <p className="gx-eyebrow">International</p>
      <h1 className="gx-h2 mt-2">Explore International Jobs</h1>
      <p className="gx-sub mt-2 max-w-2xl">
        Job news from big companies in big countries — USA, UK, Canada, Australia, Europe, Asia, Gulf, Korea &amp; Japan, remote work and work abroad.
      </p>
      <FilteredArticleList
        articles={articles}
        categories={regions}
        basePath="/explore"
        allLabel="All International"
        variant="list"
      />
    </div>
  );
}
