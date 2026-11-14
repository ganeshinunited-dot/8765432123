import type { Metadata } from "next";
import CategoryListing from "@/components/articles/CategoryListing";

export const revalidate = 60;

type SearchParams = Promise<{ page?: string | string[] }>;

export async function generateMetadata({ searchParams }: { searchParams: SearchParams }): Promise<Metadata> {
  const params = await searchParams;
  const page = parseInt(Array.isArray(params.page) ? params.page[0] ?? "1" : params.page ?? "1", 10);
  return {
    title: "Asia Jobs | Growentix",
    description: "Asia job news — India, government vacancies and regional opportunities, newest first.",
    alternates: { canonical: "https://growentix.cloud/asia" },
    openGraph: {
      title: "Asia Jobs | Growentix",
      description: "Asia job news — India, government vacancies and regional opportunities, newest first.",
      url: "https://growentix.cloud/asia",
    },
    ...(Number.isFinite(page) && page > 1 ? { robots: { index: false, follow: true } } : {}),
  };
}

export default function Page({ searchParams }: { searchParams: SearchParams }) {
  return <CategoryListing slug="asia" label="Asia Jobs" subtitle="Asia job news — India, government vacancies and regional opportunities, newest first." searchParams={searchParams} />;
}
