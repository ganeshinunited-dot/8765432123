import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleCards } from "@/components/articles/ArticleCards";
import { SmallSearch } from "@/components/articles/SmallSearch";
import { INDUSTRIES, industryBySlug } from "@/lib/articles";
import { getJobListing } from "@/lib/jobListings";

export const revalidate = 60;

type SearchParams = Promise<{ page?: string | string[] }>;

function firstParam(params: string | string[] | undefined): string {
  return Array.isArray(params) ? params[0] ?? "" : params ?? "";
}

export async function generateStaticParams() {
  return INDUSTRIES.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: SearchParams;
}): Promise<Metadata> {
  const { slug } = await params;
  const industry = industryBySlug(slug);
  if (!industry) return {};
  const sp = await searchParams;
  const page = parseInt(firstParam(sp.page), 10);
  // Paged views (?page=2+) are noindex, follow — same rule as the other
  // section listings — so only the first page is indexed.
  return {
    title: `${industry.name} Jobs — Verified Vacancies`,
    description: `${industry.name} jobs — ${industry.description}`,
    alternates: { canonical: `https://growentix.cloud/industries/${slug}` },
    ...(Number.isFinite(page) && page > 1 ? { robots: { index: false, follow: true } } : {}),
  };
}

export default async function IndustryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: SearchParams;
}) {
  const { slug } = await params;
  const industry = industryBySlug(slug);
  if (!industry) notFound();

  const sp = await searchParams;
  const requestedPage = parseInt(firstParam(sp.page), 10);
  const page = Number.isFinite(requestedPage) && requestedPage > 0 ? requestedPage : 1;
  const listing = await getJobListing(slug, page);
  if (!listing) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <p className="gx-eyebrow">Industries</p>
      <h1 className="gx-h2 mt-2">{industry.name} jobs</h1>
      <p className="gx-sub mt-2 max-w-2xl">
        {industry.description} {listing.total} articles, newest first. Every vacancy links to its
        official source — never pay anyone for a job.
      </p>
      <div className="mt-5">
        <SmallSearch scope="jobs" />
      </div>
      <ArticleCards
        articles={listing.articles}
        categories={[]}
        basePath={`/industries/${slug}`}
        allLabel="All"
        variant="grid"
        active=""
        page={listing.page}
        totalPages={listing.totalPages}
      />
    </div>
  );
}
