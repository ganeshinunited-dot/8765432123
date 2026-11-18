import type { Metadata } from "next";
import Link from "next/link";
import { StaticPage, Section } from "@/components/layout/StaticPage";
export const revalidate = 300;

export const metadata: Metadata = {
  title: "About",
  description: "Growentix is a global job news platform — international recruitment, remote jobs, government and private sector vacancies, and career news, verified against official sources.",
  alternates: { canonical: "https://growentix.cloud/about" },
};

export default function AboutPage() {
  return (
    <StaticPage
      title="About Growentix"
      subtitle="Global jobs. Trusted opportunities."
    >
      <Section title="What we do">
        <p>
          Growentix is a global job news and employment information platform. We track job opportunities
          worldwide so you never miss one: international recruitment updates, government and private sector
          vacancies, remote jobs, and career news from the United States, United Kingdom, Canada, Australia,
          Germany, Europe, Asia, the Gulf, Korea &amp; Japan and beyond — with the official source linked in
          every article.
        </p>
      </Section>

      <Section title="Who we serve">
        <p>
          Job seekers everywhere — from first-time applicants to experienced professionals looking for their
          next role, a move abroad, or a remote job. Our priority markets are the United States, United
          Kingdom, Canada, Australia and Germany, and we expand into new countries as reliable sources and
          reader demand grow. We are not a Nepal-only job site, and we do not limit our coverage to any one
          country.
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
          traced to a source — and every piece is checked by a human editor before it is published. Each
          article must add something useful beyond the headline: deadline context, eligibility and document
          checklists, or what the story means for applicants. Read our{" "}
          <Link href="/editorial-policy" className="font-semibold text-emerald-700 hover:underline">Editorial Policy</Link>
          {" "}and{" "}
          <Link href="/verification-policy" className="font-semibold text-emerald-700 hover:underline">Verification Policy</Link>
          {" "}to see the standards every vacancy must pass. Found an error? Tell us through the{" "}
          <Link href="/contact" className="font-semibold text-emerald-700 hover:underline">Contact page</Link>
          {" "}and we will correct it.
        </p>
      </Section>

      <Section title="Contact">
        <p>
          Questions or corrections? Reach us through the{" "}
          <Link href="/contact" className="font-semibold text-emerald-700 hover:underline">Contact page</Link>
          {" "}or the{" "}
          <Link href="/support" className="font-semibold text-emerald-700 hover:underline">Support page</Link>.
        </p>
      </Section>
    </StaticPage>
  );
}
