import type { Metadata } from "next";
import Link from "next/link";
import { StaticPage, Section, Bullets } from "@/components/layout/StaticPage";

export const metadata: Metadata = {
  title: "About Growentix",
  description: "Growentix connects students across Nepal with flexible part-time work that fits around their studies.",
};

export default function AboutPage() {
  return (
    <StaticPage
      title="About Growentix"
      subtitle="Nepal's student-first job marketplace — flexible work that fits around your studies."
    >
      <Section title="Our mission">
        <p>
          Many students in Nepal want to earn while they study, but most job boards are built for full-time
          professionals. Growentix exists to fix that: we connect students with verified employers offering
          part-time, evening, weekend, remote, and internship opportunities that respect class schedules.
        </p>
      </Section>

      <Section title="How Growentix works">
        <Bullets
          items={[
            <><strong>For students (always free):</strong> create a profile, add your skills and availability, search and filter jobs by schedule and location, apply in minutes, and track every application.</>,
            <><strong>For employers:</strong> create a company profile, complete verification, post jobs through a guided wizard, and manage applicants from shortlist to interview in one place.</>,
            <><strong>Safety first:</strong> employers are verified, job postings are moderated, and anyone can report a suspicious listing. We display one rule everywhere: never pay an employer to apply for or receive a job.</>,
          ]}
        />
      </Section>

      <Section title="What we stand for">
        <Bullets
          items={[
            "Students never pay to use Growentix — employers fund the platform through subscription plans.",
            "Real jobs only: postings are reviewed by our moderation team before and after they go live.",
            "Privacy by design: your CV is shared only with employers you choose to apply to.",
            "Built for Nepal: local locations, NPR salaries, and schedules that match student life.",
          ]}
        />
      </Section>

      <Section title="Get started">
        <p>
          Students can <Link href="/signup" className="font-semibold text-emerald-700 hover:underline">create a free profile</Link> in
          minutes. Employers can <Link href="/for-employers" className="font-semibold text-emerald-700 hover:underline">post their first job</Link> today.
          Questions? See our <Link href="/faq" className="font-semibold text-emerald-700 hover:underline">FAQ</Link> or
          read our <Link href="/safety" className="font-semibold text-emerald-700 hover:underline">safety guide</Link>.
        </p>
      </Section>
    </StaticPage>
  );
}
