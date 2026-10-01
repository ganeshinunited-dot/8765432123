"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Card, Badge } from "@/components/ui/primitives";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

interface Plan {
  slug: string; name: string; description: string; priceMonthly: number;
  jobPostLimit: number; featuredAllowed: boolean; candidateSearch: boolean;
}

export default function BillingClient({ plans, currentSlug, driver }: { plans: Plan[]; currentSlug: string; driver: string }) {
  const router = useRouter();
  const toast = useToast();
  const [busy, setBusy] = useState<string | null>(null);

  async function checkout(plan: Plan) {
    if (plan.priceMonthly === 0) { toast.push("You're already on the free plan.", "info"); return; }
    const provider = driver === "mock" ? "MOCK" : (driver.toUpperCase() as "ESEWA" | "KHALTI");
    setBusy(plan.slug);
    try {
      const res = await fetch("/api/billing/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planSlug: plan.slug, provider }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Could not start checkout.");
      if (data.mockApproveUrl) router.push(data.mockApproveUrl);
      else if (data.redirectUrl) router.push(data.redirectUrl);
      else throw new Error("No checkout URL returned.");
    } catch (e) {
      toast.push(e instanceof Error ? e.message : "Something went wrong.", "error");
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {plans.map((p) => {
        const isCurrent = p.slug === currentSlug;
        return (
          <Card key={p.slug} className={`p-5 ${isCurrent ? "border-emerald-500 ring-2 ring-emerald-500/20" : ""}`}>
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900">{p.name}</h3>
              {isCurrent && <Badge tone="green">Current</Badge>}
            </div>
            <p className="mt-2 text-2xl font-bold text-slate-900">
              NPR {p.priceMonthly.toLocaleString()}<span className="text-sm font-normal text-slate-500">/mo</span>
            </p>
            <p className="mt-1 text-sm text-slate-600">{p.description}</p>
            <ul className="mt-3 space-y-1.5 text-sm text-slate-700">
              <li>✓ {p.jobPostLimit} active job post{p.jobPostLimit === 1 ? "" : "s"}</li>
              {p.featuredAllowed && <li>✓ Featured job slots</li>}
              {p.candidateSearch && <li>✓ Candidate search</li>}
            </ul>
            <div className="mt-4">
              {!isCurrent && p.priceMonthly > 0 && (
                <Button className="w-full" size="sm" disabled={busy !== null} loading={busy === p.slug} onClick={() => checkout(p)}>
                  Upgrade to {p.name}
                </Button>
              )}
              {isCurrent && <p className="text-center text-sm text-slate-500">Your current plan</p>}
            </div>
          </Card>
        );
      })}
    </div>
  );
}
