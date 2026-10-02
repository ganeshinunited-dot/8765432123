"use client";

import { useState } from "react";
import { Input, Textarea, Select } from "@/components/ui/fields";
import { Button } from "@/components/ui/Button";
import { Alert, Card } from "@/components/ui/primitives";
import { useToast } from "@/components/ui/Toast";

const DAYS = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
const SLOTS = ["morning", "afternoon", "evening"];
const JOB_TYPES = ["PART_TIME", "FULL_TIME", "INTERNSHIP", "TEMPORARY", "CONTRACT"];
const SCHEDULES = ["MORNING", "AFTERNOON", "EVENING", "WEEKEND"];

interface StudentSkillItem {
  skill: { name: string };
  level?: string | null;
}

interface ProfileInitial {
  headline?: string | null;
  bio?: string | null;
  locationId?: string | null;
  educationLevel?: string | null;
  college?: string | null;
  languages?: string[];
  availability?: Record<string, string[]>;
  preferredJobTypes?: string[];
  preferredSchedules?: string[];
  preferredArrangement?: string | null;
  expectedSalaryMin?: number | null;
  expectedSalaryMax?: number | null;
  salaryType?: string | null;
  portfolioLinks?: { label: string; url: string }[];
  cvFileId?: string | null;
  skills?: StudentSkillItem[];
}

interface Props {
  initial: ProfileInitial;
  locations: { id: string; name: string }[];
}

export function ProfileForm({ initial, locations }: Props) {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [availability, setAvailability] = useState<Record<string, string[]>>(
    (initial.availability as Record<string, string[]>) || {}
  );
  const [skills, setSkills] = useState<{ name: string; level: string }[]>(
    (initial.skills || []).map((s: StudentSkillItem) => ({ name: s.skill.name, level: s.level || "" }))
  );
  const [skillInput, setSkillInput] = useState("");
  const [links, setLinks] = useState<{ label: string; url: string }[]>(initial.portfolioLinks || []);
  const [photoId, setPhotoId] = useState<string>("");
  const [cvId, setCvId] = useState<string>("");
  const [uploading, setUploading] = useState("");

  function toggleAvail(day: string, slot: string) {
    setAvailability((prev) => {
      const cur = prev[day] || [];
      return { ...prev, [day]: cur.includes(slot) ? cur.filter((s) => s !== slot) : [...cur, slot] };
    });
  }

  async function uploadFile(file: File, purpose: "PHOTO" | "CV") {
    setUploading(purpose);
    const fd = new FormData();
    fd.append("file", file);
    fd.append("purpose", purpose);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const data = await res.json();
    setUploading("");
    if (!res.ok) {
      toast.push(data.error || "Upload failed.", "error");
      return;
    }
    if (purpose === "PHOTO") setPhotoId(data.fileId);
    else setCvId(data.fileId);
    toast.push("File uploaded.", "success");
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const getAll = (name: string) => fd.getAll(name).map(String);

    const payload = {
      headline: fd.get("headline"),
      bio: fd.get("bio"),
      locationId: fd.get("locationId"),
      educationLevel: fd.get("educationLevel"),
      college: fd.get("college"),
      languages: String(fd.get("languages") || "").split(",").map((s) => s.trim()).filter(Boolean),
      availability,
      customAvailability: fd.get("customAvailability"),
      preferredJobTypes: getAll("jobTypes"),
      preferredSchedules: getAll("schedules"),
      preferredArrangement: fd.get("preferredArrangement") || "",
      expectedSalaryMin: fd.get("salaryMin") ? Number(fd.get("salaryMin")) : undefined,
      expectedSalaryMax: fd.get("salaryMax") ? Number(fd.get("salaryMax")) : undefined,
      salaryType: fd.get("salaryType") || "",
      skills,
      portfolioLinks: links.filter((l) => l.url),
      photoUrl: photoId || undefined,
      cvFileId: cvId || undefined,
    };

    const res = await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) {
      setError(data.error || "Something went wrong.");
      return;
    }
    toast.push(`Profile saved — ${data.completion}% complete.`, "success");
    window.location.reload();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {error && <Alert tone="rose">{error}</Alert>}

      <Card className="p-5 sm:p-6">
        <h2 className="text-base font-semibold text-slate-900">Basic information</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Profile photo</label>
            <div className="flex items-center gap-3">
              <input
                type="file" accept="image/jpeg,image/png,image/webp"
                onChange={(e) => e.target.files?.[0] && uploadFile(e.target.files[0], "PHOTO")}
                className="text-sm text-slate-600 file:mr-3 file:rounded-lg file:border file:border-slate-300 file:bg-white file:px-4 file:py-2.5 file:text-sm file:font-semibold hover:file:bg-slate-50"
              />
              {uploading === "PHOTO" && <span className="text-sm text-slate-500">Uploading…</span>}
              {photoId && <span className="text-sm font-medium text-emerald-700">Uploaded ✓</span>}
            </div>
          </div>
          <div className="sm:col-span-2">
            <Input name="headline" label="Headline" defaultValue={initial.headline || ""} placeholder="e.g. BBA student & part-time social media assistant" maxLength={120} />
          </div>
          <div className="sm:col-span-2">
            <Textarea name="bio" label="Bio" rows={4} defaultValue={initial.bio || ""} placeholder="Tell employers about yourself…" maxLength={2000} />
          </div>
          <Select name="locationId" label="Location" defaultValue={initial.locationId || ""}
            options={[{ value: "", label: "Select location" }, ...locations.map((l) => ({ value: l.id, label: l.name }))]} />
          <Input name="educationLevel" label="Education level" defaultValue={initial.educationLevel || ""} placeholder="e.g. Bachelor's running" maxLength={100} />
          <div className="sm:col-span-2">
            <Input name="college" label="College / University" defaultValue={initial.college || ""} placeholder="e.g. Tribhuvan University" maxLength={200} />
          </div>
          <div className="sm:col-span-2">
            <Input name="languages" label="Languages (comma separated)" defaultValue={(initial.languages || []).join(", ")} placeholder="Nepali, English, Hindi" />
          </div>
        </div>
      </Card>

      <Card className="p-5 sm:p-6">
        <h2 className="text-base font-semibold text-slate-900">Availability</h2>
        <p className="mt-1 text-sm text-slate-500">When are you free to work?</p>
        <div className="mt-4 space-y-2">
          {DAYS.map((day) => (
            <div key={day} className="flex flex-wrap items-center gap-2 rounded-lg bg-slate-50 px-3 py-2">
              <span className="w-24 text-sm font-medium capitalize text-slate-700">{day}</span>
              {SLOTS.map((slot) => (
                <label key={slot} className="flex min-h-[40px] cursor-pointer items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 text-sm capitalize text-slate-700 has-[:checked]:border-emerald-600 has-[:checked]:bg-emerald-50">
                  <input
                    type="checkbox"
                    checked={(availability[day] || []).includes(slot)}
                    onChange={() => toggleAvail(day, slot)}
                    className="h-4 w-4 accent-emerald-700"
                  />
                  {slot}
                </label>
              ))}
            </div>
          ))}
        </div>
        <div className="mt-3">
          <Textarea name="customAvailability" label="Custom availability notes (optional)" rows={2} placeholder="e.g. Monday 4 PM – 9 PM; Saturday 10 AM – 6 PM" maxLength={500} />
        </div>
      </Card>

      <Card className="p-5 sm:p-6">
        <h2 className="text-base font-semibold text-slate-900">Job preferences</h2>
        <div className="mt-4 space-y-4">
          <fieldset>
            <legend className="mb-2 text-sm font-medium text-slate-700">Preferred job types</legend>
            <div className="flex flex-wrap gap-2">
              {JOB_TYPES.map((t) => (
                <label key={t} className="flex min-h-[44px] cursor-pointer items-center gap-2 rounded-lg border border-slate-200 px-3.5 text-sm text-slate-700 has-[:checked]:border-emerald-600 has-[:checked]:bg-emerald-50">
                  <input type="checkbox" name="jobTypes" value={t} defaultChecked={(initial.preferredJobTypes || []).includes(t)} className="h-4 w-4 accent-emerald-700" />
                  {t.replace("_", " ").toLowerCase().replace(/^\w/, (c) => c.toUpperCase())}
                </label>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend className="mb-2 text-sm font-medium text-slate-700">Preferred schedules</legend>
            <div className="flex flex-wrap gap-2">
              {SCHEDULES.map((s) => (
                <label key={s} className="flex min-h-[44px] cursor-pointer items-center gap-2 rounded-lg border border-slate-200 px-3.5 text-sm capitalize text-slate-700 has-[:checked]:border-emerald-600 has-[:checked]:bg-emerald-50">
                  <input type="checkbox" name="schedules" value={s} defaultChecked={(initial.preferredSchedules || []).includes(s)} className="h-4 w-4 accent-emerald-700" />
                  {s.toLowerCase()}
                </label>
              ))}
            </div>
          </fieldset>
          <div className="grid gap-4 sm:grid-cols-3">
            <Select name="preferredArrangement" label="Work arrangement" defaultValue={initial.preferredArrangement || ""}
              options={[{ value: "", label: "No preference" }, { value: "ON_SITE", label: "On-site" }, { value: "REMOTE", label: "Remote" }, { value: "HYBRID", label: "Hybrid" }]} />
            <Select name="salaryType" label="Expected salary type" defaultValue={initial.salaryType || ""}
              options={[{ value: "", label: "Not specified" }, { value: "HOURLY", label: "Hourly" }, { value: "DAILY", label: "Daily" }, { value: "WEEKLY", label: "Weekly" }, { value: "MONTHLY", label: "Monthly" }]} />
            <div />
            <Input name="salaryMin" label="Expected min (Rs.)" type="number" min={0} defaultValue={initial.expectedSalaryMin || ""} />
            <Input name="salaryMax" label="Expected max (Rs.)" type="number" min={0} defaultValue={initial.expectedSalaryMax || ""} />
          </div>
        </div>
      </Card>

      <Card className="p-5 sm:p-6">
        <h2 className="text-base font-semibold text-slate-900">Skills</h2>
        <div className="mt-3 flex gap-2">
          <input
            value={skillInput} onChange={(e) => setSkillInput(e.target.value)}
            placeholder="e.g. Canva, Data entry…"
            className="h-11 flex-1 rounded-lg border border-slate-300 px-3.5 text-[15px] focus:border-emerald-600 focus:outline-none"
            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); if (skillInput.trim()) { setSkills([...skills, { name: skillInput.trim(), level: "" }]); setSkillInput(""); } } }}
          />
          <button type="button" onClick={() => { if (skillInput.trim()) { setSkills([...skills, { name: skillInput.trim(), level: "" }]); setSkillInput(""); } }}
            className="h-11 rounded-lg bg-slate-900 px-5 text-sm font-semibold text-white">Add</button>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {skills.map((s, i) => (
            <span key={i} className="inline-flex items-center gap-2 rounded-full bg-slate-100 py-1.5 pl-3.5 pr-2 text-sm">
              {s.name}
              <button type="button" aria-label={`Remove ${s.name}`} onClick={() => setSkills(skills.filter((_, j) => j !== i))}
                className="flex h-6 w-6 items-center justify-center rounded-full text-slate-500 hover:bg-slate-200">×</button>
            </span>
          ))}
          {skills.length === 0 && <p className="text-sm text-slate-500">No skills added yet.</p>}
        </div>
      </Card>

      <Card className="p-5 sm:p-6">
        <h2 className="text-base font-semibold text-slate-900">CV / Resume</h2>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <input
            type="file" accept=".pdf,.doc,.docx"
            onChange={(e) => e.target.files?.[0] && uploadFile(e.target.files[0], "CV")}
            className="text-sm text-slate-600 file:mr-3 file:rounded-lg file:border file:border-slate-300 file:bg-white file:px-4 file:py-2.5 file:text-sm file:font-semibold hover:file:bg-slate-50"
          />
          {uploading === "CV" && <span className="text-sm text-slate-500">Uploading…</span>}
          {cvId && <span className="text-sm font-medium text-emerald-700">Uploaded ✓</span>}
          {initial.cvFileId && !cvId && <span className="text-sm text-slate-500">Current CV on file.</span>}
        </div>
        <p className="mt-2 text-xs text-slate-500">PDF, DOC or DOCX, max 5 MB. Only you, employers you applied to, and admins can view it.</p>
      </Card>

      <Card className="p-5 sm:p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-slate-900">Portfolio links</h2>
          <button type="button" onClick={() => setLinks([...links, { label: "", url: "" }])} className="text-sm font-semibold text-emerald-700 hover:underline">+ Add link</button>
        </div>
        <div className="mt-3 space-y-2">
          {links.map((l, i) => (
            <div key={i} className="flex gap-2">
              <input value={l.label} onChange={(e) => setLinks(links.map((x, j) => j === i ? { ...x, label: e.target.value } : x))}
                placeholder="Label" className="h-11 w-1/3 rounded-lg border border-slate-300 px-3.5 text-[15px]" />
              <input value={l.url} onChange={(e) => setLinks(links.map((x, j) => j === i ? { ...x, url: e.target.value } : x))}
                placeholder="https://" className="h-11 flex-1 rounded-lg border border-slate-300 px-3.5 text-[15px]" />
              <button type="button" aria-label="Remove link" onClick={() => setLinks(links.filter((_, j) => j !== i))}
                className="flex h-11 w-11 items-center justify-center rounded-lg border border-slate-300 text-slate-500">×</button>
            </div>
          ))}
          {links.length === 0 && <p className="text-sm text-slate-500">No links added.</p>}
        </div>
      </Card>

      <Button type="submit" size="lg" loading={loading} className="w-full sm:w-auto">Save profile</Button>
    </form>
  );
}
