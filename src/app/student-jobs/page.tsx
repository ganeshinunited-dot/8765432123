import SeoLandingPage, { type SeoConfig } from "@/components/seo/SeoLandingPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jobs for Students in Nepal | Part-Time, Internships & More",
  description: "The job board built for students. Browse part-time work, internships, and flexible gigs from verified employers across Nepal — all free for students, ",
};

const config: SeoConfig = {
  title: "Jobs for Students in Nepal | Part-Time, Internships & More",
  heading: "Jobs for Students in Nepal",
  intro: "The job board built for students. Browse part-time work, internships, and flexible gigs from verified employers across Nepal — all free for students, forever.",
  where: {},
  faq: [["Is this platform free for students?", "Yes. Students never pay to browse, apply, or message employers. If anyone asks you for money to get a job, report them immediately."], ["How do I apply?", "Create a free profile, complete it to at least 60%, then hit Apply on any job. You can track every application from your dashboard."]],
};

export default function Page() {
  return <SeoLandingPage config={config} />;
}
