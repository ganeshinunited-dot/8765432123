import type { Metadata } from "next";
import TechAiHub from "@/components/tech/TechAiHub";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Tech & AI Job News | Growentix",
  description:
    "Tech and AI job news — hiring, skills and remote tech roles from around the world, with article images and the newest stories first.",
  alternates: { canonical: "https://growentix.cloud/tech-ai" },
  openGraph: {
    title: "Tech & AI Job News | Growentix",
    description:
      "Tech and AI job news — hiring, skills and remote tech roles from around the world.",
    url: "https://growentix.cloud/tech-ai",
  },
};

export default function Page() {
  return <TechAiHub />;
}
