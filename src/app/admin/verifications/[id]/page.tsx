import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/admin";
import { db } from "@/lib/db";
import { autoChecks } from "@/lib/verification";
import VerificationActions from "@/components/admin/VerificationActions";

export const metadata: Metadata = {
  title: "Review verification",
  robots: { index: false, follow: false },
};

function formatDate(d: Date | null): string {
  if (!d) return "—";
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(d);
}

function infoStr(info: Record<string, unknown>, key: string): string {
  const v = info[key];
  return typeof v === "string" && v ? v : "—";
}

export default async function AdminVerificationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;
  const emailConfigured = (process.env.EMAIL_DRIVER || "log") === "resend";

  const verification = await db.companyVerification.findUnique({
    where: { id },
    include: {
      company: { include: { owner: { select: { id: true, name: true, email: true, emailVerified: true } } } },
    },
  });
  if (!verification) notFound();

  const company = verification.company;
  const owner = company.owner;
  const info = (verification.businessInfo ?? {}) as Record<string, unknown>;
  const storedChecks = (verification.checks ?? {}) as Record<string, unknown>;
  const storedManual =
    storedChecks.manual && typeof storedChecks.manual === "object"
      ? (storedChecks.manual as Record<string, boolean>)
      : {};
  const domainMismatch = storedChecks.domainMismatch === true;

  const liveAuto = autoChecks(
    {
      logoUrl: company.logoUrl,
      industry: company.industry,
      description: company.description,
      locationId: company.locationId,
      website: company.website,
    },
    owner.emailVerified
  );

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <p className="text-sm text-slate-500">
        <Link href="/admin/verifications" className="font-semibold text-emerald-700 hover:underline">
          ← Verification queue
        </Link>
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">{company.name}</h1>
      <p className="mt-1 text-sm text-slate-600">
        Submitted {formatDate(verification.createdAt)} · Status: <strong>{verification.status}</strong>
      </p>

      <section className="mt-8">
        <h2 className="text-lg font-bold text-slate-900">Company</h2>
        <dl className="mt-3 space-y-2 text-sm">
          <div className="flex gap-2"><dt className="w-40 shrink-0 font-medium text-slate-500">Website</dt><dd className="text-slate-900">{company.website ? <a href={company.website} target="_blank" rel="noopener noreferrer" className="font-semibold text-emerald-700 hover:underline">{company.website}</a> : "—"}</dd></div>
          <div className="flex gap-2"><dt className="w-40 shrink-0 font-medium text-slate-500">Industry</dt><dd className="text-slate-900">{company.industry || "—"}</dd></div>
          <div className="flex gap-2"><dt className="w-40 shrink-0 font-medium text-slate-500">Size</dt><dd className="text-slate-900">{company.size || "—"}</dd></div>
          <div className="flex gap-2"><dt className="w-40 shrink-0 font-medium text-slate-500">Description</dt><dd className="whitespace-pre-wrap text-slate-900">{company.description || "—"}</dd></div>
          <div className="flex gap-2"><dt className="w-40 shrink-0 font-medium text-slate-500">Logo URL</dt><dd className="break-all text-slate-900">{company.logoUrl || "—"}</dd></div>
        </dl>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-bold text-slate-900">Registration &amp; contact</h2>
        <dl className="mt-3 space-y-2 text-sm">
          <div className="flex gap-2"><dt className="w-40 shrink-0 font-medium text-slate-500">Registration no.</dt><dd className="text-slate-900">{infoStr(info, "registrationNo")}</dd></div>
          <div className="flex gap-2"><dt className="w-40 shrink-0 font-medium text-slate-500">Registered address</dt><dd className="whitespace-pre-wrap text-slate-900">{infoStr(info, "address")}</dd></div>
          <div className="flex gap-2"><dt className="w-40 shrink-0 font-medium text-slate-500">City / country</dt><dd className="text-slate-900">{[infoStr(info, "city"), infoStr(info, "country")].filter((x) => x !== "—").join(", ") || "—"}</dd></div>
          <div className="flex gap-2"><dt className="w-40 shrink-0 font-medium text-slate-500">Contact person</dt><dd className="text-slate-900">{infoStr(info, "contactPerson")} {infoStr(info, "contactTitle") !== "—" ? `(${infoStr(info, "contactTitle")})` : ""}</dd></div>
          <div className="flex gap-2"><dt className="w-40 shrink-0 font-medium text-slate-500">Contact email</dt><dd className="text-slate-900">{owner.email} {owner.emailVerified ? "(verified)" : "(NOT verified)"}</dd></div>
          <div className="flex gap-2"><dt className="w-40 shrink-0 font-medium text-slate-500">Contact phone</dt><dd className="text-slate-900">{infoStr(info, "contactPhone")}</dd></div>
        </dl>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-bold text-slate-900">Automatic checks</h2>
        <ul className="mt-3 space-y-1.5 text-sm">
          {liveAuto.map((c) => (
            <li key={c.key} className="flex items-start gap-2">
              <span className={c.passed ? "text-emerald-700" : "text-amber-600"}>
                {c.passed ? "✓" : "•"}
              </span>
              <span className="text-slate-700">
                {c.label}
                {c.detail ? <span className="text-slate-500"> — {c.detail}</span> : null}
              </span>
            </li>
          ))}
          {domainMismatch && (
            <li className="flex items-start gap-2">
              <span className="text-amber-600">•</span>
              <span className="text-slate-700">
                Applicant email domain does not match the company website domain — check manually.
              </span>
            </li>
          )}
        </ul>
      </section>

      {verification.notes && (
        <section className="mt-8">
          <h2 className="text-lg font-bold text-slate-900">Review notes</h2>
          <p className="mt-2 whitespace-pre-wrap rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
            {verification.notes}
          </p>
        </section>
      )}

      <section className="mt-8 border-t border-slate-200 pt-6">
        <VerificationActions
          id={verification.id}
          status={verification.status}
          ownerEmailVerified={owner.emailVerified}
          emailConfigured={emailConfigured}
          initialChecks={storedManual}
        />
      </section>
    </div>
  );
}
