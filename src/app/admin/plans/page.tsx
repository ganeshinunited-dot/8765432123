import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/admin";
import { AdminShell } from "@/components/admin/AdminShell";
import { Card } from "@/components/ui/primitives";
import { ADMIN_NAV } from "../home/page";

export const dynamic = "force-dynamic";

export default async function AdminPlans() {
  await requireAdmin();
  const plans = await db.subscriptionPlan.findMany({ orderBy: { priceMonthly: "asc" } });
  const subsByPlan = await db.subscription.groupBy({ by: ["planId"], where: { status: "ACTIVE" }, _count: true });
  const countByPlan = new Map(subsByPlan.map((s) => [s.planId, s._count]));

  return (
    <AdminShell title="Subscription plans" nav={ADMIN_NAV} active="/admin/plans">
      <div className="space-y-4">
        {plans.map((p) => (
          <Card key={p.id} className="p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="font-bold text-slate-900">{p.name}</p>
                <p className="text-sm text-slate-500">{p.description}</p>
              </div>
              <p className="text-lg font-bold text-slate-900">Rs. {p.priceMonthly}<span className="text-sm font-normal text-slate-500">/mo</span></p>
            </div>
            <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-600">
              <span className="rounded bg-slate-100 px-2 py-1">{p.jobPostLimit} job posts</span>
              <span className="rounded bg-slate-100 px-2 py-1">{p.featuredAllowed ? "Featured allowed" : "No featured"}</span>
              <span className="rounded bg-slate-100 px-2 py-1">{p.candidateSearch ? "Candidate search" : "No candidate search"}</span>
              <span className="rounded bg-slate-100 px-2 py-1">{countByPlan.get(p.id) || 0} active subscribers</span>
              <span className={`rounded px-2 py-1 font-semibold ${p.active ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-500"}`}>{p.active ? "Active" : "Inactive"}</span>
            </div>
          </Card>
        ))}
      </div>
      <p className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
        Plans are read-only for admins. Students always use the platform for free — plans apply to employers only.
      </p>
    </AdminShell>
  );
}

