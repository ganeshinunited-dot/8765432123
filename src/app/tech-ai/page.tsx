import type { Metadata } from "next";
import TechAiHub from "@/components/tech/TechAiHub";

export const metadata: Metadata = {
  title: "Tech & AI News | Growentix",
  description:
    "Tech and AI news — new models, launches, outages and the companies behind them, with the newest stories first.",
  alternates: { canonical: "https://growentix.cloud/tech-ai" },
  openGraph: {
    title: "Tech & AI News | Growentix",
    description:
      "Tech and AI news — new models, launches, outages and the companies behind them.",
    url: "https://growentix.cloud/tech-ai",
  },
};

export default function Page({ searchParams }: { searchParams: Promise<{ page?: string | string[] }> }) {
  return <TechAiHub searchParams={searchParams} />;
}
