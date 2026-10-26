import type { Metadata } from "next";
import CityJobHub from "@/components/cities/CityJobHub";
import { cityPageFor } from "@/data/cityPages";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Government Jobs in Nepalgunj | Growentix",
  description:
    "Open government job notices in Nepalgunj, Lumbini Province — with deadlines, seats and official notice links.",
};

export default function Page() {
  const city = cityPageFor("nepalgunj")!;
  return <CityJobHub city={city} />;
}
