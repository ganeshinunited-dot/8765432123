"use client";

import { useMemo, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SARKARI_JOBS, SARKARI_UPDATED, type SarkariCategory, type SarkariJob } from "@/data/sarkariJobs";

const CATEGORY_LABELS: Record<SarkariCategory, string> = {
  psc: "PSC",
  security: "Security",
  health: "Health",
  education: "Education",
  local: "Local Level",
  bank: "Bank",
  enterprise: "Enterprise",
  other: "Other",
};

function todayISO(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function daysLeft(deadline: string): number {
  const [y, m, d] = deadline.split("-").map(Number);
  const target = new Date(y, m - 1, d);
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return Math.round((target.getTime() - now.getTime()) / 86400000);
}

function deadlineBadge(n: number): { text: string; cls: string } {
  if (n <= 0) return { text: "Last day today", cls: "bg-red-100 text-red-800" };
  if (n === 1) return { text: "1 day left", cls: "bg-red-100 text-red-800" };
  if (n <= 7) return { text: `${n} days left`, cls: "bg-amber-100 text-amber-900" };
  return { text: `${n} days left`, cls: "bg-emerald-100 text-emerald-900" };
}

function JobCard({ job }: { job: SarkariJob }) {
  const n = daysLeft(job.deadline);
  const badge = deadlineBadge(n);
  return (
    <article className="h-full rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">{job.organization}</p>
      <h3 className="mt-1 text-base font-bold text-slate-900">{job.postTitle}</h3>
      <div className="mt-2 flex flex-wrap gap-1.5 text-xs">
        {job.level && <span className="rounded-full bg-slate-100 px-2 py-0.5 text-slate-700">{job.level}</span>}
        {job.seats != null && <span className="rounded-full bg-slate-100 px-2 py-0.5 text-slate-700">{job.seats} seats</span>}
        {job.minQualification && <span className="rounded-full bg-slate-100 px-2 py-0.5 text-slate-700">{job.minQualification}</span>}
        {job.location && <span className="rounded-full bg-slate-100 px-2 py-0.5 text-slate-700">{job.location}</span>}
        <span className={`rounded-full px-2 py-0.5 font-semibold ${badge.cls}`}>{badge.text} • {job.deadline}</span>
      </div>
      <div className="mt-3 flex items-center gap-3">
        <a
          href={job.noticeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="gx-btn gx-btn-primary rounded-lg px-3.5 py-1.5 text-sm font-semibold text-emerald-50"
        >
          View notice
        </a>
        {job.sourceUrl && job.sourceUrl !== job.noticeUrl && (
          <a href={job.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-slate-500 underline hover:text-emerald-700">
            Source
          </a>
        )}
      </div>
    </article>
  );
}

export default function SarkariBrowser() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<"all" | SarkariCategory>("all");
  const today = todayISO();

  const categories = useMemo(() => {
    const counts = new Map<SarkariCategory, number>();
    for (const j of SARKARI_JOBS) {
      if (j.deadline >= today) counts.set(j.category, (counts.get(j.category) ?? 0) + 1);
    }
    return [...counts.entries()].sort((a, b) => b[1] - a[1]);
  }, [today]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return SARKARI_JOBS.filter((j) => {
      if (j.deadline < today) return false;
      if (cat !== "all" && j.category !== cat) return false;
      if (!q) return true;
      return `${j.organization} ${j.postTitle} ${j.location ?? ""} ${j.minQualification ?? ""}`.toLowerCase().includes(q);
    }).sort((a, b) => (a.deadline < b.deadline ? -1 : a.deadline > b.deadline ? 1 : 0));
  }, [query, cat, today]);

  return (
    <div>
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
        These are informational notices only — not posted by Growentix. Please apply through the official notice. Notices with the nearest deadlines appear first.
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search… (e.g. nurse, police, sarlahi)"
          className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-emerald-600 sm:max-w-sm"
        />
        <p className="text-sm text-slate-600">
          <span className="font-bold text-slate-900">{filtered.length}</span> notices • Updated {SARKARI_UPDATED}
        </p>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <button
          onClick={() => setCat("all")}
          className={`rounded-full px-3.5 py-1.5 text-sm font-medium ${cat === "all" ? "gx-btn gx-btn-dark text-white" : "border border-slate-300 bg-white text-slate-700"}`}
        >
          All
        </button>
        {categories.map(([c, n]) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`rounded-full px-3.5 py-1.5 text-sm font-medium ${cat === c ? "gx-btn gx-btn-dark text-white" : "border border-slate-300 bg-white text-slate-700"}`}
          >
            {CATEGORY_LABELS[c]} ({n})
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-8 text-center text-sm text-slate-500">Nothing found — try a different keyword.</p>
      ) : (
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((j, i) => (
            <Reveal key={j.id} delay={Math.min(i % 9, 8) * 50} className="h-full">
              <JobCard job={j} />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
