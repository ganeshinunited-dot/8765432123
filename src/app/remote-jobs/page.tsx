import SeoLandingPage, { type SeoConfig } from "@/components/seo/SeoLandingPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Remote Jobs for Students in Nepal | Work From Home",
  description: "Work from your room, your hostel, or anywhere with internet. These remote and hybrid roles are perfect for students who want to earn without commuting",
};

const config: SeoConfig = {
  title: "Remote Jobs for Students in Nepal | Work From Home",
  heading: "Remote Jobs for Students",
  intro: "Work from your room, your hostel, or anywhere with internet. These remote and hybrid roles are perfect for students who want to earn without commuting.",
  where: { workArrangement: { in: ["REMOTE", "HYBRID"] } },
  faq: [["What do I need for a remote student job?", "A reliable internet connection and a laptop or smartphone. Most remote roles here involve customer chat support, data entry, social media, or tutoring."], ["How do remote employers pay students?", "Most pay monthly via bank transfer or digital wallets like eSewa and Khalti. Confirm payment terms before you start."]],
};

export default function Page() {
  return <SeoLandingPage config={config} />;
}
