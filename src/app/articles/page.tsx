import type { Metadata } from "next";
import CategoryListing from "@/components/articles/CategoryListing";

type SearchParams = Promise<{ page?: string | string[]; country?: string | string[] }>;

/**
 * News — its own section now, like every other tab: only articles published
 * with category "news" live here. Job posts, pop music and tech news stay in
 * their own sections (Jobs, Pop Music, Tech) and no longer appear in News.
 * Until news articles are published, this page is empty by design.
 */
export async function generateMetadata({ searchParams }: { searchParams: SearchParams }): Promise<Metadata> {
  const params = await searchParams;
  const page = parseInt(Array.isArray(params.page) ? params.page[0] ?? "" : params.page ?? "", 10);
  const country = Array.isArray(params.country) ? params.country[0] ?? "" : params.country ?? "";
  return {
    title: "News",
    description: "Breaking international news — world politics, business, sport and culture. The biggest stories and the people behind them, updated daily.",
    alternates: { canonical: "https://growentix.cloud/articles" },
    // Filtered (?country=) and paged views are noindex, follow — same rule
    // as the Explore page — so only the unfiltered first page is indexed.
    ...(country || (Number.isFinite(page) && page > 1) ? { robots: { index: false, follow: true } } : {}),
  };
}

export default async function ArticlesPage({ searchParams }: { searchParams: SearchParams }) {
  return (
    <CategoryListing
      slug="news"
      label="News"
      subtitle="Fresh news stories from around the world."
      basePath="/articles"
      searchParams={searchParams}
      showCountryPills
    />
  );
}
