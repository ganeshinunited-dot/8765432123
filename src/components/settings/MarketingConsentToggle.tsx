"use client";

import { useEffect, useState } from "react";

/** Email marketing subscribe/unsubscribe toggle (Klaviyo list). */
export function MarketingConsentToggle() {
  const [optIn, setOptIn] = useState<boolean | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    fetch("/api/marketing-consent")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => setOptIn(d ? !!d.marketingOptIn : false))
      .catch(() => setOptIn(false));
  }, []);

  async function toggle() {
    if (optIn === null || busy) return;
    setBusy(true);
    try {
      const res = await fetch("/api/marketing-consent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ consented: !optIn }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) setOptIn(!!data.marketingOptIn);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-sm font-bold text-slate-900">Email updates</h2>
          <p className="mt-1 text-sm text-slate-600">
            {optIn
              ? "You're subscribed — we'll email you job alerts, course offers and updates."
              : "Get job alerts, course offers and updates by email. Unchecked by default."}
          </p>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={!!optIn}
          aria-label="Email me job alerts, course offers and updates"
          disabled={optIn === null || busy}
          onClick={toggle}
          className={`relative h-7 w-12 shrink-0 rounded-full transition-colors disabled:opacity-50 ${
            optIn ? "bg-emerald-600" : "bg-slate-300"
          }`}
        >
          <span
            className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all ${
              optIn ? "left-6" : "left-1"
            }`}
          />
        </button>
      </div>
      {optIn === null && <p className="mt-2 text-xs text-slate-400">Loading…</p>}
    </div>
  );
}
