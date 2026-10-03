import Link from "next/link";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { getVerifiedCompany } from "@/lib/pricing-gate";
import { DashboardShell } from "@/components/dashboard/Shell";
import { Card, Badge, EmptyState } from "@/components/ui/primitives";
import { EMPLOYER_NAV } from "../home/page";
import BillingClient from "./BillingClient";

export const dynamic = "force-dynamic";

export default async function BillingPage() {
  const user = await requireUser(["EMPLOYER"]);
  const company = await db.company.findFirst({ where: { ownerId: user.id } });
  if (!company) {
    return (
      <DashboardShell title="Billing" nav={EMPLOYER_NAV} active="/employer/billing">
        <EmptyState title="Create your company profile first." />
      </DashboardShell>
    );
  }

  const verified = await getVerifiedCompany(user.id);
  if (!verified) {
    return (
      <DashboardShell title="Billing" nav={EMPLOYER_NAV} active="/employer/billing">
        <Card className="p-6">
          <h2 className="text-base font-bold text-slate-900">Verify your company to see plans</h2>
          <p className="mt-2 text-sm text-slate-600">
            Plan pricing is only shown to verified employers. Complete verification to unlock billing and upgrades.
          </p>
          <Link href="/employer/company" className="mt-5 inline-flex h-11 items-center rounded-lg gx-btn gx-btn-primary px-5 text-sm font-semibold text-white">
            Verify my company
          </Link>
        </Card>
      </DashboardShell>
    );
  }

  const [plans, subscription, payments, activeJobs] = await Promise.all([
    db.subscriptionPlan.findMany({ where: { active: true }, orderBy: { priceMonthly: "asc" } }),
    db.subscription.findFirst({
      where: { companyId: company.id, status: "ACTIVE" },
      orderBy: { startedAt: "desc" },
      include: { plan: true },
    }),
    db.payment.findMany({ where: { companyId: company.id }, orderBy: { createdAt: "desc" }, take: 20 }),
    db.job.count({ where: { companyId: company.id, status: { in: ["ACTIVE", "PENDING_REVIEW"] } } }),
  ]);

  const driver = process.env.PAYMENT_DRIVER || "mock";

  return (
    <DashboardShell title="Billing" nav={EMPLOYER_NAV} active="/employer/billing">
      <Card className="mb-6 p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm text-slate-500">Current plan</p>
            <p className="text-lg font-bold text-slate-900">{subscription?.plan.name || "Free"}</p>
            <p className="text-sm text-slate-500">
              {activeJobs} active job{activeJobs === 1 ? "" : "s"} · limit {subscription?.plan.jobPostLimit ?? 1}
              {subscription?.endsAt && <> · renews {subscription.endsAt.toLocaleDateString("en-GB")}</>}
            </p>
          </div>
          <Badge tone="green">Students use the platform free</Badge>
        </div>
      </Card>

      <h2 className="mb-3 text-lg font-bold text-slate-900">Plans</h2>
      <BillingClient
        plans={plans.map((p) => ({
          slug: p.slug, name: p.name, description: p.description || "",
          priceMonthly: p.priceMonthly, jobPostLimit: p.jobPostLimit,
          featuredAllowed: p.featuredAllowed, candidateSearch: p.candidateSearch,
        }))}
        currentSlug={subscription?.plan.slug || "free"}
        driver={driver}
      />

      {payments.length > 0 && (
        <>
          <h2 className="mb-3 mt-8 text-lg font-bold text-slate-900">Payment history</h2>
          <Card className="divide-y divide-slate-100">
            {payments.map((p) => (
              <div key={p.id} className="flex items-center justify-between px-5 py-3 text-sm">
                <div>
                  <p className="font-semibold text-slate-900">NPR {p.amount.toLocaleString()} · {p.provider}</p>
                  <p className="text-xs text-slate-500">{p.createdAt.toLocaleDateString("en-GB")}</p>
                </div>
                <Badge tone={p.state === "SUCCESSFUL" ? "green" : p.state === "PENDING" ? "amber" : "rose"}>{p.state}</Badge>
              </div>
            ))}
          </Card>
        </>
      )}
    </DashboardShell>
  );
}
