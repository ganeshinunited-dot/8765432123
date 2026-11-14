import type { Metadata } from "next";
import CategoryListing from "@/components/articles/CategoryListing";

export const revalidate = 60;

type SearchParams = Promise<{ page?: string | string[] }>;

export async function generateMetadata({ searchParams }: { searchParams: SearchParams }): Promise<Metadata> {
  const params = await searchParams;
  const page = parseInt(Array.isArray(params.page) ? params.page[0] ?? "1" : params.page ?? "1", 10);
  return {
    title: "Remote Work | Growentix",
    description: "Remote jobs and work-from-home opportunities, newest first.",
    alternates: { canonical: "https://growentix.cloud/remote" },
    openGraph: {
      title: "Remote Work | Growentix",
      description: "Remote jobs and work-from-home opportunities, newest first.",
      url: "https://growentix.cloud/remote",
    },
    ...(Number.isFinite(page) && page > 1 ? { robots: { index: false, follow: true } } : {}),
  };
}

export default function Page({ searchParams }: { searchParams: SearchParams }) {
  return <CategoryListing slug="remote" label="Remote Work" subtitle="Remote jobs and work-from-home opportunities, newest first." searchParams={searchParams} />;
}
