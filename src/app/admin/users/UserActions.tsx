"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

export default function UserActions({ id, name, status }: { id: string; name: string; status: string }) {
  const router = useRouter();
  const toast = useToast();
  const [busy, setBusy] = useState(false);

  async function act(action: string) {
    if (action === "suspend" && !confirm(`Suspend ${name}? They will be signed out immediately.`)) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/users/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Action failed.");
      toast.push(action === "suspend" ? "User suspended." : "User reactivated.", "success");
      router.refresh();
    } catch (e) {
      toast.push(e instanceof Error ? e.message : "Something went wrong.", "error");
    } finally {
      setBusy(false);
    }
  }

  if (status === "ACTIVE") {
    return <Button size="sm" variant="ghost" disabled={busy} onClick={() => act("suspend")} className="text-rose-700 hover:bg-rose-50">Suspend</Button>;
  }
  return <Button size="sm" variant="secondary" disabled={busy} onClick={() => act("reactivate")}>Reactivate</Button>;
}
