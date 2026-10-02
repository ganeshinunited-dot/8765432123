import type { Metadata } from "next";
import Link from "next/link";
import { StaticPage, Section } from "@/components/layout/StaticPage";
export const revalidate = 300;

export const metadata: Metadata = {
  title: "Resources for Students",
  description: "Guides, popular job categories, and safety resources for student job seekers in Nepal.",
};

const CATEGORIES = [
  { href: "/part-time-jobs", title: "Part-Time Jobs", text: "Flexible roles that fit around your classes." },
  { href: "/internships", title: "Internships", text: "Build experience while you study." },
  { href: "/remote-jobs", title: "Remote Jobs", text: "Work from home or your hostel." },
  { href: "/evening-jobs", title: "Evening Jobs", text: "Shifts after college hours." },
  { href: "/weekend-jobs", title: "Weekend Jobs", text: "Earn on Saturdays and Sundays." },
  { href: "/jobs-in-kathmandu", title: "Jobs in Kathmandu", text: "Opportunities across the valley." },
  { href: "/student-jobs", title: "Student Jobs", text: "All student-friendly openings in one place." },
  { href: "/companies", title: "Companies", text: "Browse verified employers hiring students." },
];

const GUIDES = [
  {
    href: "/safety",
    title: "Stay safe while job hunting",
    text: "Never pay to apply, spot fake postings, and interview safely — our complete safety guide.",
  },
  {
    href: "/faq",
    title: "Frequently asked questions",
    text: "How applying works, who sees your CV, matching scores, and account help.",
  },
  {
    href: "/profile",
    title: "Build a profile that gets shortlisted",
    text: "Complete your skills, education, and availability to improve your match scores.",
  },
  {
    href: "/employer-guidelines",
    title: "What good employers promise",
    text: "The rules every employer on Growentix must follow — know your rights as an applicant.",
  },
];

export default function ResourcesPage() {
  return (
    <StaticPage title="Resources" subtitle="Popular job categories and guides to help you find — and land — the right student job.">
      <Section title="Browse by category">
        <div className="grid gap-3 sm:grid-cols-2">
          {CATEGORIES.map((c) => (
            <Link key={c.href} href={c.href} className="rounded-xl border border-slate-200 bg-white p-5 transition-colors hover:border-emerald-400">
              <h3 className="font-semibold text-slate-900">{c.title}</h3>
              <p className="mt-1 text-sm text-slate-600">{c.text}</p>
            </Link>
          ))}
        </div>
      </Section>

      <Section title="Guides">
        <div className="grid gap-3 sm:grid-cols-2">
          {GUIDES.map((g) => (
            <Link key={g.href} href={g.href} className="rounded-xl border border-slate-200 bg-white p-5 transition-colors hover:border-emerald-400">
              <h3 className="font-semibold text-slate-900">{g.title}</h3>
              <p className="mt-1 text-sm text-slate-600">{g.text}</p>
            </Link>
          ))}
        </div>
      </Section>
    </StaticPage>
  );
}
