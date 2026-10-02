"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/overlays";
import { Select, Textarea } from "@/components/ui/fields";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/primitives";
import { useToast } from "@/components/ui/Toast";

const REASONS = [
  ["SCAM", "Scam"],
  ["FAKE_JOB", "Fake job"],
  ["MISLEADING_SALARY", "Misleading salary"],
  ["HARASSMENT", "Harassment"],
  ["SPAM", "Spam"],
  ["UNSAFE_REQUEST", "Unsafe request"],
  ["OTHER", "Other"],
];

export function ReportButton({ targetType, targetId }: { targetType: string; targetId: string }) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("SCAM");
  const [details, setDetails] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const toast = useToast();

  async function submit() {
    setLoading(true);
    setError("");
    const res = await fetch("/api/reports", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ targetType, targetId, reason, details }),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) { setError(data.error || "Something went wrong."); return; }
    setOpen(false);
    toast.push("Report submitted. Our team will review it.", "success");
  }

  return (
    <>
      <button onClick={() => setOpen(true)} className="text-sm text-slate-500 underline hover:text-slate-700">
        Report this job
      </button>
      <Modal open={open} onClose={() => setOpen(false)} title="Report this job">
        <div className="space-y-4">
          {error && <Alert tone="rose">{error}</Alert>}
          <Select label="Reason" value={reason} onChange={(e) => setReason(e.target.value)} options={REASONS.map(([value, label]) => ({ value, label }))} />
          <Textarea label="Details (optional)" rows={3} value={details} onChange={(e) => setDetails(e.target.value)} maxLength={2000} placeholder="What happened?" />
          <Button className="w-full" loading={loading} onClick={submit}>Submit report</Button>
        </div>
      </Modal>
    </>
  );
}
