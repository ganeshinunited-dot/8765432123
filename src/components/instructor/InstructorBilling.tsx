"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Card } from "@/components/ui/primitives";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/fields";
import { useToast } from "@/components/ui/Toast";

/** Deterministic demo QR pattern (clearly labelled demo — no real payment rail yet). */
function DemoQr({ seed }: { seed: string }) {
  const n = 21;
  let h = 0;
  for (const ch of seed) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  const cells: boolean[] = [];
  for (let i = 0; i < n * n; i++) {
    h = (h * 1103515245 + 12345) >>> 0;
    cells.push(h % 3 !== 0);
  }
  const s = 200 / n;
  return (
    <svg viewBox="0 0 200 200" className="h-48 w-48 rounded-xl border-4 border-white bg-white shadow" role="img" aria-label="Demo payment QR code">
      {cells.map((on, i) =>
        on ? <rect key={i} x={(i % n) * s} y={Math.floor(i / n) * s} width={s} height={s} fill="#0f172a" /> : null
      )}
    </svg>
  );
}

export function InstructorBilling({ name, email, phone }: { name: string; email: string; phone: string }) {
  const router = useRouter();
  const toast = useToast();
  const [step, setStep] = useState<"details" | "qr">("details");
  const [busy, setBusy] = useState(false);
  const ref = `GX-CRS-${Date.now().toString(36).toUpperCase()}`;

  async function complete() {
    setBusy(true);
    try {
      const res = await fetch("/api/instructor/billing/complete", { method: "POST" });
      if (!res.ok) throw new Error("Payment confirmation failed.");
      toast.push("Payment complete. Welcome aboard!", "success");
      router.push("/instructor/home");
      router.refresh();
    } catch (e) {
      toast.push(e instanceof Error ? e.message : "Something went wrong.", "error");
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      <Card className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Creator Yearly</h2>
            <p className="mt-1 text-sm text-slate-500">Ads every day · post design · live support · eSewa/Khalti · unlimited uploads · featured placement · pro video editing · Canva Pro 1 year · AI student matching</p>
          </div>
          <p className="shrink-0 text-2xl font-bold text-slate-900">NPR 20,000<span className="text-sm font-medium text-slate-500">/yr</span></p>
        </div>
      </Card>

      {step === "details" ? (
        <Card className="mt-4 p-6">
          <h3 className="font-bold text-slate-900">Billing details</h3>
          <p className="mt-1 text-sm text-slate-500">Pre-filled from your profile — edit if needed.</p>
          <div className="mt-4 space-y-4">
            <Input name="name" label="Full name" defaultValue={name} required />
            <Input name="email" label="Email" type="email" defaultValue={email} required />
            <Input name="phone" label="Phone" defaultValue={phone} required />
            <Input name="address" label="Address (optional)" placeholder="Kathmandu, Nepal" />
          </div>
          <Button className="mt-6 w-full" size="lg" onClick={() => setStep("qr")}>
            Continue to payment
          </Button>
        </Card>
      ) : (
        <Card className="mt-4 p-6 text-center">
          <h3 className="font-bold text-slate-900">Scan to pay — NPR 20,000</h3>
          <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-amber-700">Demo QR — no real money moves</p>
          <div className="mt-4 flex justify-center">
            <DemoQr seed={ref} />
          </div>
          <p className="mt-3 font-mono text-xs text-slate-400">{ref}</p>
          <p className="mt-2 text-sm text-slate-500">eSewa / Khalti demo. In production this opens your wallet app.</p>
          <div className="mt-5 flex gap-2">
            <Button variant="secondary" className="flex-1" onClick={() => setStep("details")}>Back</Button>
            <Button className="flex-1" loading={busy} onClick={complete}>Payment complete</Button>
          </div>
        </Card>
      )}
    </div>
  );
}
