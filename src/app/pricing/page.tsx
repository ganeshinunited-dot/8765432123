import type { Metadata } from "next";
import Link from "next/link";
import { db } from "@/lib/db";
import { StaticPage, Section } from "@/components/layout/StaticPage";
import { Card, Badge } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Growentix employer plans. Students always free.",
};

export const dynamic = "force-dynamic";

interface PlanView {
  name: string;
  priceMonthly: number;
  jobPostLimit: number;
  featuredAllowed: boolean;
  candidateSearch: boolean;
  description: string | null;
}

const FALLBACK_PLANS: PlanView[] = [
  { name: "Free", priceMonthly: 0, jobPostLimit: 1, featuredAllowed: false, candidateSearch: false, description: "1 active job post. Good for trying out." },
  { name: "Basic", priceMonthly: 999, jobPostLimit: 5, featuredAllowed: true, candidateSearch: false, description: "5 active jobs + featured slot." },
  { name: "Premium", priceMonthly: 2499, jobPostLimit: 20, featuredAllowed: true, candidateSearch: true, description: "20 active jobs + featured slots + candidate search + priority support." },
];

export default async function PricingPage() {
  let plans: PlanView[] = FALLBACK_PLANS;
  try {
    const dbPlans = await db.subscriptionPlan.findMany({ where: { active: true }, orderBy: { priceMonthly: "asc" } });
    if (dbPlans.length > 0) plans = dbPlans;
  } catch {
    // fall back to the standard tiers when the database is unavailable
  }

  return (
    <StaticPage title="Pricing" subtitle="Students use Growentix free, forever. Employers choose a plan based on how many jobs they post.">
      <div className="grid gap-4 sm:grid-cols-3">
        {plans.map((p) => (
          <Card key={p.name} className="flex flex-col p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900">{p.name}</h2>
              {p.priceMonthly > 0 && <Badge tone="green">Popular</Badge>}
            </div>
            <p className="mt-3 text-3xl font-bold text-slate-900">
              {p.priceMonthly === 0 ? "Free" : `NPR ${p.priceMonthly.toLocaleString()}`}
              {p.priceMonthly > 0 && <span className="text-sm font-medium text-slate-500"> /month</span>}
            </p>
            <p className="mt-2 text-sm text-slate-600">{p.description}</p>
            <ul className="mt-4 flex-1 space-y-2 text-sm text-slate-700">
              <li>✓ {p.jobPostLimit} active job post{p.jobPostLimit === 1 ? "" : "s"}</li>
              <li>{p.featuredAllowed ? "✓" : "—"} Featured job placement</li>
              <li>{p.candidateSearch ? "✓" : "—"} Candidate search</li>
              <li>✓ Applicant management &amp; messaging</li>
              <li>✓ Interview scheduling</li>
            </ul>
            <Link
              href="/signup"
              className="mt-6 inline-flex h-11 items-center justify-center rounded-lg bg-emerald-700 px-5 text-sm font-semibold text-white hover:bg-emerald-800"
            >
              Get started
            </Link>
          </Card>
        ))}
      </div>

      <Section title="Good to know">
        <p>
          All plans include employer verification, job moderation, applicant tracking, and messaging. Paid plans are
          billed monthly in NPR via eSewa or Khalti where available. You can upgrade, downgrade, or cancel from your
          billing page at any time. Students are never charged — see our{" "}
          <Link href="/faq" className="font-semibold text-emerald-700 hover:underline">FAQ</Link> and{" "}
          <Link href="/employer-guidelines" className="font-semibold text-emerald-700 hover:underline">employer guidelines</Link>.
        </p>
      </Section>
    </StaticPage>
  );
}
