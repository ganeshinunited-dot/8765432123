import type { Metadata } from "next";
import CityJobHub from "@/components/cities/CityJobHub";
import { cityPageFor } from "@/data/cityPages";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Government Jobs in Biratnagar | Growentix",
  description:
    "Open government job notices in Biratnagar, Koshi Province — with deadlines, seats and official notice links.",
};

export default function Page() {
  const city = cityPageFor("biratnagar")!;
  return <CityJobHub city={city} />;
}
