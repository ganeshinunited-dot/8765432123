"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/fields";
import { Button } from "@/components/ui/Button";
import { Alert, Card } from "@/components/ui/primitives";
import { useToast } from "@/components/ui/Toast";
import type { ManualCheckItem } from "@/lib/verification";

export function ReviewPanel({ id, manualChecks }: { id: string; manualChecks: ManualCheckItem[] }) {
  const router = useRouter();
  const toast = useToast();
  const [checked, setChecked] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState("");

  function toggle(key: string) {
    setChecked((c) => (c.includes(key) ? c.filter((k) => k !== key) : [...c, key]));
  }

  async function act(action: "approve" | "reject" | "needs-info") {
    setError("");
    if (action !== "approve" && !notes.trim()) {
      setError("Write a note for the employer — this is shown to them.");
      return;
    }
    setBusy(action);
    try {
      const res = await fetch(`/api/admin/verifications/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, notes: notes.trim(), manualChecks: checked }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Action failed.");
      toast.push(
        action === "approve" ? "Company verified for 12 months." : action === "needs-info" ? "Employer asked for more info." : "Verification rejected.",
        "success"
      );
      router.push("/admin/verifications");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setBusy(null);
    }
  }

  return (
    <Card className="p-5 sm:p-6">
      <h3 className="font-semibold text-slate-900">Reviewer checklist</h3>
      <p className="mt-1 text-sm text-slate-500">Tick each item you verified manually. Stored with the decision.</p>
      <ul className="mt-3 space-y-2">
        {manualChecks.map((c) => (
          <li key={c.key}>
            <label className="flex cursor-pointer items-start gap-2.5 text-sm text-slate-800">
              <input type="checkbox" checked={checked.includes(c.key)} onChange={() => toggle(c.key)} className="mt-0.5 h-4 w-4 accent-emerald-700" />
              {c.label}
            </label>
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <Textarea label="Note for the employer (required for reject / more info)" value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} maxLength={1000} placeholder="e.g. The PAN on the certificate does not match the registration number you entered." />
      </div>
      {error && <div className="mt-3"><Alert tone="rose">{error}</Alert></div>}
      <div className="mt-4 flex flex-wrap gap-2">
        <Button onClick={() => act("approve")} loading={busy === "approve"} disabled={busy !== null}>Approve — issue badge</Button>
        <Button variant="secondary" onClick={() => act("needs-info")} loading={busy === "needs-info"} disabled={busy !== null}>Ask for more info</Button>
        <Button variant="secondary" onClick={() => act("reject")} loading={busy === "reject"} disabled={busy !== null} className="!border-rose-300 !text-rose-700 hover:!bg-rose-50">Reject</Button>
      </div>
    </Card>
  );
}
