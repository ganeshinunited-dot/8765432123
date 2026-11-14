import type { Metadata } from "next";
import CategoryListing from "@/components/articles/CategoryListing";

export const revalidate = 60;

type SearchParams = Promise<{ page?: string | string[] }>;

export async function generateMetadata({ searchParams }: { searchParams: SearchParams }): Promise<Metadata> {
  const params = await searchParams;
  const page = parseInt(Array.isArray(params.page) ? params.page[0] ?? "1" : params.page ?? "1", 10);
  return {
    title: "Career Guide | Growentix",
    description: "Career guides, exam tips and job preparation, newest first.",
    alternates: { canonical: "https://growentix.cloud/career" },
    openGraph: {
      title: "Career Guide | Growentix",
      description: "Career guides, exam tips and job preparation, newest first.",
      url: "https://growentix.cloud/career",
    },
    ...(Number.isFinite(page) && page > 1 ? { robots: { index: false, follow: true } } : {}),
  };
}

export default function Page({ searchParams }: { searchParams: SearchParams }) {
  return <CategoryListing slug="career" label="Career Guide" subtitle="Career guides, exam tips and job preparation, newest first." searchParams={searchParams} />;
}
