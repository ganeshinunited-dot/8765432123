import type { Metadata } from "next";
import CategoryListing from "@/components/articles/CategoryListing";

export const revalidate = 60;

type SearchParams = Promise<{ page?: string | string[] }>;

/**
 * Remote Jobs hub (GEO Step 8, plan §9). This used to be a legacy
 * SeoLandingPage over employer-posted jobs (workArrangement REMOTE/HYBRID)
 * — employer posting is paused, so it rendered "Latest openings (0)" with
 * no article links at all, a dead end for readers arriving from /usa,
 * /europe and /countries. It now lists the same remote-category articles
 * as /remote, newest first. The listing is identical to /remote, so this
 * URL is noindex with canonical → /remote: it stays live for visitors and
 * never competes with /remote in search. Nothing was deleted — the URL,
 * its sitemap entry and its inbound links are unchanged.
 */
export async function generateMetadata({ searchParams }: { searchParams: SearchParams }): Promise<Metadata> {
  const params = await searchParams;
  const page = parseInt(Array.isArray(params.page) ? params.page[0] ?? "1" : params.page ?? "1", 10);
  return {
    title: "Remote Jobs",
    description: "Remote jobs and work-from-home opportunities from around the world — worldwide remote roles, salaries and hiring news. Newest remote jobs first, apply today.",
    alternates: { canonical: "https://growentix.cloud/remote" },
    robots: { index: false, follow: true },
    openGraph: {
      title: "Remote Jobs | Growentix",
      description: "Remote jobs and work-from-home opportunities from around the world — worldwide remote roles, salaries and hiring news. Newest remote jobs first, apply today.",
      url: "https://growentix.cloud/remote-jobs",
    },
    ...(Number.isFinite(page) && page > 1 ? { robots: { index: false, follow: true } } : {}),
  };
}

export default function Page({ searchParams }: { searchParams: SearchParams }) {
  return <CategoryListing slug="remote" label="Remote Jobs" subtitle="Remote jobs and work-from-home opportunities, newest first." searchParams={searchParams} />;
}
