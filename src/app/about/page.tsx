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

      <Section title="Accounts on Growentix">
        <p>
          Growentix is two things at once: a job news publication, and a place where job seekers and
          employers have accounts. Job seekers with an account can save jobs, apply with their CV and a cover
          message, and message employers about their application. Applying is always free for job seekers.
        </p>
        <p>
          Employers can apply for a free verified account. We check the business registration, website and
          contact details against official sources; verified companies get a public profile, a Verified badge
          valid for 12 months, and their vacancies listed. Employers post jobs from their account, and every
          post is reviewed by our team, usually within one working day. Employers fund the platform through
          posting plans.{" "}
          <Link href="/for-employers" className="font-semibold text-emerald-700 hover:underline">Apply for verification</Link>
          {" "}or{" "}
          <Link href="/login" className="font-semibold text-emerald-700 hover:underline">sign in</Link>
          {" "}to manage your company.
        </p>
      </Section>

      <Section title="What we are not">
        <p>
          We are a news and information platform, not a recruiter. We do not hire people on any
          employer&apos;s behalf, we do not guarantee employment, and we never ask readers for money. Job
          seekers always apply for free, and no one should ever pay an employer to apply for or receive a
          job. Always verify details and apply through the official notice or organisation linked in each
          article.
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
