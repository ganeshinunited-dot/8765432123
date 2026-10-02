import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/admin";
import { DashboardShell } from "@/components/dashboard/Shell";
import { Card, EmptyState } from "@/components/ui/primitives";
import { ADMIN_NAV } from "../home/page";

export const dynamic = "force-dynamic";

export default async function AuditLog() {
  await requireAdmin();
  const actions = await db.adminAction.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
    include: { admin: { select: { name: true, email: true } } },
  });

  return (
    <DashboardShell title="Audit log" nav={ADMIN_NAV} active="/admin/audit">
      {actions.length === 0 ? (
        <EmptyState title="No admin actions recorded yet." />
      ) : (
        <Card className="divide-y divide-slate-100">
          {actions.map((a) => (
            <div key={a.id} className="flex flex-wrap items-center justify-between gap-2 px-5 py-3">
              <div className="min-w-0 text-sm">
                <p><span className="font-semibold text-slate-900">{a.admin.name}</span>{" "}
                  <span className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs">{a.action}</span></p>
                <p className="text-xs text-slate-500">
                  {a.targetType && <>{a.targetType} <span className="font-mono">{a.targetId?.slice(0, 8)}</span> · </>}
                  {a.reason}
                </p>
              </div>
              <p className="text-xs text-slate-400">{a.createdAt.toLocaleString("en-GB")}</p>
            </div>
          ))}
        </Card>
      )}
    </DashboardShell>
  );
}
