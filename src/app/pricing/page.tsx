import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";
import { getVerifiedCompany } from "@/lib/pricing-gate";
import { StaticPage, Section } from "@/components/layout/StaticPage";
import { Card, Badge } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Plan pricing is shown to verified employers after signing in.",
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
  { name: "Free", priceMonthly: 0, jobPostLimit: 1, featuredAllowed: false, candidateSearch: false, description: "1 active job post." },
  { name: "Basic", priceMonthly: 999, jobPostLimit: 5, featuredAllowed: true, candidateSearch: false, description: "5 active jobs plus a featured slot." },
  { name: "Premium", priceMonthly: 2499, jobPostLimit: 20, featuredAllowed: true, candidateSearch: true, description: "20 active jobs, featured slots and candidate search." },
];

export default async function PricingPage() {
  const user = await getSessionUser();
  if (!user) redirect("/login?next=/pricing");
  // Pricing is visible only to verified employers (and staff admins).
  const canSee = user.isAdmin || (user.role === "EMPLOYER" && (await getVerifiedCompany(user.id)));
  if (!canSee) {
    return (
      <StaticPage title="Pricing" subtitle="Plan pricing is available to verified employers.">
        <Card className="p-6">
          <h2 className="text-base font-bold text-slate-900">Verify your company to see plans</h2>
          <p className="mt-2 text-sm text-slate-600">
            For everyone's privacy, our employer plans and prices are only shown to companies that have completed
            verification. Students always use Growentix free, forever.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Link href="/employer/company" className="inline-flex h-11 items-center rounded-lg gx-btn gx-btn-primary px-5 text-sm font-semibold text-white">
              Verify my company
            </Link>
            <Link href="/support" className="inline-flex h-11 items-center rounded-lg border border-slate-300 px-5 text-sm font-semibold text-slate-700 hover:bg-slate-50">
              Talk to support
            </Link>
          </div>
        </Card>
      </StaticPage>
    );
  }

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
              href="/employer/billing"
              className="mt-6 inline-flex h-11 items-center justify-center rounded-lg gx-btn gx-btn-primary px-5 text-sm font-semibold text-white"
            >
              Manage billing
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
