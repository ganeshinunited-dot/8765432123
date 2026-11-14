import type { Metadata } from "next";
import CategoryListing from "@/components/articles/CategoryListing";

export const revalidate = 60;

type SearchParams = Promise<{ page?: string | string[] }>;

export async function generateMetadata({ searchParams }: { searchParams: SearchParams }): Promise<Metadata> {
  const params = await searchParams;
  const page = parseInt(Array.isArray(params.page) ? params.page[0] ?? "1" : params.page ?? "1", 10);
  return {
    title: "Nepal Jobs | Growentix",
    description: "Nepal government and private job news — Lok Sewa, banks, Nepal Telecom and more, newest first.",
    alternates: { canonical: "https://growentix.cloud/nepal" },
    openGraph: {
      title: "Nepal Jobs | Growentix",
      description: "Nepal government and private job news — Lok Sewa, banks, Nepal Telecom and more, newest first.",
      url: "https://growentix.cloud/nepal",
    },
    ...(Number.isFinite(page) && page > 1 ? { robots: { index: false, follow: true } } : {}),
  };
}

export default function Page({ searchParams }: { searchParams: SearchParams }) {
  return <CategoryListing slug="nepal" label="Nepal Jobs" subtitle="Nepal government and private job news — Lok Sewa, banks, Nepal Telecom and more, newest first." searchParams={searchParams} />;
}
