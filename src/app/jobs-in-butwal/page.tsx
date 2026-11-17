import type { Metadata } from "next";
import CityJobHub from "@/components/cities/CityJobHub";
import { cityPageFor } from "@/data/cityPages";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Government Jobs in Butwal",
  description:
    "Open government job notices in Butwal, Lumbini Province — with deadlines, seats and official notice links.",
  alternates: { canonical: "https://growentix.cloud/jobs-in-butwal" },
};

export default function Page() {
  const city = cityPageFor("butwal")!;
  return <CityJobHub city={city} />;
}
