import type { Metadata } from "next";
import Link from "next/link";
import { StaticPage, Section, Bullets } from "@/components/layout/StaticPage";
export const revalidate = 300;

export const metadata: Metadata = {
  title: "Verification Policy",
  description: "The nine checks Growentix runs on every vacancy before publication — original employer, official notice, eligibility, deadline, salary, application link, visa and sponsorship claims, and a recorded source and verification date.",
  alternates: { canonical: "https://growentix.cloud/verification-policy" },
};

export default function VerificationPolicyPage() {
  return (
    <StaticPage
      title="Verification Policy"
      subtitle="Every vacancy on Growentix must pass these checks before it is published. Only confirmed opportunities earn the Verified label."
      updated="November 18, 2026"
    >
      <Section title="1. The nine checks">
        <p>
          Before any vacancy is published, our editors must verify each of the following against the original
          source. If a check cannot be completed, the article either says so plainly or is not published.
        </p>
        <Bullets
          items={[
            <><strong>1. Original employer:</strong> identify the employer or recruiting organisation behind the vacancy.</>,
            <><strong>2. Official notice:</strong> find the official recruitment notice or announcement — not a copy on another site.</>,
            <><strong>3. Job title and location:</strong> confirm the exact title and where the job is based.</>,
            <><strong>4. Eligibility:</strong> verify who can apply — qualifications, experience, age limits and any other requirements.</>,
            <><strong>5. Deadline:</strong> verify the application deadline and time zone where the notice states one.</>,
            <><strong>6. Salary:</strong> confirm the salary or pay details — only when the notice publishes them; never invent a figure.</>,
            <><strong>7. Application link:</strong> confirm the official application link and that it leads to the employer or its official portal.</>,
            <><strong>8. Visa and sponsorship:</strong> where a vacancy mentions a visa or sponsorship, check the claim against the official notice or the employer&apos;s own guidance.</>,
            <><strong>9. Source and verification date:</strong> record the source and the date it was verified, and link the source in the article.</>,
          ]}
        />
      </Section>

      <Section title="2. The Verified label">
        <p>
          Only a vacancy that passes all nine checks may carry the Verified label. The label means the
          opportunity was confirmed against its official source on the verification date shown in the article.
          A vacancy that is still being checked, or whose details could not be confirmed, is never labelled
          Verified.
        </p>
      </Section>

      <Section title="3. What we do not verify">
        <p>
          We verify the vacancy as published — we do not guarantee that an applicant will be hired, that a
          visa will be granted, or that an employer will respond. Readers should always read the official
          notice themselves and apply through the official link in the article. We never ask readers for
          money, and a genuine employer never charges applicants to apply.
        </p>
      </Section>

      <Section title="4. Expired and changed vacancies">
        <p>
          Deadlines pass and notices change. We mark closed vacancies as closed, remove expired notices from
          the sitemap, and update articles when official details change. An expired vacancy is never presented
          as if it were still open.
        </p>
      </Section>

      <Section title="5. Report a problem">
        <p>
          If a vacancy on Growentix looks wrong — a broken link, a changed deadline, a suspicious employer —
          tell us through the{" "}
          <Link href="/contact" className="font-semibold text-emerald-700 hover:underline">Contact page</Link>
          {" "}and we will re-check it. Our editorial standards are set out in the{" "}
          <Link href="/editorial-policy" className="font-semibold text-emerald-700 hover:underline">Editorial Policy</Link>.
        </p>
      </Section>

      <Section title="6. For employers">
        <p>
          Companies can apply for a verified employer profile, free of charge. We check the business
          registration, website and contact details against official sources before granting the
          Verified badge, which is valid for 12 months and renewable. Only verified companies appear
          in the{" "}
          <Link href="/companies" className="font-semibold text-emerald-700 hover:underline">Companies directory</Link>
          . Apply at{" "}
          <Link href="/for-employers" className="font-semibold text-emerald-700 hover:underline">For Employers</Link>
          .
        </p>
      </Section>
    </StaticPage>
  );
}
