"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

const inputCls =
  "w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600";
const labelCls = "mb-1 block text-sm font-medium text-slate-700";

function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <div>
      <label className={labelCls}>{label}</label>
      {children}
      {hint && <p className="mt-1 text-xs text-slate-500">{hint}</p>}
    </div>
  );
}

export default function OnboardingForm() {
  const [form, setForm] = useState({
    contactName: "",
    email: "",
    password: "",
    phone: "",
    companyName: "",
    website: "",
    industry: "",
    description: "",
    size: "",
    registrationNo: "",
    address: "",
    contactTitle: "",
    city: "",
    country: "",
    logoUrl: "",
    agree: false,
    marketingOptIn: false,
    website2: "",
  });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<{ emailSent: boolean } | null>(null);

  function set<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!form.agree) {
      setError("Please agree to the Employer Guidelines and Verification Policy.");
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/employers/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data?.error || "Could not submit your application. Please try again.");
        return;
      }
      setDone({ emailSent: !!data.emailSent });
    } catch {
      setError("Could not submit your application. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return (
      <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-4">
        <p className="text-base font-semibold text-emerald-900">Application received.</p>
        {done.emailSent ? (
          <p className="mt-2 text-sm leading-relaxed text-emerald-800">
            We sent a verification link to <strong>{form.email}</strong>. Click it to verify your
            email — our team then reviews your company and you will hear back by email. The link
            expires in 24 hours, so check your inbox (and spam folder) soon.
          </p>
        ) : (
          <p className="mt-2 text-sm leading-relaxed text-emerald-800">
            We could not send the verification email automatically, so our team will contact you at{" "}
            <strong>{form.email}</strong> to confirm your details and finish the review.
          </p>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="mt-6 space-y-5">
      {/* Honeypot — hidden from humans, filled by bots. */}
      <div className="hidden" aria-hidden="true">
        <input
          type="text"
          value={form.website2}
          onChange={(e) => set("website2", e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div>
        <h3 className="text-base font-bold text-slate-900">Your account</h3>
        <div className="mt-3 space-y-3">
          <Field label="Contact person *">
            <input
              type="text"
              value={form.contactName}
              onChange={(e) => set("contactName", e.target.value)}
              placeholder="Your full name"
              maxLength={120}
              required
              className={inputCls}
            />
          </Field>
          <Field label="Work email *">
            <input
              type="email"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              placeholder="you@company.com"
              autoComplete="email"
              required
              className={inputCls}
            />
          </Field>
          <Field label="Password *">
            <input
              type="password"
              value={form.password}
              onChange={(e) => set("password", e.target.value)}
              placeholder="At least 8 characters"
              autoComplete="new-password"
              required
              className={inputCls}
            />
          </Field>
          <Field label="Phone (optional)">
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => set("phone", e.target.value)}
              placeholder="+977 98XXXXXXXX"
              maxLength={20}
              className={inputCls}
            />
          </Field>
          <Field label="Your job title (optional)">
            <input
              type="text"
              value={form.contactTitle}
              onChange={(e) => set("contactTitle", e.target.value)}
              placeholder="e.g. HR Manager"
              maxLength={100}
              className={inputCls}
            />
          </Field>
        </div>
      </div>

      <div>
        <h3 className="text-base font-bold text-slate-900">Your company</h3>
        <div className="mt-3 space-y-3">
          <Field label="Company name *">
            <input
              type="text"
              value={form.companyName}
              onChange={(e) => set("companyName", e.target.value)}
              placeholder="Company Pvt. Ltd."
              maxLength={120}
              required
              className={inputCls}
            />
          </Field>
          <Field label="Company website *">
            <input
              type="url"
              value={form.website}
              onChange={(e) => set("website", e.target.value)}
              placeholder="https://www.company.com"
              required
              className={inputCls}
            />
          </Field>
          <Field label="Industry (optional)">
            <input
              type="text"
              value={form.industry}
              onChange={(e) => set("industry", e.target.value)}
              placeholder="e.g. Technology, Healthcare, Education"
              maxLength={100}
              className={inputCls}
            />
          </Field>
          <Field label="What the company does (optional)">
            <textarea
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              placeholder="A short description for your public profile."
              rows={4}
              maxLength={3000}
              className={inputCls}
            />
          </Field>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Company size (optional)">
              <input
                type="text"
                value={form.size}
                onChange={(e) => set("size", e.target.value)}
                placeholder="e.g. 11–50"
                maxLength={50}
                className={inputCls}
              />
            </Field>
            <Field label="Logo URL (optional)">
              <input
                type="url"
                value={form.logoUrl}
                onChange={(e) => set("logoUrl", e.target.value)}
                placeholder="https://www.company.com/logo.png"
                maxLength={500}
                className={inputCls}
              />
            </Field>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="City (optional)">
              <input
                type="text"
                value={form.city}
                onChange={(e) => set("city", e.target.value)}
                placeholder="e.g. Kathmandu"
                maxLength={100}
                className={inputCls}
              />
            </Field>
            <Field label="Country (optional)">
              <input
                type="text"
                value={form.country}
                onChange={(e) => set("country", e.target.value)}
                placeholder="e.g. Nepal"
                maxLength={100}
                className={inputCls}
              />
            </Field>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-base font-bold text-slate-900">Verification details</h3>
        <p className="mt-1 text-sm text-slate-600">
          We check these against your official registration and website before granting the
          Verified badge.
        </p>
        <div className="mt-3 space-y-3">
          <Field label="Business registration number *">
            <input
              type="text"
              value={form.registrationNo}
              onChange={(e) => set("registrationNo", e.target.value)}
              placeholder="As on your registration certificate"
              maxLength={100}
              required
              className={inputCls}
            />
          </Field>
          <Field label="Registered address *">
            <textarea
              value={form.address}
              onChange={(e) => set("address", e.target.value)}
              placeholder="Full registered address"
              rows={2}
              maxLength={500}
              required
              className={inputCls}
            />
          </Field>
        </div>
      </div>

      <div className="space-y-2">
        <label className="flex items-start gap-2 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={form.agree}
            onChange={(e) => set("agree", e.target.checked)}
            className="mt-0.5 h-4 w-4 accent-emerald-700"
          />
          <span>
            I agree to the{" "}
            <a href="/employer-guidelines" className="font-semibold text-emerald-700 hover:underline">
              Employer Guidelines
            </a>{" "}
            and the{" "}
            <a href="/verification-policy" className="font-semibold text-emerald-700 hover:underline">
              Verification Policy
            </a>
            . *
          </span>
        </label>
        <label className="flex items-start gap-2 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={form.marketingOptIn}
            onChange={(e) => set("marketingOptIn", e.target.checked)}
            className="mt-0.5 h-4 w-4 accent-emerald-700"
          />
          <span>Send me occasional updates about Growentix (optional).</span>
        </label>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
      <Button type="submit" loading={busy} size="lg" className="w-full">
        Submit application — free
      </Button>
      <p className="text-xs text-slate-500">
        Onboarding is free. We never charge employers to apply, and verified employers never
        charge applicants to apply.
      </p>
    </form>
  );
}
