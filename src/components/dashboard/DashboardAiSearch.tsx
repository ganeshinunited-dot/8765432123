"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface AiJob {
  slug: string;
  title: string;
  company: string;
  verified: boolean;
  location: string | null;
}

interface AiCourse {
  slug: string;
  title: string;
  price: number;
  category: string | null;
  thumbnailUrl: string | null;
}

interface AiResult {
  source: "ai" | "smart";
  message: string;
  jobs: AiJob[];
  courses: AiCourse[];
}

const EXAMPLES = ["Evening part-time job in Kathmandu", "Video editing course", "Remote internship", "AI sikne course"];

export function DashboardAiSearch() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<AiResult | null>(null);

  async function search(q: string) {
    const text = q.trim();
    if (text.length < 3) { setError("Type a few words — a job or a course you want."); return; }
    setLoading(true); setError(""); setResult(null);
    try {
      const res = await fetch("/api/ai/learn-search", {
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
    <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5" aria-label="AI learning and job assistant">
      <div className="flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-700 text-white" aria-hidden="true">
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l1.9 5.6L19.5 9l-5.6 1.9L12 16.5l-1.9-5.6L4.5 9l5.6-1.4L12 2zM19 14l.9 2.6 2.6.9-2.6.9L19 21l-.9-2.6-2.6-.9 2.6-.9L19 14zM5 15l.8 2.2 2.2.8-2.2.8L5 21l-.8-2.2L2 18l2.2-.8L5 15z" /></svg>
        </span>
        <h2 className="text-base font-bold text-slate-900">AI Assistant</h2>
        <span className="rounded-full bg-emerald-700 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-white">Jobs + Courses</span>
      </div>
      <p className="mt-1 text-sm text-slate-500">Describe what you want in your own words — I&apos;ll find matching jobs and courses.</p>

      <form
        className="mt-3 flex gap-2"
        onSubmit={(e) => { e.preventDefault(); search(query); }}
      >
        <label htmlFor="dash-ai-q" className="sr-only">Ask the AI assistant</label>
        <input
          id="dash-ai-q"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. evening job in Lalitpur, or video editing course"
          className="h-11 min-w-0 flex-1 rounded-lg border border-slate-300 px-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/30"
        />
        <button
          type="submit"
          disabled={loading}
          className="h-11 shrink-0 rounded-lg bg-emerald-700 px-5 text-sm font-semibold text-white hover:bg-emerald-800 disabled:opacity-60"
        >
          {loading ? "Searching…" : "Ask AI"}
        </button>
      </form>

      <div className="mt-2.5 flex flex-wrap gap-1.5">
        {EXAMPLES.map((ex) => (
          <button
            key={ex}
            type="button"
            onClick={() => { setQuery(ex); search(ex); }}
            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600 hover:border-emerald-400 hover:text-emerald-800"
          >
            {ex}
          </button>
        ))}
      </div>

      {error && <p className="mt-3 rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p>}

      {result && (
        <div className="mt-4 space-y-4">
          <p className="text-sm text-slate-600">
            {result.message}
            <span className="ml-2 rounded bg-slate-100 px-1.5 py-0.5 text-[11px] font-medium text-slate-500">
              {result.source === "ai" ? "AI" : "Smart match"}
            </span>
          </p>

          {result.jobs.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-slate-900">Jobs</h3>
              <ul className="mt-2 divide-y divide-slate-100 rounded-lg border border-slate-200">
                {result.jobs.map((j) => (
                  <li key={j.slug}>
                    <Link href={`/jobs/${j.slug}`} className="flex items-center justify-between gap-3 px-4 py-3 hover:bg-slate-50">
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-semibold text-slate-900">{j.title}</span>
                        <span className="block truncate text-xs text-slate-500">
                          {j.company}{j.verified ? " ✓" : ""}{j.location ? ` · ${j.location}` : ""}
                        </span>
                      </span>
                      <span className="shrink-0 text-sm font-semibold text-emerald-700">Apply →</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {result.courses.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-slate-900">Courses</h3>
              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                {result.courses.map((c) => (
                  <Link key={c.slug} href={`/courses/${c.slug}`} className="flex items-center gap-3 rounded-lg border border-slate-200 p-2.5 hover:border-emerald-400">
                    <span className="relative h-12 w-20 shrink-0 overflow-hidden rounded-md bg-slate-900">
                      {c.thumbnailUrl ? (
                        <Image src={c.thumbnailUrl} alt="" fill sizes="80px" className="object-cover" unoptimized />
                      ) : (
                        <span className="flex h-full w-full items-center justify-center text-white">
                          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13l11-6.5z" /></svg>
                        </span>
                      )}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold text-slate-900">{c.title}</span>
                      <span className={`mt-0.5 inline-block rounded px-1.5 py-0.5 text-[10px] font-bold uppercase ${c.price === 0 ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-600"}`}>
                        {c.price === 0 ? "Free" : `NPR ${c.price.toLocaleString()}`}
                      </span>
                    </span>
                    <span className="shrink-0 text-sm font-semibold text-emerald-700">Learn →</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
