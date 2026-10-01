"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

export default function InterviewActions({ id }: { id: string }) {
  const router = useRouter();
  const toast = useToast();
  const [busy, setBusy] = useState<string | null>(null);

  async function act(action: string) {
    setBusy(action);
    try {
      const res = await fetch(`/api/interviews/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Could not respond.");
      toast.push(action === "accept" ? "Interview accepted. Good luck!" : action === "decline" ? "Invitation declined." : "Reschedule requested.", "success");
      router.refresh();
    } catch (e) {
      toast.push(e instanceof Error ? e.message : "Something went wrong.", "error");
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Button size="sm" disabled={busy !== null} loading={busy === "accept"} onClick={() => act("accept")}>Accept</Button>
      <Button size="sm" variant="secondary" disabled={busy !== null} loading={busy === "reschedule"} onClick={() => act("reschedule")}>Ask to reschedule</Button>
      <Button size="sm" variant="ghost" disabled={busy !== null} loading={busy === "decline"} onClick={() => { if (confirm("Decline this interview?")) act("decline"); }} className="text-rose-700 hover:bg-rose-50">Decline</Button>
    </div>
  );
}
