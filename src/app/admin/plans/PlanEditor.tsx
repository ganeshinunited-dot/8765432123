"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input, Textarea } from "@/components/ui/fields";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

interface Plan {
  id: string; name: string; slug: string; description: string;
  priceMonthly: number; jobPostLimit: number; featuredAllowed: boolean;
  candidateSearch: boolean; active: boolean;
}

export default function PlanEditor({ plan, activeSubs }: { plan: Plan; activeSubs: number }) {
  const router = useRouter();
  const toast = useToast();
  const [form, setForm] = useState(plan);
  const [saving, setSaving] = useState(false);

  const set = (k: keyof Plan, v: unknown) => setForm((f) => ({ ...f, [k]: v }));

  async function save() {
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/plans/${plan.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name, description: form.description,
          priceMonthly: Number(form.priceMonthly), jobPostLimit: Number(form.jobPostLimit),
          featuredAllowed: form.featuredAllowed, candidateSearch: form.candidateSearch, active: form.active,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Could not save.");
      toast.push("Plan updated.", "success");
      router.refresh();
    } catch (e) {
      toast.push(e instanceof Error ? e.message : "Something went wrong.", "error");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-slate-900">{plan.name} <span className="font-mono text-xs text-slate-400">/{plan.slug}</span></h3>
          <p className="text-xs text-slate-500">{activeSubs} active subscription{activeSubs === 1 ? "" : "s"}</p>
        </div>
        <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
          <input type="checkbox" checked={form.active} onChange={(e) => set("active", e.target.checked)} className="h-5 w-5 accent-emerald-700" />
          Active
        </label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Input label="Name" name="name" value={form.name} onChange={(e) => set("name", e.target.value)} />
        <Input label="Price (NPR / month)" name="price" type="number" min={0} value={String(form.priceMonthly)} onChange={(e) => set("priceMonthly", e.target.value)} />
        <Input label="Active job post limit" name="limit" type="number" min={1} value={String(form.jobPostLimit)} onChange={(e) => set("jobPostLimit", e.target.value)} />
        <div className="flex items-end gap-6 pb-3">
          <label className="flex items-center gap-2 text-sm text-slate-700"><input type="checkbox" checked={form.featuredAllowed} onChange={(e) => set("featuredAllowed", e.target.checked)} className="h-5 w-5 accent-emerald-700" /> Featured jobs</label>
          <label className="flex items-center gap-2 text-sm text-slate-700"><input type="checkbox" checked={form.candidateSearch} onChange={(e) => set("candidateSearch", e.target.checked)} className="h-5 w-5 accent-emerald-700" /> Candidate search</label>
        </div>
      </div>
      <Textarea label="Description" name="desc" rows={2} value={form.description} onChange={(e) => set("description", e.target.value)} />
      <div className="mt-3 flex justify-end">
        <Button size="sm" onClick={save} loading={saving}>Save plan</Button>
      </div>
    </div>
  );
}
