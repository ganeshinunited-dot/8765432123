import type { Metadata } from "next";
import CityJobHub from "@/components/cities/CityJobHub";
import { cityPageFor } from "@/data/cityPages";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Government Jobs in Janakpur",
  description:
    "Open government job notices in Janakpur, Madhesh Province — with deadlines, seats and official notice links.",
  alternates: { canonical: "https://growentix.cloud/jobs-in-janakpur" },
};

export default function Page() {
  const city = cityPageFor("janakpur")!;
  return <CityJobHub city={city} />;
}
