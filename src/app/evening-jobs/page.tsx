import SeoLandingPage, { type SeoConfig } from "@/components/seo/SeoLandingPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Evening Jobs for Students in Nepal | After-College Work",
  description: "Classes during the day, earnings in the evening. These jobs run in evening shifts — ideal for college students in Kathmandu, Pokhara, and beyond.",
};

const config: SeoConfig = {
  title: "Evening Jobs for Students in Nepal | After-College Work",
  heading: "Evening Jobs for Students",
  intro: "Classes during the day, earnings in the evening. These jobs run in evening shifts — ideal for college students in Kathmandu, Pokhara, and beyond.",
  where: { schedules: { has: "EVENING" } },
  faq: [["What time are evening shifts usually?", "Most evening shifts run from around 5 PM to 9 PM, though it varies by employer. Check the job details before applying."]],
};

export default function Page() {
  return <SeoLandingPage config={config} />;
}
