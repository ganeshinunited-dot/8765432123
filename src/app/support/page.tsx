import type { Metadata } from "next";
import Link from "next/link";
import { SupportChat } from "@/components/support/SupportChat";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Help & Support — Growentix",
  description: "Ask the Growentix support assistant how to apply, post jobs, verify your company, manage CVs, pricing and safety.",
};

const FAQS = [
  {
    q: "Is Growentix free for students?",
    a: "Yes — students never pay. Searching, saving, applying, messaging and interviews are all free. Employers fund the platform through posting plans.",
  },
  {
    q: "How long until my job post goes live?",
    a: "New job posts are reviewed by our team for quality and safety, usually within one working day. You'll see the status in Employer → Jobs.",
  },
  {
    q: "Who can see my CV?",
    a: "Only you, Growentix admins, and employers you have applied to. CVs are never public and never sold.",
  },
  {
    q: "I chose the wrong account type at signup. What now?",
    a: "Account type can't be switched from settings. Email support@growentix.cloud from your account email and we'll help.",
  },
];

export default function SupportPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">Help &amp; Support</h1>
      <p className="mt-2 max-w-2xl text-slate-600">
        Ask the assistant below how anything on Growentix works — it knows the whole platform: applying, posting jobs,
        verification, CVs, pricing and safety.
      </p>

      <div className="mt-6">
        <SupportChat />
      </div>

      <h2 className="mt-10 text-xl font-bold text-slate-900">Quick answers</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {FAQS.map((f) => (
          <article key={f.q} className="rounded-xl border border-slate-200 bg-white p-4">
            <h3 className="text-sm font-semibold text-slate-900">{f.q}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{f.a}</p>
          </article>
        ))}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
          <h2 className="text-sm font-semibold text-amber-900">Stay safe</h2>
          <p className="mt-1 text-sm text-amber-800">
            Never pay an employer to apply for or receive a job. Genuine employers never charge applicants.{" "}
            <Link href="/safety" className="font-semibold underline">
              Read the safety guide
            </Link>
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h2 className="text-sm font-semibold text-slate-900">Still need a human?</h2>
          <p className="mt-1 text-sm text-slate-600">
            Email us at <span className="font-medium text-slate-900">support@growentix.cloud</span> — we usually reply
            within one working day. You can also browse the{" "}
            <Link href="/faq" className="font-semibold text-emerald-700 hover:underline">
              FAQ page
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
