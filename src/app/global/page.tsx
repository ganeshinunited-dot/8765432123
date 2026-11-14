import type { Metadata } from "next";
import CategoryListing from "@/components/articles/CategoryListing";

export const revalidate = 60;

type SearchParams = Promise<{ page?: string | string[] }>;

export async function generateMetadata({ searchParams }: { searchParams: SearchParams }): Promise<Metadata> {
  const params = await searchParams;
  const page = parseInt(Array.isArray(params.page) ? params.page[0] ?? "1" : params.page ?? "1", 10);
  return {
    title: "Global Trends | Growentix",
    description: "Global job trends and hiring news from around the world, newest first.",
    alternates: { canonical: "https://growentix.cloud/global" },
    openGraph: {
      title: "Global Trends | Growentix",
      description: "Global job trends and hiring news from around the world, newest first.",
      url: "https://growentix.cloud/global",
    },
    ...(Number.isFinite(page) && page > 1 ? { robots: { index: false, follow: true } } : {}),
  };
}

export default function Page({ searchParams }: { searchParams: SearchParams }) {
  return <CategoryListing slug="global" label="Global Trends" subtitle="Global job trends and hiring news from around the world, newest first." searchParams={searchParams} />;
}
