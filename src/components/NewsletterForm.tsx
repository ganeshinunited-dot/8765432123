"use client";

import { useState } from "react";

// Klaviyo public site key (safe for browser code — this is the key Klaviyo's
// own onsite JS uses) and the "Growentix Weekly Job News" list (double opt-in).
const KLAVIYO_COMPANY_ID = "THc5ej";
const KLAVIYO_LIST_ID = "UKDu4E";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");

  async function subscribe(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError("Please enter a valid email address.");
      setStatus("error");
      return;
    }
    setStatus("sending");
    setError("");
    try {
      const res = await fetch(
        `https://a.klaviyo.com/client/subscriptions/?company_id=${KLAVIYO_COMPANY_ID}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json", revision: "2023-10-15" },
          body: JSON.stringify({
            data: {
              type: "subscription",
              attributes: {
                profile: {
                  data: {
                    type: "profile",
                    attributes: {
                      email: trimmed,
                      subscriptions: { email: { marketing: { consent: "SUBSCRIBED" } } },
                    },
                  },
                },
              },
              relationships: { list: { data: { type: "list", id: KLAVIYO_LIST_ID } } },
            },
          }),
        }
      );
      if (res.status === 202 || res.ok) {
        setStatus("done");
      } else {
        const data = await res.json().catch(() => null);
        setError(data?.errors?.[0]?.detail ?? "Something went wrong. Please try again.");
        setStatus("error");
      }
    } catch {
      setError("Could not reach the subscription service. Please try again.");
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-center">
        <p className="font-display text-lg font-bold text-emerald-900">You are on the list!</p>
        <p className="mt-1 text-sm text-emerald-800">
          We sent a confirmation email to <strong>{email.trim()}</strong>. Please click the link in it to start receiving the weekly job news.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={subscribe} noValidate>
      <div className="flex flex-col gap-2 sm:flex-row">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          disabled={status === "sending"}
          className="w-full flex-1 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-100 disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="shrink-0 rounded-full bg-[#E10600] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#c00500] disabled:opacity-60"
        >
          {status === "sending" ? "Subscribing…" : "Subscribe"}
        </button>
      </div>
      {status === "error" && error && (
        <p role="alert" className="mt-2 text-sm text-red-700">
          {error}
        </p>
      )}
      <p className="mt-3 text-xs text-slate-500">One email a week. No spam. Unsubscribe at any time.</p>
    </form>
  );
}
