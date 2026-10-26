import type { Metadata } from "next";
import CityJobHub from "@/components/cities/CityJobHub";
import { cityPageFor } from "@/data/cityPages";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Government Jobs in Birgunj | Growentix",
  description:
    "Open government job notices in Birgunj, Madhesh Province — with deadlines, seats and official notice links.",
};

export default function Page() {
  const city = cityPageFor("birgunj")!;
  return <CityJobHub city={city} />;
}
