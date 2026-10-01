"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input, Textarea, Select } from "@/components/ui/fields";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/primitives";
import { useToast } from "@/components/ui/Toast";

const JOB_TYPES = [
  ["PART_TIME", "Part-time"], ["FULL_TIME", "Full-time"], ["INTERNSHIP", "Internship"],
  ["TEMPORARY", "Temporary"], ["CONTRACT", "Contract"],
];
const ARRANGEMENTS = [["ON_SITE", "On-site"], ["REMOTE", "Remote"], ["HYBRID", "Hybrid"]];
const SCHEDULES = [["MORNING", "Morning"], ["AFTERNOON", "Afternoon"], ["EVENING", "Evening"], ["WEEKEND", "Weekend"]];
const SALARY_TYPES = [["HOURLY", "Per hour"], ["DAILY", "Per day"], ["WEEKLY", "Per week"], ["MONTHLY", "Per month"], ["NEGOTIABLE", "Negotiable"]];

interface Taxonomy { categories: { id: string; name: string }[]; locations: { id: string; name: string }[] }

const STEPS = ["Basics", "Details", "Schedule & pay", "Review"];

export default function JobWizard({ taxonomy, initial }: { taxonomy: Taxonomy; initial?: Record<string, unknown> }) {
  const router = useRouter();
  const toast = useToast();
  const [step, setStep] = useState(0);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState<Record<string, unknown>>({
    title: "", categoryId: "", jobType: "PART_TIME", workArrangement: "ON_SITE", locationId: "",
    description: "", responsibilities: "", requirements: "", benefits: "",
    schedules: [], salaryType: "MONTHLY", salaryMin: "", salaryMax: "", openings: 1,
    deadline: "", skills: "", questions: "",
    ...(initial || {}),
  });

  const set = (k: string, v: unknown) => setForm((f) => ({ ...f, [k]: v }));

  function toggleSchedule(s: string) {
    const cur = form.schedules as string[];
    set("schedules", cur.includes(s) ? cur.filter((x) => x !== s) : [...cur, s]);
  }

  function validate(s: number): boolean {
    const e: Record<string, string> = {};
    if (s === 0) {
      if ((form.title as string).trim().length < 5) e.title = "Title must be at least 5 characters.";
    }
    if (s === 1) {
      if ((form.description as string).trim().length < 50) e.description = "Description must be at least 50 characters so students know what to expect.";
    }
    if (s === 2) {
      if (form.salaryType !== "NEGOTIABLE") {
        const min = Number(form.salaryMin), max = Number(form.salaryMax);
        if (!min || min <= 0) e.salaryMin = "Enter minimum pay.";
        if (!max || max <= 0) e.salaryMax = "Enter maximum pay.";
        if (min && max && max < min) e.salaryMax = "Maximum cannot be less than minimum.";
      }
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function next() { if (validate(step)) setStep((s) => Math.min(s + 1, STEPS.length - 1)); window.scrollTo(0, 0); }
  function back() { setStep((s) => Math.max(s - 1, 0)); window.scrollTo(0, 0); }

  async function submit() {
    if (!validate(0) || !validate(1) || !validate(2)) { setStep(0); return; }
    setSaving(true);
    try {
      const payload = {
        ...form,
        salaryMin: form.salaryType === "NEGOTIABLE" ? undefined : Number(form.salaryMin),
        salaryMax: form.salaryType === "NEGOTIABLE" ? undefined : Number(form.salaryMax),
        openings: Number(form.openings) || 1,
        skills: (form.skills as string).split(",").map((x) => x.trim()).filter(Boolean),
        questions: [],
      };
      const isEdit = initial?.id;
      const res = await fetch(isEdit ? `/api/jobs/${initial.id}` : "/api/jobs", {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Could not save the job.");
      toast.push(isEdit ? "Job updated and sent for review." : "Job submitted for review.", "success");
      router.push("/employer/jobs");
    } catch (e) {
      toast.push(e instanceof Error ? e.message : "Something went wrong.", "error");
    } finally {
      setSaving(false);
    }
  }

  const salaryLabel = (SALARY_TYPES.find(([v]) => v === form.salaryType)?.[1] || "").toLowerCase();

  return (
    <div>
      <ol className="mb-6 flex gap-2" aria-label="Progress">
        {STEPS.map((label, i) => (
          <li key={label} className="flex-1">
            <div className={`h-1.5 rounded-full ${i <= step ? "bg-emerald-600" : "bg-slate-200"}`} />
            <p className={`mt-1.5 text-xs font-medium ${i <= step ? "text-emerald-800" : "text-slate-400"}`}>{label}</p>
          </li>
        ))}
      </ol>

      <Card className="p-5 sm:p-7">
        {step === 0 && (
          <div className="space-y-4">
            <Input label="Job title" name="title" placeholder="e.g. Weekend Barista" value={form.title as string} onChange={(e) => set("title", e.target.value)} error={errors.title} maxLength={120} />
            <div className="grid gap-4 sm:grid-cols-2">
              <Select label="Category" name="categoryId" value={form.categoryId as string} onChange={(e) => set("categoryId", e.target.value)} options={[{ value: "", label: "Select category" }, ...taxonomy.categories.map((c) => ({ value: c.id, label: c.name }))]} />
              <Select label="Job type" name="jobType" value={form.jobType as string} onChange={(e) => set("jobType", e.target.value)} options={JOB_TYPES.map(([v, l]) => ({ value: v, label: l }))} />
              <Select label="Work arrangement" name="workArrangement" value={form.workArrangement as string} onChange={(e) => set("workArrangement", e.target.value)} options={ARRANGEMENTS.map(([v, l]) => ({ value: v, label: l }))} />
              <Select label="Location" name="locationId" value={form.locationId as string} onChange={(e) => set("locationId", e.target.value)} options={[{ value: "", label: "Select location" }, ...taxonomy.locations.map((l) => ({ value: l.id, label: l.name }))]} hint={form.workArrangement === "REMOTE" ? "Remote jobs still need a base city for search." : undefined} />
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <Textarea label="Job description" name="description" rows={6} placeholder="What will the student actually do day to day? Who is this ideal for?" value={form.description as string} onChange={(e) => set("description", e.target.value)} error={errors.description} hint="Minimum 50 characters. Be specific — students apply more when they know what to expect." />
            <Textarea label="Responsibilities (optional)" name="responsibilities" rows={3} value={form.responsibilities as string} onChange={(e) => set("responsibilities", e.target.value)} />
            <Textarea label="Requirements (optional)" name="requirements" rows={3} placeholder="e.g. Must be available on weekends, basic English…" value={form.requirements as string} onChange={(e) => set("requirements", e.target.value)} />
            <Textarea label="Benefits (optional)" name="benefits" rows={2} placeholder="e.g. Free meals during shift, training certificate…" value={form.benefits as string} onChange={(e) => set("benefits", e.target.value)} />
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div>
              <p className="mb-1.5 text-sm font-medium text-slate-700">Work schedule</p>
              <div className="flex flex-wrap gap-2">
                {SCHEDULES.map(([v, l]) => (
                  <button key={v} type="button" onClick={() => toggleSchedule(v)} aria-pressed={(form.schedules as string[]).includes(v)}
                    className={`min-h-[44px] rounded-lg border px-4 text-sm font-medium ${(form.schedules as string[]).includes(v) ? "border-emerald-600 bg-emerald-50 text-emerald-800" : "border-slate-300 text-slate-600"}`}>{l}</button>
                ))}
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <Select label="Pay type" name="salaryType" value={form.salaryType as string} onChange={(e) => set("salaryType", e.target.value)} options={SALARY_TYPES.map(([v, l]) => ({ value: v, label: l }))} />
              {form.salaryType !== "NEGOTIABLE" && (
                <>
                  <Input label={`Min pay (NPR ${salaryLabel})`} name="salaryMin" type="number" min={0} value={form.salaryMin as string} onChange={(e) => set("salaryMin", e.target.value)} error={errors.salaryMin} />
                  <Input label={`Max pay (NPR ${salaryLabel})`} name="salaryMax" type="number" min={0} value={form.salaryMax as string} onChange={(e) => set("salaryMax", e.target.value)} error={errors.salaryMax} />
                </>
              )}
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Input label="Number of openings" name="openings" type="number" min={1} max={500} value={String(form.openings)} onChange={(e) => set("openings", e.target.value)} />
              <Input label="Application deadline (optional)" name="deadline" type="date" value={form.deadline as string} onChange={(e) => set("deadline", e.target.value)} />
            </div>
            <Input label="Required skills (optional)" name="skills" placeholder="e.g. Communication, MS Excel, Driving" value={form.skills as string} onChange={(e) => set("skills", e.target.value)} hint="Comma-separated. Skills help match the right students." />
          </div>
        )}

        {step === 3 && (
          <div className="space-y-3 text-sm">
            <h3 className="text-base font-bold text-slate-900">Review your job post</h3>
            <dl className="divide-y divide-slate-100 rounded-lg border border-slate-200">
              {[
                ["Title", form.title as string],
                ["Type", JOB_TYPES.find(([v]) => v === form.jobType)?.[1]],
                ["Arrangement", ARRANGEMENTS.find(([v]) => v === form.workArrangement)?.[1]],
                ["Location", taxonomy.locations.find((l) => l.id === form.locationId)?.name || "—"],
                ["Schedule", (form.schedules as string[]).map((s) => SCHEDULES.find(([v]) => v === s)?.[1]).join(", ") || "—"],
                ["Pay", form.salaryType === "NEGOTIABLE" ? "Negotiable" : `NPR ${form.salaryMin}–${form.salaryMax} ${salaryLabel}`],
                ["Openings", String(form.openings)],
              ].map(([k, v]) => (
                <div key={k} className="flex gap-4 px-4 py-2.5"><dt className="w-28 shrink-0 font-medium text-slate-500">{k}</dt><dd className="text-slate-900">{v}</dd></div>
              ))}
            </dl>
            <p className="rounded-lg bg-slate-50 p-3 text-slate-600">Your job will be reviewed by our team (usually within a few hours) before it goes live. You’ll be notified once it’s published.</p>
          </div>
        )}

        <div className="mt-6 flex justify-between gap-3">
          <Button variant="secondary" onClick={back} disabled={step === 0 || saving}>Back</Button>
          {step < STEPS.length - 1 ? (
            <Button onClick={next}>Continue</Button>
          ) : (
            <Button onClick={submit} loading={saving}>{initial?.id ? "Update & resubmit" : "Submit for review"}</Button>
          )}
        </div>
      </Card>
    </div>
  );
}
