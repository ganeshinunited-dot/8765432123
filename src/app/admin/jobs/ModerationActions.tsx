"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

export default function ModerationActions({ id, status, featured, slug }: { id: string; status: string; featured: boolean; slug: string }) {
  const router = useRouter();
  const toast = useToast();
  const [busy, setBusy] = useState<string | null>(null);

  async function act(action: string, reason?: string) {
    setBusy(action);
    try {
      const res = await fetch(`/api/admin/jobs/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, reason }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Action failed.");
      toast.push("Done.", "success");
      router.refresh();
    } catch (e) {
      toast.push(e instanceof Error ? e.message : "Something went wrong.", "error");
    } finally {
      setBusy(null);
    }
  }

  function reject() {
    const reason = prompt("Reason for rejection (shown to employer):");
    if (reason) act("reject", reason);
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Link href={`/jobs/${slug}`} target="_blank" className="text-sm font-medium text-emerald-700 hover:underline">Preview</Link>
      {status === "PENDING_REVIEW" && (
        <>
          <Button size="sm" disabled={busy !== null} loading={busy === "approve"} onClick={() => act("approve")}>Approve</Button>
          <Button size="sm" variant="secondary" disabled={busy !== null} onClick={reject}>Reject</Button>
        </>
      )}
      {status === "ACTIVE" && (
        <>
          <Button size="sm" variant="secondary" disabled={busy !== null} onClick={() => act(featured ? "unfeature" : "feature")}>
            {featured ? "Unfeature" : "Feature"}
          </Button>
          <Button size="sm" variant="ghost" disabled={busy !== null} onClick={() => { if (confirm("Remove this job from the site?")) act("remove"); }} className="text-rose-700 hover:bg-rose-50">Remove</Button>
        </>
      )}
    </div>
  );
}
