"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

export default function MockCheckoutClient({ paymentId }: { paymentId: string }) {
  const router = useRouter();
  const toast = useToast();
  const [busy, setBusy] = useState(false);

  async function settle(outcome: "success" | "fail") {
    setBusy(true);
    try {
      const res = await fetch("/api/billing/settle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentId, outcome }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Payment failed.");
      toast.push(outcome === "success" ? "Payment successful. Plan activated." : "Payment marked as failed.", outcome === "success" ? "success" : "error");
      router.push("/employer/billing");
    } catch (e) {
      toast.push(e instanceof Error ? e.message : "Something went wrong.", "error");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex gap-3">
      <Button className="flex-1" disabled={busy} loading={busy} onClick={() => settle("success")}>Approve payment</Button>
      <Button variant="secondary" disabled={busy} onClick={() => settle("fail")}>Decline</Button>
    </div>
  );
}
