import type { Metadata } from "next";
import Link from "next/link";
import { StaticPage, Section } from "@/components/layout/StaticPage";
export const revalidate = 300;

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description: "Quick answers about Growentix — daily job news and government job vacancy notices.",
};

const FAQS = [
  {
    q: "What is Growentix?",
    a: "Growentix publishes daily job news and government job vacancy notices from Nepal and around the world. It is free to read, and there are no accounts — you do not need to sign up to read anything.",
  },
  {
    q: "Is Growentix free?",
    a: "Yes — completely free to read. Growentix never asks you to pay to read a notice or an article. If anyone asks you to pay to apply for a job, it is a scam.",
  },
  {
    q: "Do I need an account to use Growentix?",
    a: "No. There are no user accounts on Growentix. You cannot create a profile, log in, or save jobs — just open a notice or an article and read it.",
  },
  {
    q: "How do I apply for a government job listed here?",
    a: "Through the official link in the notice itself. Each vacancy notice shows the deadline, the eligibility conditions, and a link to the official notice. Read the official notice before you apply, and apply only through the official channel it names. Growentix does not collect applications or CVs.",
  },
  {
    q: "How do I know a vacancy is real?",
    a: "Every notice links to its official source, and the deadline and post count come from that source. Still, always check the official notice yourself before applying or paying anything — a deadline or a detail can change after we publish.",
  },
  {
    q: "What is the Weekly job news email?",
    a: "A short email, once a week, with the week's job news. Subscribe from the form at the bottom of the homepage. We send a confirmation email — click the link in it to start receiving it — and you can unsubscribe at any time.",
  },
  {
    q: "Someone asked me to pay to apply, or to get a job. What should I do?",
    a: "Do not pay. Never pay to apply, to interview, or for 'training' for a job. Growentix never asks you for money, and a genuine government vacancy never charges you to apply. Check the official notice, and stop contact with anyone demanding payment.",
  },
  {
    q: "Can employers post jobs on Growentix?",
    a: "Not at the moment. Vacancy notices on Growentix are informational listings taken from official notices — employers cannot post jobs or manage applications here.",
  },
  {
    q: "How often is Growentix updated?",
    a: "Daily — new job news articles and new vacancy notices are published every day.",
  },
];

export default function FaqPage() {
  return (
    <StaticPage title="Frequently asked questions" subtitle="Quick answers about Growentix.">
      <Section title="General">
        <div className="space-y-3">
          {FAQS.map((f) => (
            <details key={f.q} className="rounded-xl border border-slate-200 bg-white px-5 py-4">
              <summary className="cursor-pointer text-[15px] font-semibold text-slate-900">{f.q}</summary>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{f.a}</p>
            </details>
          ))}
        </div>
      </Section>

      <Section title="Still need help?">
        <p>
          Read our <Link href="/safety" className="font-semibold text-emerald-700 hover:underline">safety guide</Link>, or{" "}
          <Link href="/about" className="font-semibold text-emerald-700 hover:underline">learn more about Growentix</Link>.
        </p>
      </Section>
    </StaticPage>
  );
}
