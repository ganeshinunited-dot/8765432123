import type { Metadata } from "next";
import CategoryListing from "@/components/articles/CategoryListing";

export const revalidate = 60;

type SearchParams = Promise<{ page?: string | string[] }>;

export async function generateMetadata({ searchParams }: { searchParams: SearchParams }): Promise<Metadata> {
  const params = await searchParams;
  const page = parseInt(Array.isArray(params.page) ? params.page[0] ?? "1" : params.page ?? "1", 10);
  return {
    title: "UK Jobs | Growentix",
    description: "UK job news — NHS, care and skilled worker roles, newest first.",
    alternates: { canonical: "https://growentix.cloud/uk" },
    openGraph: {
      title: "UK Jobs | Growentix",
      description: "UK job news — NHS, care and skilled worker roles, newest first.",
      url: "https://growentix.cloud/uk",
    },
    ...(Number.isFinite(page) && page > 1 ? { robots: { index: false, follow: true } } : {}),
  };
}

export default function Page({ searchParams }: { searchParams: SearchParams }) {
  return <CategoryListing slug="uk" label="UK Jobs" subtitle="UK job news — NHS, care and skilled worker roles, newest first." searchParams={searchParams} />;
}
