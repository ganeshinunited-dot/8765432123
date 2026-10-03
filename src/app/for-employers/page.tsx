import type { Metadata } from "next";
import Link from "next/link";
import { StaticPage, Section, Bullets } from "@/components/layout/StaticPage";
export const revalidate = 300;

export const metadata: Metadata = {
  title: "I Want Talent — Hire Students",
  description: "Post jobs and hire talented students across Nepal with Growentix.",
};

const STEPS = [
  { title: "Create your company profile", text: "Tell students about your business, add your logo and locations." },
  { title: "Get verified", text: "Submit your business documents once. Verified companies earn a trust badge on every job post." },
  { title: "Post a job in minutes", text: "Our guided wizard captures role, schedule, pay, and skills — built around student availability." },
  { title: "Hire with confidence", text: "Review applications, open CVs, shortlist, message candidates, and schedule interviews in one dashboard." },
];

export default function ForEmployersPage() {
  return (
    <StaticPage
      title="I want talent? Hire motivated students"
      subtitle="Growentix connects you with talented students across Nepal who are looking for part-time, evening, weekend, remote, and internship work."
    >
      <div className="flex flex-wrap gap-3">
        <Link href="/signup" className="inline-flex h-12 items-center rounded-lg bg-emerald-700 px-6 text-sm font-semibold text-white hover:bg-emerald-800">
          Post a Job
        </Link>
      </div>

      <Section title="Why hire on Growentix">
        <Bullets
          items={[
            <><strong>Talent-first audience:</strong> every candidate is actively looking for work that fits a study schedule — fewer mismatches, faster hiring.</>,
            <><strong>Verified trust:</strong> complete one verification and your badge appears across the platform, increasing applications from quality candidates.</>,
            <><strong>Everything in one place:</strong> postings, applications, CVs, messaging, and interviews — no spreadsheets or lost emails.</>,
            <><strong>Fair pricing:</strong> start free; plan options are shown to verified employers after they sign in.</>,
          ]}
        />
      </Section>

      <Section title="How it works">
        <div className="grid gap-4 sm:grid-cols-2">
          {STEPS.map((s, i) => (
            <div key={s.title} className="rounded-xl border border-slate-200 bg-white p-5">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-700 text-xs font-bold text-white">{i + 1}</span>
              <h3 className="mt-3 font-semibold text-slate-900">{s.title}</h3>
              <p className="mt-1 text-sm text-slate-600">{s.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Our commitment to fairness">
        <p>
          Growentix is free for talent, always. Employers agree never to charge applicants fees and to describe
          vacancies honestly. Read the{" "}
          <Link href="/employer-guidelines" className="font-semibold text-emerald-700 hover:underline">employer guidelines</Link>{" "}
          before posting — posts are moderated, and quality listings get more applications.
        </p>
      </Section>
    </StaticPage>
  );
}
