import type { Metadata } from "next";
import CityJobHub from "@/components/cities/CityJobHub";
import { cityPageFor } from "@/data/cityPages";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Government Jobs in Kathmandu Valley",
  description:
    "Open government job notices in Kathmandu Valley — Kathmandu, Lalitpur and Bhaktapur — with deadlines, seats and official notice links.",
  alternates: { canonical: "https://growentix.cloud/jobs-in-kathmandu" },
};

export default function Page() {
  const city = cityPageFor("kathmandu")!;
  return <CityJobHub city={city} />;
}
