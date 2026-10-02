"use client";

import { useState } from "react";
import { Input } from "@/components/ui/fields";
import { Button } from "@/components/ui/Button";
import { Alert, Card, Badge } from "@/components/ui/primitives";
import { useToast } from "@/components/ui/Toast";
import { badgeTone, badgeLabel, isBadgeValid, verificationExpired, verificationExpiringSoon, REQUIRED_DOCS_MIN } from "@/lib/verification";

export interface VerificationSnapshot {
  id: string;
  status: string;
  notes: string | null;
  createdAt: string;
  businessInfo: Record<string, string>;
  documentIds: string[];
}

export interface CenterProps {
  companyId?: string;
  verificationStatus: string;
  verifiedAt?: string | null;
  verificationExpiresAt?: string | null;
  ownerEmailVerified: boolean;
  profile: { logoUrl?: string | null; industry?: string | null; description?: string | null; locationId?: string | null; website?: string | null };
  latest: VerificationSnapshot | null;
  pastCount: number;
}

function fmt(d?: string | null) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

const DOC_ACCEPT = ".pdf,.jpg,.jpeg,.png,.webp,.doc,.docx";

export function VerificationCenter(props: CenterProps) {
  const { verificationStatus, latest } = props;
  const companyLike = { verificationStatus, verificationExpiresAt: props.verificationExpiresAt };
  const valid = isBadgeValid(companyLike);
  const expired = verificationExpired(companyLike);
  const expiringSoon = verificationExpiringSoon(companyLike);
  const [flow, setFlow] = useState(false);

  if (!flow && valid) {
    return (
      <Card className="border-emerald-200 bg-emerald-50 p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="flex items-center gap-2 text-base font-semibold text-emerald-900">
            <ShieldIcon /> Trust badge: Verified
          </h2>
          <Badge tone="green">Verified</Badge>
        </div>
        <p className="mt-2 text-sm text-emerald-800">
          Verified since {fmt(props.verifiedAt)}
          {props.verificationExpiresAt ? ` · renews by ${fmt(props.verificationExpiresAt)}` : ""}. Your jobs carry the verified trust badge.
        </p>
        {expiringSoon && (
          <div className="mt-3"><Alert tone="amber">Your verification expires on {fmt(props.verificationExpiresAt)}. Renew now to keep the badge without interruption.</Alert></div>
        )}
        <Button variant="secondary" className="mt-4" onClick={() => setFlow(true)}>
          {expiringSoon ? "Renew verification" : "Re-verify company"}
        </Button>
      </Card>
    );
  }

  if (!flow && expired) {
    return (
      <Card className="p-5 sm:p-6">
        <h2 className="flex items-center gap-2 text-base font-semibold text-slate-900"><ShieldIcon /> Verification expired</h2>
        <div className="mt-3"><Alert tone="rose">Your company verification expired on {fmt(props.verificationExpiresAt)}. Renew to restore the trust badge on your jobs.</Alert></div>
        <Button className="mt-4" onClick={() => setFlow(true)}>Renew verification</Button>
      </Card>
    );
  }

  if (!flow && verificationStatus === "PENDING" && latest) {
    return (
      <Card className="p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="flex items-center gap-2 text-base font-semibold text-slate-900"><ShieldIcon /> Verification in review</h2>
          <Badge tone="amber">Pending</Badge>
        </div>
        <ol className="mt-4 space-y-0 text-sm">
          <Step done label={`Application submitted — ${fmt(latest.createdAt)}`} />
          <Step active label="Our team is reviewing your documents and business details" detail="Usually within 1 working day. We'll notify you of the decision." />
          <Step label="Decision: badge issued or feedback sent" />
        </ol>
        <p className="mt-4 text-xs text-slate-500">Registration no.: {latest.businessInfo.registrationNo || "—"} · {latest.documentIds.length} document(s) attached</p>
      </Card>
    );
  }

  if (!flow && (verificationStatus === "REJECTED" || verificationStatus === "NEEDS_INFO") && latest) {
    return (
      <Card className="p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="flex items-center gap-2 text-base font-semibold text-slate-900"><ShieldIcon /> Verification {verificationStatus === "REJECTED" ? "not approved" : "needs more info"}</h2>
          <Badge tone={badgeTone(companyLike)}>{badgeLabel(companyLike)}</Badge>
        </div>
        {latest.notes && <div className="mt-3"><Alert tone={verificationStatus === "REJECTED" ? "rose" : "blue"}>Reviewer note: {latest.notes}</Alert></div>}
        <p className="mt-3 text-sm text-slate-600">Fix the issues above and submit a new application — your earlier attempt ({fmt(latest.createdAt)}) is kept for reference.</p>
        <Button className="mt-4" onClick={() => setFlow(true)}>Start new application</Button>
        {props.pastCount > 1 && <p className="mt-2 text-xs text-slate-400">{props.pastCount} applications on record.</p>}
      </Card>
    );
  }

  return <ApplicationFlow {...props} onCancel={() => setFlow(false)} showCancel={props.verificationStatus !== "PENDING" && !valid && !expired && !!latest} />;
}

function Step({ done, active, label, detail }: { done?: boolean; active?: boolean; label: string; detail?: string }) {
  return (
    <li className="flex gap-3 pb-4 last:pb-0">
      <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${done ? "bg-emerald-700 text-white" : active ? "border-2 border-emerald-700 text-emerald-700" : "bg-slate-200 text-slate-500"}`}>
        {done ? "✓" : active ? "•" : ""}
      </span>
      <div>
        <p className={`font-medium ${active ? "text-slate-900" : done ? "text-slate-700" : "text-slate-500"}`}>{label}</p>
        {detail && <p className="text-slate-500">{detail}</p>}
      </div>
    </li>
  );
}

function ShieldIcon() {
  return (
    <svg className="h-5 w-5 text-emerald-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3z" strokeLinejoin="round" />
      <path d="M9.5 12l1.8 1.8L14.7 10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ApplicationFlow(props: CenterProps & { onCancel: () => void; showCancel: boolean }) {
  const toast = useToast();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [docIds, setDocIds] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({ registrationNo: "", contactPerson: "", address: "", phone: "" });

  const profileItems = [
    !!props.profile.logoUrl,
    !!props.profile.industry,
    !!props.profile.description,
    !!props.profile.locationId,
  ];
  const profileOk = profileItems.filter(Boolean).length >= 4;
  const checks = [
    { label: "Account email verified", ok: props.ownerEmailVerified },
    { label: "Company profile complete (logo, industry, description, location)", ok: profileOk },
    { label: `Business registration number entered`, ok: form.registrationNo.trim().length >= 4 },
    { label: `At least ${REQUIRED_DOCS_MIN} supporting document uploaded`, ok: docIds.length >= REQUIRED_DOCS_MIN },
  ];
  const step1Ok = form.registrationNo.trim().length >= 4 && form.contactPerson.trim().length >= 2 && form.address.trim().length >= 3 && form.phone.trim().length >= 7;
  const allOk = checks.every((c) => c.ok) && step1Ok;

  async function uploadDoc(file: File) {
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    fd.append("purpose", "DOCUMENT");
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const data = await res.json();
    setUploading(false);
    if (!res.ok) { toast.push(data.error || "Upload failed.", "error"); return; }
    setDocIds([...docIds, data.fileId]);
    toast.push("Document uploaded.", "success");
  }

  async function submit() {
    setError("");
    setLoading(true);
    const res = await fetch("/api/verification", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, documentIds: docIds }),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) { setError(data.error || "Something went wrong."); return; }
    toast.push("Verification request submitted.", "success");
    window.location.reload();
  }

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [k]: e.target.value });

  return (
    <Card className="p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="flex items-center gap-2 text-base font-semibold text-slate-900"><ShieldIcon /> Get the verified trust badge</h2>
        {props.showCancel && <button type="button" onClick={props.onCancel} className="text-sm font-medium text-slate-500 hover:text-slate-800">Cancel</button>}
      </div>
      <ol className="mt-4 flex gap-1 text-xs font-medium sm:text-sm" aria-label="Progress">
        {["Business details", "Documents", "Review & submit"].map((t, i) => (
          <li key={t} className={`flex-1 rounded-lg px-2 py-2 text-center ${step > i + 1 ? "bg-emerald-100 text-emerald-800" : step === i + 1 ? "bg-emerald-700 text-white" : "bg-slate-100 text-slate-500"}`}>
            {i + 1}. {t}
          </li>
        ))}
      </ol>

      {error && <div className="mt-4"><Alert tone="rose">{error}</Alert></div>}

      {step === 1 && (
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Input label="Business registration no. (PAN) *" value={form.registrationNo} onChange={set("registrationNo")} placeholder="e.g. 609123456" maxLength={100} hint="Found on your PAN / company registration certificate." />
          <Input label="Contact person *" value={form.contactPerson} onChange={set("contactPerson")} maxLength={120} />
          <div className="sm:col-span-2"><Input label="Business address *" value={form.address} onChange={set("address")} maxLength={300} /></div>
          <Input label="Business phone *" value={form.phone} onChange={set("phone")} type="tel" maxLength={20} />
          <div className="flex justify-end sm:col-span-2">
            <Button onClick={() => setStep(2)} disabled={!step1Ok}>Continue to documents</Button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="mt-4">
          <p className="text-sm text-slate-600">Upload your <strong>business registration certificate</strong> or PAN certificate. Clear photo or scan (PDF/JPG/PNG). Required — applications without documents are rejected.</p>
          <label className="mt-3 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center hover:border-emerald-500">
            <span className="text-sm font-semibold text-slate-800">{uploading ? "Uploading…" : "Choose a document to upload"}</span>
            <span className="mt-1 text-xs text-slate-500">PDF, JPG, PNG, WEBP or Word — max 5 files</span>
            <input type="file" accept={DOC_ACCEPT} className="sr-only" disabled={uploading || docIds.length >= 5}
              onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadDoc(f); e.target.value = ""; }} />
          </label>
          {docIds.length > 0 && <p className="mt-2 text-sm font-medium text-emerald-700">{docIds.length} document(s) attached ✓</p>}
          <div className="mt-4 flex justify-between">
            <Button variant="secondary" onClick={() => setStep(1)}>Back</Button>
            <Button onClick={() => setStep(3)} disabled={docIds.length < REQUIRED_DOCS_MIN}>Review application</Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="mt-4">
          <dl className="grid gap-2 rounded-xl bg-slate-50 p-4 text-sm sm:grid-cols-2">
            <div><dt className="text-slate-500">Registration no.</dt><dd className="font-medium">{form.registrationNo}</dd></div>
            <div><dt className="text-slate-500">Contact person</dt><dd className="font-medium">{form.contactPerson}</dd></div>
            <div><dt className="text-slate-500">Address</dt><dd className="font-medium">{form.address}</dd></div>
            <div><dt className="text-slate-500">Phone</dt><dd className="font-medium">{form.phone}</dd></div>
          </dl>
          <ul className="mt-4 space-y-2 text-sm">
            {checks.map((c) => (
              <li key={c.label} className="flex items-start gap-2">
                <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold ${c.ok ? "bg-emerald-700 text-white" : "bg-rose-100 text-rose-700"}`}>{c.ok ? "✓" : "!"}</span>
                <span className={c.ok ? "text-slate-700" : "text-slate-900 font-medium"}>{c.label}</span>
              </li>
            ))}
          </ul>
          {!allOk && <div className="mt-3"><Alert tone="amber">Complete the highlighted items above — our reviewers reject incomplete applications.</Alert></div>}
          <div className="mt-4 flex justify-between">
            <Button variant="secondary" onClick={() => setStep(2)}>Back</Button>
            <Button onClick={submit} loading={loading} disabled={!allOk || !props.companyId}>Submit for verification</Button>
          </div>
          {!props.companyId && <p className="mt-2 text-sm text-amber-700">Save your company profile first.</p>}
        </div>
      )}
    </Card>
  );
}
