"use client";

import { useState } from "react";
import { ConfirmDialog } from "@/components/ui/overlays";
import { useToast } from "@/components/ui/Toast";

export function WithdrawButton({ applicationId }: { applicationId: string }) {
  const [open, setOpen] = useState(false);
  const toast = useToast();

  async function withdraw() {
    const res = await fetch(`/api/applications/${applicationId}/withdraw`, { method: "POST" });
    if (res.ok) {
      toast.push("Application withdrawn.", "success");
      window.location.reload();
    } else {
      const data = await res.json();
      toast.push(data.error || "Could not withdraw.", "error");
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex h-10 items-center rounded-lg border border-slate-300 px-4 text-sm font-medium text-slate-600 hover:bg-slate-50"
      >
        Withdraw
      </button>
      <ConfirmDialog
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={withdraw}
        title="Withdraw application?"
        description="The employer will be notified. This cannot be undone."
        confirmLabel="Withdraw"
        danger
      />
    </>
  );
}
