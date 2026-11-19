import type { Metadata } from "next";
import CategoryListing from "@/components/articles/CategoryListing";
import { CountryIntro } from "@/components/articles/CountryIntro";
import { COUNTRY_GUIDES } from "@/lib/countryGuides";

export const revalidate = 60;

type SearchParams = Promise<{ page?: string | string[] }>;

export async function generateMetadata({ searchParams }: { searchParams: SearchParams }): Promise<Metadata> {
  const params = await searchParams;
  const page = parseInt(Array.isArray(params.page) ? params.page[0] ?? "1" : params.page ?? "1", 10);
  return {
    title: "Europe Jobs",
    description: "Europe job news — EU work visas, skilled roles and government vacancies across the continent. Newest Europe jobs first, with deadlines.",
    alternates: { canonical: "https://growentix.cloud/europe" },
    openGraph: {
      title: "Europe Jobs | Growentix",
      description: "Europe job news — EU work visas, skilled roles and government vacancies across the continent. Newest Europe jobs first, with deadlines.",
      url: "https://growentix.cloud/europe",
    },
    ...(Number.isFinite(page) && page > 1 ? { robots: { index: false, follow: true } } : {}),
  };
}

export default function Page({ searchParams }: { searchParams: SearchParams }) {
  return <CategoryListing slug="europe" label="Europe Jobs" subtitle="Europe job news and work opportunities, newest first." searchParams={searchParams} intro={<CountryIntro guide={COUNTRY_GUIDES.europe} />} />;
}
