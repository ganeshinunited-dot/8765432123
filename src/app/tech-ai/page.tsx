import type { Metadata } from "next";
import TechAiHub from "@/components/tech/TechAiHub";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ topic?: string | string[] }>;
}): Promise<Metadata> {
  const params = await searchParams;
  const topic = Array.isArray(params.topic) ? params.topic[0] ?? "" : params.topic ?? "";
  return {
    title: "Tech & AI News",
    description:
      "Tech and AI news — new models, launches, outages and the companies behind them, with the newest stories first.",
    alternates: { canonical: "https://growentix.cloud/tech-ai" },
    openGraph: {
      title: "Tech & AI News | Growentix",
      description:
        "Tech and AI news — new models, launches, outages and the companies behind them.",
      url: "https://growentix.cloud/tech-ai",
    },
    // Filtered (?topic=) views are noindex, follow — same rule as Explore.
    ...(topic ? { robots: { index: false, follow: true } } : {}),
  };
}

export default function Page({ searchParams }: { searchParams: Promise<{ page?: string | string[]; topic?: string | string[] }> }) {
  return <TechAiHub searchParams={searchParams} />;
}
