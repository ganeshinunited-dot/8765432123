"use client";

import { useState } from "react";
import { VERDICT_LABELS } from "@/lib/factCheck";

type Assertion = { text: string; checkable: boolean; reason: string };

type ExternalMatch = {
  publisher: string;
  rating: string;
  title: string;
  url: string;
  reviewDate: string | null;
};

type Preliminary = {
  verdict: string;
  confidence: number;
  stance: "supports" | "refutes" | "neutral";
  reasoning: string;
  citations: { title: string; url: string; snippet: string }[];
  sourcesUsed: string[];
};

type Wayback = { url: string; firstSeen: string | null; status: string };

type CheckResult =
  | {
      status: "match";
      assertions: Assertion[];
      match: { slug: string; titleEn: string; verdict: string; matchScore: number; checkedAt: string | null };
    }
  | { status: "external"; assertions: Assertion[]; externalMatch: ExternalMatch }
  | {
      status: "preliminary";
      assertions: Assertion[];
      preliminary: Preliminary;
      wayback: Wayback | null;
    }
  | { status: "no-match"; assertions: Assertion[]; automatedEnabled: boolean }
  | { status: "not-checkable"; assertions: Assertion[] }
  | { status: "error"; message: string };

function verdictPillClass(verdict: string): string {
  switch (verdict) {
    case "TRUE":
      return "bg-emerald-600 text-white";
    case "MOSTLY_TRUE":
      return "bg-teal-600 text-white";
    case "MISLEADING":
      return "bg-amber-500 text-white";
    case "FALSE":
      return "bg-red-600 text-white";
    default:
      return "bg-slate-500 text-white";
  }
}

function stanceLine(stance: Preliminary["stance"]): string {
  switch (stance) {
    case "supports":
      return "The evidence we found mostly supports this claim.";
    case "refutes":
      return "The evidence we found mostly goes against this claim.";
    default:
      return "The evidence we found is mixed or inconclusive.";
  }
}

function formatArchiveDate(ts: string): string {
  // Wayback timestamps are YYYYMMDDHHMMSS.
  const y = ts.slice(0, 4);
  const m = ts.slice(4, 6);
  const d = ts.slice(6, 8);
  if (!y || !m || !d) return ts;
  return `${y}-${m}-${d}`;
}

/**
 * "Check a claim" box (Fact Check, 2026-11-22; Spec 2 waterfall).
 *
 * Cache-first: our own verified verdicts, then Google's Fact Check index.
 * On a miss, and ONLY when the free search/AI keys are configured, the
 * server runs the $0 waterfall (Groq extraction, Tavily basic search,
 * Groq/Gemini synthesis) and returns a PRELIMINARY, AI-assisted
 * assessment with citations — clearly labelled, never a published
 * verdict. With no keys set, unmatched claims go straight to our editors
 * for human review. This box NEVER publishes a verdict by itself.
 *
 * Accepts English, Devanagari Nepali and Romanized Nepali input.
 */
export function FactCheckChecker() {
  const [claim, setClaim] = useState("");
  const [url, setUrl] = useState("");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<CheckResult | null>(null);
  const [queued, setQueued] = useState(false);
  const [submitBusy, setSubmitBusy] = useState(false);
  const [submitError, setSubmitError] = useState("");

  async function checkClaim(e: React.FormEvent) {
    e.preventDefault();
    if (!claim.trim() || busy) return;
    setBusy(true);
    setResult(null);
    setQueued(false);
    setSubmitError("");
    try {
      const res = await fetch("/api/fact-check/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ claim: claim.trim(), url: url.trim() || undefined }),
      });
      const data = await res.json();
      if (!res.ok) {
        setResult({ status: "error", message: data?.error || "Something went wrong. Please try again." });
      } else if (data.match) {
        setResult({ status: "match", assertions: data.assertions, match: data.match });
      } else if (data.externalMatch) {
        setResult({ status: "external", assertions: data.assertions, externalMatch: data.externalMatch });
      } else if (data.preliminary) {
        setResult({ status: "preliminary", assertions: data.assertions, preliminary: data.preliminary, wayback: data.wayback ?? null });
      } else if (!data.assertions?.some((a: Assertion) => a.checkable)) {
        setResult({ status: "not-checkable", assertions: data.assertions ?? [] });
      } else {
        setResult({ status: "no-match", assertions: data.assertions, automatedEnabled: Boolean(data.waterfall?.enabled) });
      }
    } catch {
      setResult({ status: "error", message: "Could not reach the checker. Please try again." });
    } finally {
      setBusy(false);
    }
  }

  async function queueForReview() {
    if (submitBusy) return;
    setSubmitBusy(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/fact-check/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ claim: claim.trim(), url: url.trim() || undefined, website2: "" }),
      });
      const data = await res.json();
      if (!res.ok) {
        setSubmitError(data?.error || "Could not queue the claim. Please try again.");
      } else {
        setQueued(true);
      }
    } catch {
      setSubmitError("Could not queue the claim. Please try again.");
    } finally {
      setSubmitBusy(false);
    }
  }

  const checkable = result && result.status !== "error" ? result.assertions.filter((a) => a.checkable) : [];
  const needsReview = result?.status === "no-match" || result?.status === "preliminary";

  return (
    <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
      <form onSubmit={checkClaim}>
        <label htmlFor="fc-claim" className="text-sm font-semibold text-slate-900">
          Paste a claim you have seen online
        </label>
        <textarea
          id="fc-claim"
          value={claim}
          onChange={(e) => setClaim(e.target.value)}
          rows={3}
          maxLength={1000}
          placeholder="e.g. Go to Europe for just Rs 2 lakh and earn Rs 10 lakh a month — in English, नेपाली, or Romanized Nepali."
          className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm leading-relaxed text-slate-900 placeholder:text-slate-400 focus:border-emerald-600 focus:outline-none"
        />
        <label htmlFor="fc-url" className="mt-3 block text-sm font-semibold text-slate-900">
          Where did you see it? <span className="font-normal text-slate-500">(optional — link or post URL)</span>
        </label>
        <input
          id="fc-url"
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          maxLength={500}
          placeholder="https://…"
          className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-600 focus:outline-none"
        />
        <button
          type="submit"
          disabled={!claim.trim() || busy}
          className="mt-4 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {busy ? "Checking…" : "Check this claim"}
        </button>
      </form>

      <p className="mt-3 text-xs leading-relaxed text-slate-500">
        We check our verified verdicts and the Google Fact Check index first. When our free search
        and AI keys are set up, unmatched claims get a preliminary AI-assisted assessment with
        citations — clearly labelled, never a published verdict. New claims always go to our
        editors before any verdict is published.
      </p>

      {result?.status === "match" && (
        <div className="mt-5 rounded-xl border-2 border-emerald-600 bg-emerald-50 p-4">
          <p className="text-sm font-semibold text-slate-900">We have already checked a claim like this.</p>
          <p className="mt-2 flex flex-wrap items-center gap-2">
            <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-bold ${verdictPillClass(result.match.verdict)}`}>
              {VERDICT_LABELS[result.match.verdict as keyof typeof VERDICT_LABELS] ?? result.match.verdict}
            </span>
            <span className="text-xs text-slate-600">{result.match.matchScore}% match with the verified claim</span>
          </p>
          <a href={`/articles/${result.match.slug}`} className="mt-3 block font-semibold leading-snug text-emerald-700 hover:underline">
            {result.match.titleEn} →
          </a>
          <p className="mt-1 text-xs text-slate-500">Read the full check — evidence, sources and confidence score.</p>
        </div>
      )}

      {result?.status === "external" && (
        <div className="mt-5 rounded-xl border-2 border-sky-600 bg-sky-50 p-4">
          <p className="text-sm font-semibold text-slate-900">Already checked by {result.externalMatch.publisher}.</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">
            Their rating: <span className="font-semibold text-slate-900">“{result.externalMatch.rating}”</span>
            {result.externalMatch.reviewDate ? ` — checked ${result.externalMatch.reviewDate}.` : "."}
          </p>
          <a
            href={result.externalMatch.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 block font-semibold leading-snug text-sky-700 hover:underline"
          >
            {result.externalMatch.title} →
          </a>
          <p className="mt-1 text-xs text-slate-500">
            External fact-check, found through Google&apos;s Fact Check index. Read the full check on the publisher&apos;s site.
          </p>
        </div>
      )}

      {result?.status === "preliminary" && !queued && (
        <div className="mt-5 rounded-xl border-2 border-amber-500 bg-amber-50 p-4">
          <p className="text-sm font-semibold text-slate-900">
            Preliminary assessment — AI-assisted, not a final verdict.
          </p>
          <p className="mt-2 flex flex-wrap items-center gap-2">
            <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-bold ${verdictPillClass(result.preliminary.verdict)}`}>
              {VERDICT_LABELS[result.preliminary.verdict as keyof typeof VERDICT_LABELS] ?? result.preliminary.verdict}
            </span>
            <span className="text-xs text-slate-600">{result.preliminary.confidence}% confidence (preliminary)</span>
          </p>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">{stanceLine(result.preliminary.stance)}</p>
          {result.preliminary.reasoning && (
            <p className="mt-1 text-sm leading-relaxed text-slate-700">{result.preliminary.reasoning}</p>
          )}
          {result.preliminary.citations.length > 0 && (
            <div className="mt-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Sources checked</p>
              <ul className="mt-1 space-y-2">
                {result.preliminary.citations.map((c, i) => (
                  <li key={i} className="text-sm leading-relaxed">
                    <a href={c.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-amber-800 hover:underline">
                      {c.title}
                    </a>
                    {c.snippet && <span className="block text-xs text-slate-600">{c.snippet}</span>}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {result.wayback?.firstSeen && (
            <p className="mt-2 text-xs text-slate-500">
              The page you linked was first archived on {formatArchiveDate(result.wayback.firstSeen)}.
            </p>
          )}
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            Our editors still need to verify this against primary sources before we publish a
            verdict. Send it for review and we will publish the checked verdict here.
          </p>
          <button
            type="button"
            onClick={queueForReview}
            disabled={submitBusy}
            className="mt-3 rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitBusy ? "Sending…" : "Send to our editors"}
          </button>
          {submitError && <p className="mt-2 text-sm text-red-600">{submitError}</p>}
        </div>
      )}

      {result?.status === "no-match" && !queued && (
        <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm font-semibold text-slate-900">No verified verdict for this claim yet.</p>
          <p className="mt-1 text-sm leading-relaxed text-slate-600">
            Our editors check new claims against primary sources — official notices, government
            portals and the organisations involved. Send it for review and we will publish the
            verdict here once it is checked.
          </p>
          {!result.automatedEnabled && (
            <p className="mt-1 text-sm leading-relaxed text-slate-600">
              Automated checks are off right now — no search or AI keys are set up yet — so our
              editors will check this by hand.
            </p>
          )}
          {checkable.length > 0 && (
            <p className="mt-2 text-sm text-slate-600">
              Checkable part: <span className="font-medium text-slate-900">“{checkable[0].text}”</span>
            </p>
          )}
          <button
            type="button"
            onClick={queueForReview}
            disabled={submitBusy}
            className="mt-3 rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitBusy ? "Sending…" : "Send to our editors"}
          </button>
          {submitError && <p className="mt-2 text-sm text-red-600">{submitError}</p>}
        </div>
      )}

      {needsReview && queued && (
        <div className="mt-5 rounded-xl border border-emerald-600 bg-emerald-50 p-4">
          <p className="text-sm font-semibold text-slate-900">Queued for review — thank you.</p>
          <p className="mt-1 text-sm leading-relaxed text-slate-600">
            Our editors will check this against primary sources. If it checks out as a claim worth
            publishing, the verdict will appear on this page.
          </p>
        </div>
      )}

      {result?.status === "not-checkable" && (
        <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm font-semibold text-slate-900">This does not look like a checkable claim.</p>
          <p className="mt-1 text-sm leading-relaxed text-slate-600">
            We can only check factual statements — numbers, dates, quotes, or something a named
            person or organisation said. Opinions, questions and jokes cannot be fact-checked.
          </p>
          {result.assertions.length > 0 && (
            <ul className="mt-2 space-y-1 text-sm text-slate-600">
              {result.assertions.map((a, i) => (
                <li key={i}>
                  “{a.text}” — {a.reason}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {result?.status === "error" && (
        <p className="mt-4 text-sm text-red-600">{result.message}</p>
      )}
    </div>
  );
}
