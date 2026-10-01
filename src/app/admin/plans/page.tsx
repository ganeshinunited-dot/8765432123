import { db } from "@/lib/db";
import { requireAdmin, logAdminAction } from "@/lib/admin";
import { DashboardShell } from "@/components/dashboard/Shell";
import { Card } from "@/components/ui/primitives";
import { ADMIN_NAV } from "../home/page";
import PlanEditor from "./PlanEditor";

export const dynamic = "force-dynamic";

export default async function AdminPlans() {
  await requireAdmin();
  const plans = await db.subscriptionPlan.findMany({ orderBy: { priceMonthly: "asc" } });
  const subsByPlan = await db.subscription.groupBy({ by: ["planId"], where: { status: "ACTIVE" }, _count: true });
  const countByPlan = new Map(subsByPlan.map((s) => [s.planId, s._count]));

  return (
    <DashboardShell title="Subscription plans" nav={ADMIN_NAV} active="/admin/plans">
      <div className="space-y-4">
        {plans.map((p) => (
          <Card key={p.id} className="p-5">
            <PlanEditor
              plan={{
                id: p.id, name: p.name, slug: p.slug, description: p.description || "",
                priceMonthly: p.priceMonthly, jobPostLimit: p.jobPostLimit,
                featuredAllowed: p.featuredAllowed, candidateSearch: p.candidateSearch, active: p.active,
              }}
              activeSubs={countByPlan.get(p.id) || 0}
            />
          </Card>
        ))}
      </div>
      <p className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
        Plans are editable and take effect for new purchases immediately. Students always use the platform for free — plans apply to employers only.
      </p>
    </DashboardShell>
  );
}

export async function logPlanChange(adminId: string, planName: string) {
  await logAdminAction(adminId, "PLAN_UPDATED", "SubscriptionPlan", planName);
}
