import type { Metadata } from "next";
import CategoryListing from "@/components/articles/CategoryListing";

export const revalidate = 60;

type SearchParams = Promise<{ page?: string | string[] }>;

export async function generateMetadata({ searchParams }: { searchParams: SearchParams }): Promise<Metadata> {
  const params = await searchParams;
  const page = parseInt(Array.isArray(params.page) ? params.page[0] ?? "1" : params.page ?? "1", 10);
  return {
    title: "USA Jobs | Growentix",
    description: "USA job news and work opportunities, newest first.",
    alternates: { canonical: "https://growentix.cloud/usa" },
    openGraph: {
      title: "USA Jobs | Growentix",
      description: "USA job news and work opportunities, newest first.",
      url: "https://growentix.cloud/usa",
    },
    ...(Number.isFinite(page) && page > 1 ? { robots: { index: false, follow: true } } : {}),
  };
}

export default function Page({ searchParams }: { searchParams: SearchParams }) {
  return <CategoryListing slug="usa" label="USA Jobs" subtitle="USA job news and work opportunities, newest first." searchParams={searchParams} />;
}
