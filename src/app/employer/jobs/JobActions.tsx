"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

export default function JobActions({ id, status }: { id: string; status: string }) {
  const router = useRouter();
  const toast = useToast();
  const [busy, setBusy] = useState(false);

  async function call(method: string, body?: object) {
    setBusy(true);
    try {
      const res = await fetch(`/api/jobs/${id}`, {
        method,
        headers: { "Content-Type": "application/json" },
        body: body ? JSON.stringify(body) : undefined,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      toast.push("Done.", "success");
      router.refresh();
    } catch (e) {
      toast.push(e instanceof Error ? e.message : "Something went wrong.", "error");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex items-center gap-2">
      {status === "ACTIVE" && (
        <Button variant="secondary" size="sm" disabled={busy} onClick={() => call("PATCH", { action: "pause" })}>Pause</Button>
      )}
      {status === "PAUSED" && (
        <Button variant="secondary" size="sm" disabled={busy} onClick={() => call("PATCH", { action: "resume" })}>Resume</Button>
      )}
      {["DRAFT", "REJECTED", "PAUSED"].includes(status) && (
        <Button variant="secondary" size="sm" disabled={busy} onClick={() => router.push(`/employer/jobs/${id}/edit`)}>Edit</Button>
      )}
      {["ACTIVE", "PAUSED", "DRAFT"].includes(status) && (
        <Button
          variant="ghost" size="sm" disabled={busy}
          onClick={() => { if (confirm("Close this job? It will be hidden from search.")) call("DELETE"); }}
          className="text-rose-700 hover:bg-rose-50"
        >Close</Button>
      )}
    </div>
  );
}
