"use client";

import { useState } from "react";
import Link from "next/link";
import { Modal } from "@/components/ui/overlays";
import { Textarea, Input } from "@/components/ui/fields";
import { Button } from "@/components/ui/Button";
import { Badge, Alert } from "@/components/ui/primitives";
import { APP_STATUS_LABELS, APP_STATUS_COLORS } from "@/lib/format";
import { useToast } from "@/components/ui/Toast";

interface Props {
  jobId: string;
  jobSlug: string;
  application: { status: string } | null;
  saved: boolean;
  userRole: string | null;
  deadline?: Date | null;
  applicantCount?: number;
}

export function ApplyPanel({ jobId, jobSlug, application, saved, userRole, deadline, applicantCount }: Props) {
  const [open, setOpen] = useState(false);
  const [cover, setCover] = useState("");
  const [availability, setAvailability] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const toast = useToast();

  async function submit() {
    setLoading(true);
    setError("");
    const res = await fetch(`/api/jobs/${jobId}/apply`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ coverMessage: cover, availabilityNote: availability }),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) {
      setError(data.error || "Something went wrong. Please try again.");
      return;
    }
    toast.push("Application submitted successfully!", "success");
    window.location.reload();
  }

  async function toggleSave() {
    const res = await fetch(`/api/jobs/${jobId}/save`, { method: "POST" });
    if (res.ok) window.location.reload();
    else toast.push("Please log in to save jobs.", "error");
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      {deadline && (
        <p className="text-sm text-slate-600">Apply before <span className="font-semibold text-slate-900">{new Date(deadline).toLocaleDateString()}</span></p>
      )}
      {applicantCount !== undefined && (
        <p className="mt-1 text-sm text-slate-500">{applicantCount} applicant{applicantCount === 1 ? "" : "s"} so far</p>
      )}

      <div className="mt-4 space-y-2.5">
        {application ? (
          <div className="rounded-lg bg-slate-50 p-4 text-center">
            <p className="text-sm text-slate-600">Your application</p>
            <Badge tone="blue" className="mt-1.5">
              <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${APP_STATUS_COLORS[application.status] ?? ""}`}>
                {APP_STATUS_LABELS[application.status] ?? application.status}
              </span>
            </Badge>
            <Link href="/dashboard/applications" className="mt-2 block text-sm font-semibold text-emerald-700 hover:underline">
              Track application →
            </Link>
          </div>
        ) : userRole === "STUDENT" ? (
          <Button size="lg" className="w-full" onClick={() => setOpen(true)}>Apply Now</Button>
        ) : userRole ? (
          <Alert tone="blue">Only student accounts can apply for jobs.</Alert>
        ) : (
          <Link href={`/login?next=/jobs/${jobSlug}`}>
            <Button size="lg" className="w-full">Log in to Apply</Button>
          </Link>
        )}

        <button
          onClick={toggleSave}
          className={`inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg border text-sm font-semibold transition-colors ${
            saved ? "border-emerald-600 bg-emerald-50 text-emerald-700" : "border-slate-300 text-slate-700 hover:bg-slate-50"
          }`}
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M19 21l-7-4-7 4V5a2 2 0 012-2h10a2 2 0 012 2z" />
          </svg>
          {saved ? "Saved" : "Save Job"}
        </button>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="Apply for this job">
        {error && <Alert tone="rose">{error}</Alert>}
        <div className="space-y-4">
          <Textarea label="Cover message (optional)" rows={4} value={cover} onChange={(e) => setCover(e.target.value)} placeholder="Briefly introduce yourself and why you're a good fit…" maxLength={2000} />
          <Input label="Availability confirmation (optional)" value={availability} onChange={(e) => setAvailability(e.target.value)} placeholder="e.g. Available weekday evenings after 5pm" maxLength={500} />
          <Alert tone="amber">Never pay an employer to apply for or receive a job.</Alert>
          <Button size="lg" className="w-full" loading={loading} onClick={submit}>Submit Application</Button>
        </div>
      </Modal>
    </div>
  );
}

ApplyPanel.Mobile = function MobileApply(props: Props) {
  const { application, userRole, jobSlug } = props;
  const [open, setOpen] = useState(false);
  if (application) {
    return (
      <Link href="/dashboard/applications" className="flex h-12 items-center justify-center rounded-lg bg-slate-900 text-sm font-semibold text-white">
        Track Application
      </Link>
    );
  }
  if (userRole === "STUDENT") {
    return (
      <>
        <button onClick={() => setOpen(true)} className="h-12 w-full rounded-lg bg-emerald-700 text-sm font-semibold text-white">
          Apply Now
        </button>
        <Modal open={open} onClose={() => setOpen(false)} title="Apply for this job">
          <ApplyFormInline {...props} />
        </Modal>
      </>
    );
  }
  return (
    <Link href={`/login?next=/jobs/${jobSlug}`} className="flex h-12 items-center justify-center rounded-lg bg-emerald-700 text-sm font-semibold text-white">
      Log in to Apply
    </Link>
  );
};

function ApplyFormInline({ jobId }: { jobId: string }) {
  const [cover, setCover] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const toast = useToast();
  async function submit() {
    setLoading(true);
    setError("");
    const res = await fetch(`/api/jobs/${jobId}/apply`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ coverMessage: cover }),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) { setError(data.error || "Something went wrong."); return; }
    toast.push("Application submitted successfully!", "success");
    window.location.reload();
  }
  return (
    <div className="space-y-4">
      {error && <Alert tone="rose">{error}</Alert>}
      <Textarea label="Cover message (optional)" rows={4} value={cover} onChange={(e) => setCover(e.target.value)} maxLength={2000} />
      <Button size="lg" className="w-full" loading={loading} onClick={submit}>Submit Application</Button>
    </div>
  );
}
