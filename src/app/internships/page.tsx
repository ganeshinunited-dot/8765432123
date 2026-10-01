import SeoLandingPage, { type SeoConfig } from "@/components/seo/SeoLandingPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Internships in Nepal for Students | Paid & Unpaid",
  description: "Get real experience while you study. Browse internships across Nepal — many are paid, and all of them build your CV.",
};

const config: SeoConfig = {
  title: "Internships in Nepal for Students | Paid & Unpaid",
  heading: "Internships for Students",
  intro: "Get real experience while you study. Browse internships across Nepal — many are paid, and all of them build your CV.",
  where: { jobType: "INTERNSHIP" },
  faq: [["Are internships on this platform paid?", "Many are. Each listing shows the pay clearly — filter by salary type to find paid internships."], ["How long do internships usually last?", "Most student internships run 1–6 months. Duration and expectations are listed in the job description."]],
};

export default function Page() {
  return <SeoLandingPage config={config} />;
}
