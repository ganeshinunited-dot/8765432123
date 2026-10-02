"use client";

import Link from "next/link";
import { useState } from "react";
import { formatSalary } from "@/lib/format";

interface AiJob {
  id: string;
  slug: string;
  title: string;
  company: string;
  verified: boolean;
  location: string | null;
  jobType: string;
  salaryMin: number | null;
  salaryMax: number | null;
  salaryType: string;
}

interface AiResult {
  source: "ai" | "smart";
  message: string;
  jobs: AiJob[];
  allJobsUrl: string;
}

const EXAMPLES = ["Evening part-time job in Kathmandu", "Remote internship for students", "Weekend barista job", "Ghar bata garna milne job"];

export function AiJobSearch() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<AiResult | null>(null);

  async function search(q: string) {
    const text = q.trim();
    if (text.length < 3) { setError("Type a few words about the job you want."); return; }
    setLoading(true); setError(""); setResult(null);
    try {
      const res = await fetch("/api/ai/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: text }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Search failed. Try again.");
      setResult(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Search failed. Try again.");
    } finally { setLoading(false); }
  }

  return (
    <section className="rounded-2xl border-2 border-emerald-600/70 bg-gradient-to-br from-emerald-50 via-white to-amber-50 p-4 shadow-sm sm:p-5" aria-label="AI job assistant">
      <div className="flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-700 text-white" aria-hidden="true">
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l1.9 5.6L19.5 9l-5.6 1.9L12 16.5l-1.9-5.6L4.5 9l5.6-1.4L12 2zM19 14l.9 2.6 2.6.9-2.6.9L19 21l-.9-2.6-2.6-.9 2.6-.9L19 14zM5 15l.8 2.2 2.2.8-2.2.8L5 21l-.8-2.2L2 18l2.2-.8L5 15z"/></svg>
        </span>
        <h2 className="text-base font-bold text-slate-900">AI Job Assistant</h2>
        <span className="rounded-full bg-emerald-700 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-white">New</span>
      </div>
      <p className="mt-1.5 text-sm text-slate-600">Describe your ideal job in your own words — English or Nepali mix — and AI finds matching live jobs instantly.</p>

      <form className="mt-3 flex gap-2" onSubmit={(e) => { e.preventDefault(); search(query); }}>
        <label className="sr-only" htmlFor="ai-search-input">Describe the job you want</label>
        <input
          id="ai-search-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. Malai sanjha ko part-time job chahiyo Kathmandu ma…"
          className="h-12 flex-1 rounded-xl border border-slate-300 bg-white px-3.5 text-[15px] text-slate-900 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/25"
          maxLength={300}
        />
        <button type="submit" disabled={loading} className="h-12 shrink-0 rounded-xl bg-emerald-700 px-4 text-sm font-semibold text-white hover:bg-emerald-800 disabled:opacity-60 sm:px-6">
          {loading ? "Searching…" : "Ask AI"}
        </button>
      </form>

      <div className="mt-2.5 flex flex-wrap gap-1.5">
        {EXAMPLES.map((ex) => (
          <button key={ex} type="button" onClick={() => { setQuery(ex); search(ex); }} className="rounded-full border border-emerald-200 bg-white px-2.5 py-1 text-xs font-medium text-emerald-800 hover:bg-emerald-50">
            {ex}
          </button>
        ))}
      </div>

      {error && <p className="mt-3 rounded-lg bg-rose-50 px-3 py-2 text-sm font-medium text-rose-700" role="alert">{error}</p>}

      {result && (
        <div className="mt-4">
          <p className="flex flex-wrap items-center gap-2 text-sm font-medium text-slate-800">
            {result.message}
            <span className="rounded-full bg-slate-900 px-2 py-0.5 text-[11px] font-semibold text-white">{result.source === "ai" ? "AI Engine" : "Smart Search"}</span>
          </p>
          {result.jobs.length > 0 && (
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {result.jobs.map((j) => (
                <li key={j.id}>
                  <Link href={`/jobs/${j.slug}`} className="block h-full rounded-xl border border-slate-200 bg-white p-3.5 transition hover:border-emerald-400 hover:shadow">
                    <span className="flex items-start justify-between gap-2">
                      <span className="font-semibold text-slate-900">{j.title}</span>
                      <span className="shrink-0 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-800">{j.jobType}</span>
                    </span>
                    <span className="mt-1 block text-sm text-slate-600">
                      {j.company}{j.verified ? " · ✓ Verified" : ""}{j.location ? ` · ${j.location}` : ""}
                    </span>
                    <span className="mt-1 block text-sm font-medium text-emerald-800">{formatSalary(j.salaryMin, j.salaryMax, j.salaryType)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
          <Link href={result.allJobsUrl} className="mt-3 inline-block text-sm font-semibold text-emerald-700 hover:underline">
            View all matching jobs →
          </Link>
        </div>
      )}
    </section>
  );
}
