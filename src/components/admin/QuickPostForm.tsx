"use client";

import { useRef, useState } from "react";
import { ARTICLE_CATEGORIES, articleCategoryLabel } from "@/lib/articles";

interface Draft {
  category: string;
  country: string | null;
  titleEn: string;
  titleNe: string;
  excerptEn: string;
  excerptNe: string;
  bodyEn: string;
  bodyNe: string;
  sources: string[];
}

const inputCls =
  "w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-[15px] text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none";
const labelCls = "mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500";

export function QuickPostForm() {
  const [newsUrl, setNewsUrl] = useState("");
  const [topic, setTopic] = useState("");
  const [category, setCategory] = useState("auto");
  const [draft, setDraft] = useState<Draft | null>(null);
  const [researched, setResearched] = useState<{ title: string; publisher: string; link: string } | null>(null);
  const [dupeSlug, setDupeSlug] = useState("");
  const [generating, setGenerating] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [error, setError] = useState("");
  const [publishedSlug, setPublishedSlug] = useState("");
  const publishingRef = useRef(false);

  async function generate() {
    if (!newsUrl.trim() && !topic.trim()) {
      setError("Paste a news URL or write a topic.");
      return;
    }
    setGenerating(true);
    setError("");
    setDupeSlug("");
    setDraft(null);
    setResearched(null);
    try {
      const res = await fetch("/api/admin/articles/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: topic.trim(), url: newsUrl.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Generation failed.");
      setDraft(data.draft);
      setResearched(data.researched ?? null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Generation failed.");
    } finally {
      setGenerating(false);
    }
  }

  async function publish() {
    if (!draft || publishingRef.current) return;
    publishingRef.current = true;
    setPublishing(true);
    setError("");
    setDupeSlug("");
    try {
      const res = await fetch("/api/admin/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...draft,
          category: category === "auto" ? draft.category : category,
          sources: draft.sources,
        }),
      });
      const data = await res.json();
      if (res.status === 409) {
        setDupeSlug(data.existingSlug ?? "");
        throw new Error(data.error || "A similar article already exists.");
      }
      if (!res.ok) throw new Error(data.error || "Publish failed.");
      setPublishedSlug(data.article?.slug ?? data.slug ?? "");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Publish failed.");
    } finally {
      setPublishing(false);
      publishingRef.current = false;
    }
  }

  function reset() {
    setNewsUrl("");
    setTopic("");
    setCategory("auto");
    setDraft(null);
    setResearched(null);
    setDupeSlug("");
    setError("");
    setPublishedSlug("");
  }

  if (publishedSlug) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center">
        <p className="text-2xl">✅</p>
        <p className="mt-2 text-lg font-bold text-slate-900">Published!</p>
        <p className="mt-1 text-sm text-slate-600">Your news is live on Growentix.</p>
        <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href={`/articles/${publishedSlug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-emerald-600 px-5 py-3 text-sm font-bold text-white"
          >
            View live article →
          </a>
          <button
            type="button"
            onClick={reset}
            className="rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-700"
          >
            Post another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <p className="text-sm text-slate-600">
        Paste a news link or write a topic — AI writes the full bilingual article, you tap Publish. No code, no long form.
      </p>

      <div className="mt-6 space-y-4">
        <div>
          <label htmlFor="qp-url" className={labelCls}>News URL (optional)</label>
          <input
            id="qp-url"
            type="url"
            value={newsUrl}
            onChange={(e) => setNewsUrl(e.target.value)}
            placeholder="https://example.com/job-news…"
            className={inputCls}
          />
        </div>
        <div>
          <label htmlFor="qp-topic" className={labelCls}>Or topic</label>
          <input
            id="qp-topic"
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. Gulf companies hiring Nepali nurses"
            className={inputCls}
          />
        </div>
        <div>
          <label htmlFor="qp-category" className={labelCls}>Category</label>
          <select id="qp-category" value={category} onChange={(e) => setCategory(e.target.value)} className={inputCls}>
            <option value="auto">Auto (AI decides)</option>
            {ARTICLE_CATEGORIES.map((c) => (
              <option key={c.slug} value={c.slug}>{c.label}</option>
            ))}
          </select>
        </div>
        <button
          type="button"
          onClick={generate}
          disabled={generating}
          className="w-full rounded-lg bg-emerald-600 px-5 py-3.5 text-[15px] font-bold text-white disabled:opacity-50"
        >
          {generating ? "Writing your article…" : "Generate draft"}
        </button>
      </div>

      {error && (
        <div className="mt-5 rounded-lg border border-red-200 bg-red-50 p-4">
          <p className="text-sm font-semibold text-red-800">{error}</p>
          {dupeSlug && (
            <a href={`/articles/${dupeSlug}`} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm font-bold text-red-700 underline">
              View the existing article →
            </a>
          )}
        </div>
      )}

      {draft && (
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5">
          {researched && (
            <p className="text-xs text-slate-500">
              Researched from: {researched.publisher ? `${researched.publisher} — ` : ""}
              <a href={researched.link} target="_blank" rel="noopener noreferrer" className="font-semibold text-emerald-700 underline">
                {researched.title}
              </a>
            </p>
          )}
          <p className="mt-3 inline-block rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
            {articleCategoryLabel(category === "auto" ? draft.category : category)}
            {draft.country ? ` · ${draft.country}` : ""}
          </p>
          <h2 className="mt-3 text-xl font-bold leading-snug text-slate-900">{draft.titleEn}</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">{draft.excerptEn}</p>
          <div className="mt-4 max-h-64 overflow-y-auto rounded-lg bg-slate-50 p-4 text-sm leading-relaxed text-slate-700">
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">Preview (English body, first part)</p>
            <div dangerouslySetInnerHTML={{ __html: draft.bodyEn.slice(0, 2500) }} />
            {draft.bodyEn.length > 2500 && <p className="mt-2 text-slate-400">…full article publishes with English + Nepali.</p>}
          </div>
          <button
            type="button"
            onClick={publish}
            disabled={publishing}
            className="mt-5 w-full rounded-lg bg-emerald-600 px-5 py-3.5 text-[15px] font-bold text-white disabled:opacity-50"
          >
            {publishing ? "Publishing…" : "Publish now"}
          </button>
          <p className="mt-3 text-center text-xs text-slate-500">
            Publishes immediately with English + Nepali. Need edits first? Use{" "}
            <a href="/admin/articles/new" className="font-bold text-emerald-700 underline">Full editor</a> instead.
          </p>
        </div>
      )}
    </div>
  );
}
