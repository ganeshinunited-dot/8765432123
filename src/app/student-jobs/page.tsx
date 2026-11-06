import SeoLandingPage, { type SeoConfig } from "@/components/seo/SeoLandingPage";
import { Metadata } from "next";
export const revalidate = 300;

export const metadata: Metadata = {
  title: "Jobs for Students in Nepal | Part-Time, Internships & More",
  description: "The job board built for students. Browse part-time work, internships, and flexible gigs from verified employers across Nepal — all free for students, ",
};

const config: SeoConfig = {
  title: "Jobs for Students in Nepal | Part-Time, Internships & More",
  heading: "Jobs for Students in Nepal",
  intro: "The job board built for students. Browse part-time work, internships, and flexible gigs from verified employers across Nepal — all free for students, forever.",
  where: {},
  faq: [["Is this platform free for students?", "Yes. Reading Growentix is free, and there are no accounts. If anyone asks you for money to get a job, report them immediately — never pay to apply."], ["How do I apply?", "Through the official link in the vacancy notice. Growentix does not take applications — read the official notice and apply only through the official channel it names."]],
};

export default function Page() {
  return <SeoLandingPage config={config} />;
}
