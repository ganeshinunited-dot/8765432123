import type { Metadata } from "next";
import { db } from "@/lib/db";
import { ARTICLE_CATEGORIES, INTERNATIONAL_CATEGORIES } from "@/lib/articles";
import { articleImagesFor } from "@/data/articleImages";
import { ArticleCards } from "@/components/articles/ArticleCards";

type SearchParams = Promise<{ category?: string | string[]; page?: string | string[] }>;

const PAGE_SIZE = 20;

function firstParam(params: string | string[] | undefined): string {
  return Array.isArray(params) ? params[0] ?? "" : params ?? "";
}

function activeCategory(params: { category?: string | string[] }): string {
  return firstParam(params.category);
}

function activePage(params: { page?: string | string[] }): number {
  const n = parseInt(firstParam(params.page), 10);
  return Number.isFinite(n) && n > 0 ? n : 1;
}

export async function generateMetadata({ searchParams }: { searchParams: SearchParams }): Promise<Metadata> {
  const params = await searchParams;
  const category = activeCategory(params);
  const page = activePage(params);
  return {
    title: "Explore International Jobs — Big Companies, Big Countries",
    description:
      "Job news from big companies in big countries — USA, UK, Canada, Australia, Europe, Asia, Gulf, Korea & Japan, remote work and work abroad.",
    alternates: { canonical: "https://growentix.cloud/explore" },
    ...(category || page > 1 ? { robots: { index: false, follow: true } } : {}),
  };
}

export default async function ExplorePage({ searchParams }: { searchParams: SearchParams }) {
  // Server-side category filtering + pagination: reading searchParams makes
  // this route dynamic (no ISR cache), but every article link on the current
  // page is rendered into the raw HTML, so crawlers discover articles
  // without executing JavaScript. Pages are 20 cards each (down from 60),
  // which cuts the HTML payload and the per-request render work; older
  // pages stay reachable through the pagination nav, and every article
  // stays in the sitemap. A category outside the international set yields
  // no rows, exactly as the previous in-memory filter did.
  const params = await searchParams;
  const active = activeCategory(params);
  const requestedPage = activePage(params);
  const international = [...INTERNATIONAL_CATEGORIES];
  const where = {
    category: { in: active ? international.filter((c) => c === active) : international },
  };
  const total = await db.article.count({ where });
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const page = Math.min(requestedPage, totalPages);
  const rows = await db.article.findMany({
    where,
    orderBy: { publishedAt: "desc" },
    skip: (page - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
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
        page={page}
        totalPages={totalPages}
      />
    </div>
  );
}
