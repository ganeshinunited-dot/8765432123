"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ARTICLE_CATEGORIES } from "@/lib/articles";

export interface ArticleFormData {
  id?: string;
  slug?: string;
  category: string;
  country: string;
  titleEn: string;
  titleNe: string;
  excerptEn: string;
  excerptNe: string;
  bodyEn: string;
  bodyNe: string;
  sources: string;
}

const EMPTY: ArticleFormData = {
  category: "global",
  country: "",
  titleEn: "",
  titleNe: "",
  excerptEn: "",
  excerptNe: "",
  bodyEn: "",
  bodyNe: "",
  sources: "",
};

const inputCls =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none";
const labelCls = "mb-1 block text-xs font-bold uppercase tracking-wider text-slate-500";

export function ArticleForm({ initial }: { initial?: Partial<ArticleFormData> }) {
  const router = useRouter();
  const [form, setForm] = useState<ArticleFormData>({ ...EMPTY, ...initial });
  const [topic, setTopic] = useState("");
  const [newsUrl, setNewsUrl] = useState("");
  const [focusKeyword, setFocusKeyword] = useState("");
  const [generating, setGenerating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [researched, setResearched] = useState("");

  const set = (k: keyof ArticleFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((f) => ({ ...f, [k]: e.target.value }));

  async function generateDraft() {
    if (!topic.trim() && !newsUrl.trim()) {
      setError("Give a topic or a news URL to research.");
      return;
    }
    setGenerating(true);
    setError("");
    setResearched("");
    try {
      const res = await fetch("/api/admin/articles/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: topic.trim(),
          url: newsUrl.trim(),
          focusKeyword: focusKeyword.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Generation failed.");
      const d = data.draft;
      setForm((f) => ({
        ...f,
        category: d.category || f.category,
        country: d.country || "",
        titleEn: d.titleEn || "",
        titleNe: d.titleNe || "",
        excerptEn: d.excerptEn || "",
        excerptNe: d.excerptNe || "",
        bodyEn: d.bodyEn || "",
        bodyNe: d.bodyNe || "",
        sources: (d.sources || []).join("\n"),
      }));
      if (data.researched?.title) {
        setResearched(
          `Researched: ${data.researched.title}${data.researched.publisher ? ` — ${data.researched.publisher}` : ""}`
        );
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Generation failed.");
    } finally {
      setGenerating(false);
    }
  }

  async function publish() {
    if (!form.titleEn.trim() || !form.bodyEn.trim()) {
      setError("English title and body are required.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const payload = {
        ...form,
        sources: form.sources.split("\n").map((s) => s.trim()).filter(Boolean),
      };
      const url = form.id ? `/api/admin/articles/${form.id}` : "/api/admin/articles";
      const res = await fetch(url, {
        method: form.id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Publish failed.");
      router.push("/admin/articles");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Publish failed.");
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* AI draft */}
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
        <h2 className="text-sm font-bold text-emerald-900">Write with AI</h2>
        <p className="mt-1 text-xs text-emerald-800">
          Researches real news and drafts the article in English + Nepali. Review and edit before publishing.
        </p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <div>
            <label className={labelCls} htmlFor="af-topic">Topic</label>
            <input
              id="af-topic"
              className={inputCls}
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Qatar construction jobs for Nepali workers"
            />
          </div>
          <div>
            <label className={labelCls} htmlFor="af-url">Or news URL</label>
            <input
              id="af-url"
              className={inputCls}
              value={newsUrl}
              onChange={(e) => setNewsUrl(e.target.value)}
              placeholder="https://…"
            />
          </div>
        </div>
        <div className="mt-3">
          <label className={labelCls} htmlFor="af-kw">Focus keyword (SEO)</label>
          <input
            id="af-kw"
            className={inputCls}
            value={focusKeyword}
            onChange={(e) => setFocusKeyword(e.target.value)}
            placeholder="e.g. qatar jobs for nepali"
          />
        </div>
        <button
          type="button"
          onClick={generateDraft}
          disabled={generating}
          className="gx-btn gx-btn-primary mt-4 px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
        >
          {generating ? "Researching & writing…" : "Generate draft"}
        </button>
        {researched && <p className="mt-2 text-xs text-emerald-800">{researched}</p>}
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Fields */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className={labelCls} htmlFor="af-cat">Category</label>
          <select id="af-cat" className={inputCls} value={form.category} onChange={set("category")}>
            {ARTICLE_CATEGORIES.map((c) => (
              <option key={c.slug} value={c.slug}>{c.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelCls} htmlFor="af-country">Country (optional)</label>
          <input id="af-country" className={inputCls} value={form.country} onChange={set("country")} placeholder="e.g. Qatar" />
        </div>
        <div>
          <label className={labelCls} htmlFor="af-sources">Sources (one URL per line)</label>
          <textarea id="af-sources" className={inputCls} rows={1} value={form.sources} onChange={set("sources")} placeholder="https://…" />
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div>
          <label className={labelCls} htmlFor="af-te">Title — English</label>
          <input id="af-te" className={inputCls} value={form.titleEn} onChange={set("titleEn")} />
        </div>
        <div>
          <label className={labelCls} htmlFor="af-tn">Title — नेपाली</label>
          <input id="af-tn" className={inputCls} value={form.titleNe} onChange={set("titleNe")} />
        </div>
        <div>
          <label className={labelCls} htmlFor="af-ee">Excerpt — English</label>
          <textarea id="af-ee" className={inputCls} rows={2} value={form.excerptEn} onChange={set("excerptEn")} />
        </div>
        <div>
          <label className={labelCls} htmlFor="af-en">Excerpt — नेपाली</label>
          <textarea id="af-en" className={inputCls} rows={2} value={form.excerptNe} onChange={set("excerptNe")} />
        </div>
        <div>
          <label className={labelCls} htmlFor="af-be">Body — English (HTML)</label>
          <textarea id="af-be" className={inputCls} rows={14} value={form.bodyEn} onChange={set("bodyEn")} placeholder="<h2>…</h2><p>…</p>" />
        </div>
        <div>
          <label className={labelCls} htmlFor="af-bn">Body — नेपाली (HTML)</label>
          <textarea id="af-bn" className={inputCls} rows={14} value={form.bodyNe} onChange={set("bodyNe")} />
        </div>
      </div>
      <p className="text-xs text-slate-500">
        Body HTML supports &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;li&gt;, &lt;strong&gt;. British English for English text.
      </p>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={publish}
          disabled={saving}
          className="gx-btn gx-btn-primary px-6 py-3 text-sm font-semibold text-white disabled:opacity-50"
        >
          {saving ? "Publishing…" : form.id ? "Save changes" : "Publish article"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/articles")}
          className="gx-btn px-6 py-3 text-sm font-semibold"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
