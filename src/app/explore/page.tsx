import type { Metadata } from "next";
import { db } from "@/lib/db";
import { ARTICLE_CATEGORIES, INTERNATIONAL_CATEGORIES } from "@/lib/articles";
import { articleImagesFor } from "@/data/articleImages";
import { ArticleCards } from "@/components/articles/ArticleCards";

type SearchParams = Promise<{ category?: string | string[] }>;

function activeCategory(params: { category?: string | string[] }): string {
  return Array.isArray(params.category) ? params.category[0] ?? "" : params.category ?? "";
}

export async function generateMetadata({ searchParams }: { searchParams: SearchParams }): Promise<Metadata> {
  const category = activeCategory(await searchParams);
  return {
    title: "Explore International Jobs — Big Companies, Big Countries",
    description:
      "Job news from big companies in big countries — USA, UK, Canada, Australia, Europe, Asia, Gulf, Korea & Japan, remote work and work abroad.",
    alternates: { canonical: "https://growentix.cloud/explore" },
    ...(category ? { robots: { index: false, follow: true } } : {}),
  };
}

export default async function ExplorePage({ searchParams }: { searchParams: SearchParams }) {
  // Server-side category filtering: reading searchParams makes this route
  // dynamic (no ISR cache), but every article link is rendered into the raw
  // HTML, so crawlers discover articles without executing JavaScript.
  const active = activeCategory(await searchParams);
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
      <ArticleCards
        articles={articles}
        categories={regions}
        basePath="/explore"
        allLabel="All International"
        variant="list"
        active={active}
      />
    </div>
  );
}
