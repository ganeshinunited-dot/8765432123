import type { Metadata } from "next";
import Link from "next/link";
import { StaticPage, Section } from "@/components/layout/StaticPage";
export const revalidate = 300;

export const metadata: Metadata = {
  title: "About Growentix",
  description: "Growentix publishes daily job news and vacancy notices from Nepal and around the world.",
};

export default function AboutPage() {
  return (
    <StaticPage
      title="About Growentix"
      subtitle="Daily job news and vacancy notices — from Nepal and around the world."
    >
      <Section title="What we do">
        <p>
          Growentix tracks job opportunities so you never miss one: government vacancy notices from Nepal,
          work-abroad recruitments, Gulf and Korea &amp; Japan pipelines, remote roles, and daily job news
          from every region — with the source linked.
        </p>
      </Section>

      <Section title="What we are not">
        <p>
          We are a news and information site, not a recruiter or an employer. We do not guarantee employment,
          and we never ask readers for money. Always verify details and apply through the official notice
          or organisation linked in each article.
        </p>
      </Section>

      <Section title="How our articles are written">
        <p>
          Our articles start from real, linked news sources and official notices. Drafts are prepared with
          AI assistance under strict editorial rules — no invented facts, no invented numbers, every claim
          traced to a source — and each piece must add something useful beyond the headline: deadline
          context, eligibility and document checklists, or what the story means for applicants from Nepal.
          Found an error? Tell us through the <Link href="/support" className="font-semibold text-emerald-700 hover:underline">Support page</Link> and we will correct it.
        </p>
      </Section>

      <Section title="Contact">
        <p>
          Questions or corrections? Reach us through the <Link href="/support" className="font-semibold text-emerald-700 hover:underline">Support page</Link>.
        </p>
      </Section>
    </StaticPage>
  );
}
