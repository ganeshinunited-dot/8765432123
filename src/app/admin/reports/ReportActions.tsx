"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

export default function ReportActions({ id, targetType }: { id: string; targetType: string }) {
  const router = useRouter();
  const toast = useToast();
  const [busy, setBusy] = useState<string | null>(null);

  async function act(action: string) {
    const confirmMsg: Record<string, string> = {
      takedown: "Take down this job immediately?",
      suspend_user: "Suspend this user and sign them out everywhere?",
    };
    if (confirmMsg[action] && !confirm(confirmMsg[action])) return;
    setBusy(action);
    try {
      const res = await fetch(`/api/admin/reports/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Action failed.");
      toast.push("Report handled.", "success");
      router.refresh();
    } catch (e) {
      toast.push(e instanceof Error ? e.message : "Something went wrong.", "error");
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      {targetType === "JOB" && (
        <Button size="sm" variant="secondary" disabled={busy !== null} loading={busy === "takedown"} onClick={() => act("takedown")} className="text-rose-700">Take down job</Button>
      )}
      {targetType === "USER" && (
        <Button size="sm" variant="secondary" disabled={busy !== null} loading={busy === "suspend_user"} onClick={() => act("suspend_user")} className="text-rose-700">Suspend user</Button>
      )}
      <Button size="sm" variant="secondary" disabled={busy !== null} onClick={() => act("resolve")}>Resolve</Button>
      <Button size="sm" variant="ghost" disabled={busy !== null} onClick={() => act("dismiss")}>Dismiss</Button>
    </div>
  );
}
