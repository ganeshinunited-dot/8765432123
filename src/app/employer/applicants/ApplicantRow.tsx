"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Badge } from "@/components/ui/primitives";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { timeAgo } from "@/lib/format";
import Link from "next/link";
import ProposeInterview from "@/components/employer/ProposeInterview";

interface AppData {
  id: string; status: string; appliedAt: string; jobTitle: string; jobId: string;
  studentName: string; headline: string | null; location?: string | null;
  education: string | null; college: string | null; skills: string[];
  coverMessage: string | null; cvFileId: string | null;
}

const NEXT: Record<string, { status: string; label: string }[]> = {
  APPLIED: [{ status: "VIEWED", label: "Mark viewed" }, { status: "SHORTLISTED", label: "Shortlist" }, { status: "REJECTED", label: "Reject" }],
  VIEWED: [{ status: "SHORTLISTED", label: "Shortlist" }, { status: "REJECTED", label: "Reject" }],
  SHORTLISTED: [{ status: "INTERVIEW", label: "Invite to interview" }, { status: "REJECTED", label: "Reject" }],
  INTERVIEW: [{ status: "SELECTED", label: "Select" }, { status: "REJECTED", label: "Reject" }],
  SELECTED: [], REJECTED: [], WITHDRAWN: [],
};

export default function ApplicantRow({ app, tone }: { app: AppData; tone: "green" | "amber" | "rose" | "slate" | "blue" }) {
  const router = useRouter();
  const toast = useToast();
  const [busy, setBusy] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);

  async function changeStatus(status: string) {
    if (status === "REJECTED" && !confirm(`Reject ${app.studentName}?`)) return;
    setBusy(status);
    try {
      const res = await fetch(`/api/applications/${app.id}/status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Could not update.");
      toast.push("Status updated.", "success");
      router.refresh();
    } catch (e) {
      toast.push(e instanceof Error ? e.message : "Something went wrong.", "error");
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="px-5 py-4">
      <button type="button" onClick={() => setExpanded((v) => !v)} className="flex w-full flex-wrap items-center justify-between gap-3 text-left">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-slate-900">{app.studentName}</p>
          <p className="truncate text-xs text-slate-500">
            {app.jobTitle} · applied {timeAgo(new Date(app.appliedAt))}
            {app.location ? ` · ${app.location}` : ""}
          </p>
        </div>
        <Badge tone={tone}>{app.status.charAt(0) + app.status.slice(1).toLowerCase()}</Badge>
      </button>

      {expanded && (
        <div className="mt-3 space-y-3 rounded-lg bg-slate-50 p-4 text-sm">
          {app.headline && <p className="font-medium text-slate-800">{app.headline}</p>}
          <p className="text-slate-600">
            {[app.education, app.college].filter(Boolean).join(" · ") || "Education not listed"}
          </p>
          {app.skills.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {app.skills.map((s) => <span key={s} className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-slate-700 ring-1 ring-slate-200">{s}</span>)}
            </div>
          )}
          {app.coverMessage && <p className="text-slate-700"><span className="font-medium">Cover note:</span> {app.coverMessage}</p>}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            {app.cvFileId && (
              <Link href={`/api/files/${app.cvFileId}`} target="_blank" className="inline-flex h-10 items-center rounded-lg border border-slate-300 bg-white px-4 text-sm font-medium text-slate-700">
                View CV
              </Link>
            )}
            {(NEXT[app.status] || []).map((n) => (
              <Button
                key={n.status}
                size="sm"
                variant={n.status === "REJECTED" ? "ghost" : "secondary"}
                disabled={busy !== null}
                loading={busy === n.status}
                onClick={() => changeStatus(n.status)}
                className={n.status === "REJECTED" ? "text-rose-700 hover:bg-rose-50" : n.status === "SELECTED" ? "border-emerald-600 text-emerald-700" : ""}
              >
                {n.label}
              </Button>
            ))}
            <Button size="sm" variant="secondary" onClick={() => router.push(`/employer/messages?to=${app.id}`)}>
              Message
            </Button>
            {(app.status === "SHORTLISTED" || app.status === "INTERVIEW") && (
              <ProposeInterview applicationId={app.id} studentName={app.studentName} onDone={() => router.refresh()} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
