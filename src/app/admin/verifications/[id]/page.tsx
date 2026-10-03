import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/admin";
import { AdminShell } from "@/components/admin/AdminShell";
import { Card, Badge, Alert } from "@/components/ui/primitives";
import { ADMIN_NAV } from "../../home/page";
import { ReviewPanel } from "./ReviewPanel";
import { MANUAL_CHECKS } from "@/lib/verification";

export const dynamic = "force-dynamic";

interface FraudFlag { type?: string; message?: string; companyId?: string }

export default async function VerificationReviewPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const v = await db.companyVerification.findUnique({
    where: { id },
    include: {
      company: {
        include: {
          owner: { select: { name: true, email: true, emailVerified: true } },
          location: { select: { name: true } },
        },
      },
    },
  });
  if (!v) notFound();
  const info = (v.businessInfo as Record<string, string>) || {};
  const checks = (v.checks as { auto?: { key: string; label: string; passed: boolean; detail?: string }[]; fraud?: FraudFlag[] } | null) || {};
  const fraud = checks.fraud || [];

  const docs = v.documentIds.length
    ? await db.uploadedFile.findMany({ where: { id: { in: v.documentIds } }, select: { id: true, fileName: true, mimeType: true, createdAt: true } })
    : [];

  const dupCompanies = await Promise.all(
    fraud.filter((f) => f.companyId).map(async (f) => {
      const c = await db.company.findUnique({ where: { id: f.companyId! }, select: { name: true, verificationStatus: true, ownerId: true } });
      return { ...f, name: c?.name, status: c?.verificationStatus };
    })
  );

  const history = await db.companyVerification.findMany({
    where: { companyId: v.companyId, id: { not: v.id } },
    orderBy: { createdAt: "desc" },
    select: { id: true, status: true, notes: true, createdAt: true, reviewedAt: true },
    take: 10,
  });

  const tone: Record<string, "green" | "amber" | "rose" | "blue" | "slate"> = {
    PENDING: "amber", VERIFIED: "green", REJECTED: "rose", NEEDS_INFO: "blue",
  };

  return (
    <AdminShell title="Review verification" nav={ADMIN_NAV} active="/admin/verifications">
      <Link href="/admin/verifications" className="text-sm font-medium text-emerald-700 hover:underline">← Back to queue</Link>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="text-xl font-bold text-slate-900">{v.company.name}</h2>
          <p className="text-sm text-slate-500">Applied {new Date(v.createdAt).toLocaleString("en-GB")} · {v.company.industry || "Industry not set"}</p>
        </div>
        <Badge tone={tone[v.status] || "slate"}>{v.status.replace("_", " ")}</Badge>
      </div>

      {fraud.length > 0 && (
        <Alert tone="rose" >
          <span className="font-semibold">Fraud flags — investigate before approving:</span>
          {fraud.map((f, i) => <span key={i} className="block">{f.message}</span>)}
          {dupCompanies.map((d, i) => d.name && (
            <span key={i} className="block">Duplicate company: <strong>{d.name}</strong> (status: {d.status})</span>
          ))}
        </Alert>
      )}

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Card className="p-5">
          <h3 className="font-semibold text-slate-900">Business details</h3>
          <dl className="mt-3 space-y-2 text-sm">
            {[["Registration no.", info.registrationNo], ["Contact person", info.contactPerson], ["Phone", info.phone], ["Address", info.address]].map(([k, val]) => (
              <div key={k} className="flex justify-between gap-4"><dt className="text-slate-500">{k}</dt><dd className="text-right font-medium">{val || "—"}</dd></div>
            ))}
          </dl>
          <h3 className="mt-5 font-semibold text-slate-900">Company profile</h3>
          <dl className="mt-3 space-y-2 text-sm">
            <div className="flex justify-between gap-4"><dt className="text-slate-500">Description</dt><dd className="text-right font-medium">{v.company.description ? `${v.company.description.slice(0, 80)}…` : "—"}</dd></div>
            <div className="flex justify-between gap-4"><dt className="text-slate-500">Location</dt><dd className="text-right font-medium">{v.company.location?.name || "—"}</dd></div>
            <div className="flex justify-between gap-4"><dt className="text-slate-500">Website</dt><dd className="text-right font-medium">{v.company.website || "—"}</dd></div>
            <div className="flex justify-between gap-4"><dt className="text-slate-500">Logo</dt><dd className="text-right font-medium">{v.company.logoUrl ? "Uploaded" : "Missing"}</dd></div>
            <div className="flex justify-between gap-4"><dt className="text-slate-500">Owner</dt><dd className="text-right font-medium">{v.company.owner.name} ({v.company.owner.email})</dd></div>
            <div className="flex justify-between gap-4"><dt className="text-slate-500">Owner email</dt><dd className="text-right font-medium">{v.company.owner.emailVerified ? "Verified ✓" : "Not verified"}</dd></div>
          </dl>
        </Card>

        <Card className="p-5">
          <h3 className="font-semibold text-slate-900">Documents ({docs.length})</h3>
          {docs.length === 0 ? (
            <p className="mt-2 text-sm text-slate-500">No documents attached.</p>
          ) : (
            <ul className="mt-3 space-y-2">
              {docs.map((d) => (
                <li key={d.id} className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 px-3 py-2 text-sm">
                  <span className="min-w-0"><span className="block truncate font-medium">{d.fileName}</span><span className="text-xs text-slate-500">{d.mimeType}</span></span>
                  <a href={`/api/files/${d.id}`} target="_blank" rel="noopener" className="shrink-0 rounded-lg gx-btn gx-btn-dark px-3 py-1.5 text-xs font-semibold text-white">Open</a>
                </li>
              ))}
            </ul>
          )}
          <h3 className="mt-5 font-semibold text-slate-900">Automatic checks</h3>
          <ul className="mt-2 space-y-1.5 text-sm">
            {(checks.auto || []).map((c) => (
              <li key={c.key} className="flex items-start gap-2">
                <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold ${c.passed ? "bg-emerald-700 text-white" : "bg-rose-100 text-rose-700"}`}>{c.passed ? "✓" : "!"}</span>
                <span className={c.passed ? "text-slate-600" : "font-medium text-slate-900"}>{c.label}{c.detail ? ` — ${c.detail}` : ""}</span>
              </li>
            ))}
          </ul>
          {history.length > 0 && (
            <>
              <h3 className="mt-5 font-semibold text-slate-900">Previous applications</h3>
              <ul className="mt-2 space-y-1.5 text-sm text-slate-600">
                {history.map((h) => (
                  <li key={h.id}>{new Date(h.createdAt).toLocaleDateString("en-GB")} — <strong>{h.status}</strong>{h.notes ? `: ${h.notes}` : ""}</li>
                ))}
              </ul>
            </>
          )}
        </Card>
      </div>

      {v.status === "PENDING" ? (
        <div className="mt-4">
          <ReviewPanel id={v.id} manualChecks={MANUAL_CHECKS} />
        </div>
      ) : (
        <Card className="mt-4 p-5 text-sm text-slate-600">
          Decided {v.reviewedAt ? new Date(v.reviewedAt).toLocaleString("en-GB") : ""} — <strong>{v.status}</strong>
          {v.notes ? `: ${v.notes}` : ""}
        </Card>
      )}
    </AdminShell>
  );
}
