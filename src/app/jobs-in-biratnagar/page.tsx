import type { Metadata } from "next";
import CityJobHub from "@/components/cities/CityJobHub";
import { cityPageFor } from "@/data/cityPages";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Government Jobs in Biratnagar",
  description:
    "Open government job notices in Biratnagar, Koshi Province — with deadlines, seats and official notice links.",
  alternates: { canonical: "https://growentix.cloud/jobs-in-biratnagar" },
};

export default function Page() {
  const city = cityPageFor("biratnagar")!;
  return <CityJobHub city={city} />;
}
