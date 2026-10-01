import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/admin";
import { DashboardShell } from "@/components/dashboard/Shell";
import { Card, EmptyState } from "@/components/ui/primitives";
import { ADMIN_NAV } from "../home/page";
import VerificationActions from "./VerificationActions";

export const dynamic = "force-dynamic";

export default async function VerificationsPage() {
  await requireAdmin();
  const verifications = await db.companyVerification.findMany({
    where: { status: "PENDING" },
    orderBy: { createdAt: "asc" },
    include: { company: { select: { name: true, industry: true } } },
  });

  return (
    <DashboardShell title="Company verifications" nav={ADMIN_NAV} active="/admin/verifications">
      {verifications.length === 0 ? (
        <EmptyState title="No pending verifications." description="New employer verification requests will appear here." />
      ) : (
        <div className="space-y-3">
          {verifications.map((v) => {
            const info = v.businessInfo as Record<string, string>;
            return (
              <Card key={v.id} className="p-5">
                <p className="font-semibold text-slate-900">{v.company.name}</p>
                <p className="text-sm text-slate-500">{v.company.industry || "Industry not set"}</p>
                <dl className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
                  <div><dt className="text-slate-500">Contact person</dt><dd className="font-medium">{info.contactPerson}</dd></div>
                  <div><dt className="text-slate-500">Phone</dt><dd className="font-medium">{info.phone}</dd></div>
                  <div><dt className="text-slate-500">Address</dt><dd className="font-medium">{info.address}</dd></div>
                  <div><dt className="text-slate-500">Registration no.</dt><dd className="font-medium">{info.registrationNo || "—"}</dd></div>
                </dl>
                {v.documentIds.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {v.documentIds.map((docId) => (
                      <a key={docId} href={`/api/files/${docId}`} target="_blank" rel="noopener" className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                        View document
                      </a>
                    ))}
                  </div>
                )}
                <div className="mt-4">
                  <VerificationActions id={v.id} />
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </DashboardShell>
  );
}
