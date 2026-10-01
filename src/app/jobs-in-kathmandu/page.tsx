import SeoLandingPage, { type SeoConfig } from "@/components/seo/SeoLandingPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jobs in Kathmandu for Students | Part-Time Work",
  description: "The biggest student job market in Nepal. Find part-time work, internships, and weekend gigs across Kathmandu — Thamel, Baneshwor, Lalitpur, Bhaktapur ",
};

const config: SeoConfig = {
  title: "Jobs in Kathmandu for Students | Part-Time Work",
  heading: "Student Jobs in Kathmandu",
  intro: "The biggest student job market in Nepal. Find part-time work, internships, and weekend gigs across Kathmandu — Thamel, Baneshwor, Lalitpur, Bhaktapur and more.",
  where: { location: { name: { contains: "Kathmandu", mode: "insensitive" } } },
  faq: [["Which areas of Kathmandu have the most student jobs?", "Thamel, Durbarmarg, Baneshwor, and Lalitpur have the highest concentration of student-friendly employers — cafes, retail, and delivery hubs."]],
};

export default function Page() {
  return <SeoLandingPage config={config} />;
}
