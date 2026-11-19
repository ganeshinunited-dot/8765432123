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
    title: "Gulf Jobs",
    description: "Gulf job news — UAE, Saudi Arabia, Qatar, Kuwait and Oman vacancies, salaries and visa rules. Newest Gulf jobs first, with deadlines.",
    alternates: { canonical: "https://growentix.cloud/gulf" },
    openGraph: {
      title: "Gulf Jobs | Growentix",
      description: "Gulf job news — UAE, Saudi Arabia, Qatar, Kuwait and Oman vacancies, salaries and visa rules. Newest Gulf jobs first, with deadlines.",
      url: "https://growentix.cloud/gulf",
    },
    ...(Number.isFinite(page) && page > 1 ? { robots: { index: false, follow: true } } : {}),
  };
}

export default function Page({ searchParams }: { searchParams: SearchParams }) {
  return <CategoryListing slug="gulf" label="Gulf Jobs" subtitle="Gulf job news — UAE, Saudi Arabia, Qatar, Kuwait and Oman vacancies, newest first." searchParams={searchParams} intro={<CountryIntro guide={COUNTRY_GUIDES.gulf} />} />;
}
