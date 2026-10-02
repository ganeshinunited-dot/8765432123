import SeoLandingPage, { type SeoConfig } from "@/components/seo/SeoLandingPage";
import { Metadata } from "next";
export const revalidate = 300;

export const metadata: Metadata = {
  title: "Weekend Jobs for Students in Nepal | Saturday Work",
  description: "Keep your weekdays for study and earn on weekends. Cafes, events, retail stores, and delivery services hire students for Saturday and weekend shifts.",
};

const config: SeoConfig = {
  title: "Weekend Jobs for Students in Nepal | Saturday Work",
  heading: "Weekend Jobs for Students",
  intro: "Keep your weekdays for study and earn on weekends. Cafes, events, retail stores, and delivery services hire students for Saturday and weekend shifts.",
  where: { schedules: { has: "WEEKEND" } },
  faq: [["Are weekend jobs full-day shifts?", "Many are, but plenty of employers offer half-day weekend shifts too. The schedule is listed on every job post."]],
};

export default function Page() {
  return <SeoLandingPage config={config} />;
}
