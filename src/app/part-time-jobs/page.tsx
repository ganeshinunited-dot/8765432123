import SeoLandingPage, { type SeoConfig } from "@/components/seo/SeoLandingPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Part-Time Jobs for Students in Nepal | Student Jobs Nepal",
  description: "Find flexible part-time jobs that fit around your classes. From weekend shifts to evening work, these employers are hiring students across Nepal right",
};

const config: SeoConfig = {
  title: "Part-Time Jobs for Students in Nepal | Student Jobs Nepal",
  heading: "Part-Time Jobs for Students in Nepal",
  intro: "Find flexible part-time jobs that fit around your classes. From weekend shifts to evening work, these employers are hiring students across Nepal right now.",
  where: { jobType: "PART_TIME" },
  faq: [["How many hours can a student work part-time in Nepal?", "Most student-friendly employers offer 15–25 hours per week with shifts scheduled around your classes. Always confirm the schedule before accepting."], ["Do I need experience for part-time jobs?", "Most listings on this platform welcome beginners. Employers hiring students expect to train you — attitude and reliability matter more than experience."]],
};

export default function Page() {
  return <SeoLandingPage config={config} />;
}
