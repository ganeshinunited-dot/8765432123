import type { Metadata } from "next";
import CategoryListing from "@/components/articles/CategoryListing";

export const revalidate = 60;

type SearchParams = Promise<{ page?: string | string[] }>;

export async function generateMetadata({ searchParams }: { searchParams: SearchParams }): Promise<Metadata> {
  const params = await searchParams;
  const page = parseInt(Array.isArray(params.page) ? params.page[0] ?? "1" : params.page ?? "1", 10);
  return {
    title: "Pop Music | Growentix",
    description: "Pop music news — Taylor Swift, chart hits, award shows and the biggest pop moments, with the newest stories first.",
    alternates: { canonical: "https://growentix.cloud/popmusic" },
    openGraph: {
      title: "Pop Music | Growentix",
      description: "Pop music news — Taylor Swift, chart hits, award shows and the biggest pop moments, with the newest stories first.",
      url: "https://growentix.cloud/popmusic",
    },
    ...(Number.isFinite(page) && page > 1 ? { robots: { index: false, follow: true } } : {}),
  };
}

export default function Page({ searchParams }: { searchParams: SearchParams }) {
  return <CategoryListing slug="pop-music" label="Pop Music" subtitle="Pop music news — Taylor Swift, chart hits, award shows and the biggest pop moments, with the newest stories first." searchParams={searchParams} />;
}
