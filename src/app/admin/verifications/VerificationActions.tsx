"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

export default function VerificationActions({ id }: { id: string }) {
  const router = useRouter();
  const toast = useToast();
  const [busy, setBusy] = useState<string | null>(null);

  async function act(action: string) {
    let notes = "";
    if (action === "reject") {
      notes = prompt("Reason for rejection (shown to employer):") || "";
      if (!notes) return;
    }
    setBusy(action);
    try {
      const res = await fetch(`/api/admin/verifications/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, notes }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Action failed.");
      toast.push(action === "approve" ? "Company verified." : "Verification rejected.", "success");
      router.refresh();
    } catch (e) {
      toast.push(e instanceof Error ? e.message : "Something went wrong.", "error");
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="flex gap-2">
      <Button size="sm" disabled={busy !== null} loading={busy === "approve"} onClick={() => act("approve")}>Approve</Button>
      <Button size="sm" variant="secondary" disabled={busy !== null} onClick={() => act("reject")} className="text-rose-700">Reject</Button>
    </div>
  );
}
