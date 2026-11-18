import type { Metadata } from "next";
import { ArticleCards } from "@/components/articles/ArticleCards";
import { SmallSearch } from "@/components/articles/SmallSearch";
import { getJobListing } from "@/lib/jobListings";

export const revalidate = 60;

type SearchParams = Promise<{ page?: string | string[] }>;

function firstParam(params: string | string[] | undefined): string {
  return Array.isArray(params) ? params[0] ?? "" : params ?? "";
}

export async function generateMetadata({ searchParams }: { searchParams: SearchParams }): Promise<Metadata> {
  const params = await searchParams;
  const page = parseInt(firstParam(params.page), 10);
  // Paged views (?page=2+) are noindex, follow — same rule as the other
  // section listings — so only the first page is indexed.
  return {
    title: "Private Jobs — Company Vacancies",
    description: "Private-sector jobs from named companies — tech, banking, retail and more, with official sources and deadlines.",
    alternates: { canonical: "https://growentix.cloud/private-jobs" },
    ...(Number.isFinite(page) && page > 1 ? { robots: { index: false, follow: true } } : {}),
  };
}

export default async function PrivateJobsPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const requestedPage = parseInt(firstParam(params.page), 10);
  const page = Number.isFinite(requestedPage) && requestedPage > 0 ? requestedPage : 1;
  const listing = await getJobListing("private", page);
  if (!listing) return null;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <p className="gx-eyebrow">Private Jobs</p>
      <h1 className="gx-h2 mt-2">Private jobs</h1>
      <p className="gx-sub mt-2 max-w-2xl">
        Private-sector vacancies from named companies — tech, banking, retail and more, newest first.{" "}
        {listing.total} articles. Every vacancy links to its official source — never pay anyone for a
        job.
      </p>
      <div className="mt-5">
        <SmallSearch scope="jobs" />
      </div>
      <ArticleCards
        articles={listing.articles}
        categories={[]}
        basePath="/private-jobs"
        allLabel="All"
        variant="grid"
        active=""
        page={listing.page}
        totalPages={listing.totalPages}
      />
    </div>
  );
}
