import type { Metadata } from "next";
import CategoryListing from "@/components/articles/CategoryListing";

export const revalidate = 60;

type SearchParams = Promise<{ page?: string | string[] }>;

export async function generateMetadata({ searchParams }: { searchParams: SearchParams }): Promise<Metadata> {
  const params = await searchParams;
  const page = parseInt(Array.isArray(params.page) ? params.page[0] ?? "1" : params.page ?? "1", 10);
  return {
    title: "Korea & Japan | Growentix",
    description: "Korea and Japan work opportunities — EPS, SSW and other overseas jobs, newest first.",
    alternates: { canonical: "https://growentix.cloud/korea-japan" },
    openGraph: {
      title: "Korea & Japan | Growentix",
      description: "Korea and Japan work opportunities — EPS, SSW and other overseas jobs, newest first.",
      url: "https://growentix.cloud/korea-japan",
    },
    ...(Number.isFinite(page) && page > 1 ? { robots: { index: false, follow: true } } : {}),
  };
}

export default function Page({ searchParams }: { searchParams: SearchParams }) {
  return <CategoryListing slug="korea-japan" label="Korea & Japan" subtitle="Korea and Japan work opportunities — EPS, SSW and other overseas jobs, newest first." searchParams={searchParams} />;
}
