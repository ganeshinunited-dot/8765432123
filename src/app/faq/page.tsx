import type { Metadata } from "next";
import Link from "next/link";
import { StaticPage, Section } from "@/components/layout/StaticPage";
export const revalidate = 300;

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description: "Answers for students and employers using Growentix.",
};

const STUDENT_FAQS = [
  {
    q: "Is Growentix free for students?",
    a: "Yes — completely. Students never pay to create a profile, search, save jobs, or apply. Employers fund the platform through subscription plans. If anyone ever asks you to pay to apply for a job, it is a scam: report it immediately.",
  },
  {
    q: "How do I apply for a job?",
    a: "Create your free profile, add your education, skills, and availability, then open any job and tap Apply. You can attach a short cover note and your CV. The employer sees your application in their dashboard and can shortlist you, message you, or invite you to an interview.",
  },
  {
    q: "Who can see my CV?",
    a: "Only employers you apply to, and only for your application to them. Your CV is never public and is not searchable by employers you haven't applied to.",
  },
  {
    q: "How does job matching work?",
    a: "We compare your skills, location, availability, and schedule preferences with each job's requirements and show a match score on recommended jobs. The more complete your profile, the better your matches.",
  },
  {
    q: "What kinds of jobs can I find?",
    a: "Part-time, evening, weekend, remote, and internship roles across Nepal — tutoring, retail, hospitality, digital and creative work, customer support, and more. Use the filters on the Find Jobs page to match your class schedule.",
  },
  {
    q: "I forgot my password. What do I do?",
    a: "Use the 'Forgot password?' link on the login page. We'll email you a secure reset link that expires in one hour. If the email doesn't arrive, check your spam folder.",
  },
  {
    q: "An employer asked me for money. What should I do?",
    a: "Stop communicating and report the job or conversation using the report button. Never pay to apply, interview, or 'train'. See our safety guide for more warning signs.",
  },
];

const EMPLOYER_FAQS = [
  {
    q: "How much does it cost to post a job?",
    a: "The Free plan includes 1 active job post. Paid plans (Basic and Premium) allow more posts, featured placement, and candidate search. Students are always free. See the Pricing page for current plans.",
  },
  {
    q: "What is employer verification?",
    a: "Verified employers submit business documents that our team reviews. Verified companies receive a badge on their profile and job posts, which students are told to look for. Verification can be completed from your company profile.",
  },
  {
    q: "How do I manage applicants?",
    a: "From your employer dashboard you can view every application, open CVs of your applicants, and move candidates through stages: viewed, shortlisted, interview, selected, or rejected. Candidates are notified automatically at each stage and you can message them directly.",
  },
  {
    q: "Why was my job post paused or rejected?",
    a: "Posts are moderated against our employer guidelines: they must describe a real vacancy with accurate pay and schedule, and must never charge applicants fees. You'll receive a notification with the reason and can edit and resubmit.",
  },
  {
    q: "How do payments work?",
    a: "Employer plans can be paid via eSewa or Khalti where available. Your subscription, limits, and payment history are shown on your Billing page.",
  },
];

export default function FaqPage() {
  return (
    <StaticPage title="Frequently asked questions" subtitle="Quick answers for students and employers.">
      <Section title="For students">
        <div className="space-y-3">
          {STUDENT_FAQS.map((f) => (
            <details key={f.q} className="rounded-xl border border-slate-200 bg-white px-5 py-4">
              <summary className="cursor-pointer text-[15px] font-semibold text-slate-900">{f.q}</summary>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{f.a}</p>
            </details>
          ))}
        </div>
      </Section>

      <Section title="For employers">
        <div className="space-y-3">
          {EMPLOYER_FAQS.map((f) => (
            <details key={f.q} className="rounded-xl border border-slate-200 bg-white px-5 py-4">
              <summary className="cursor-pointer text-[15px] font-semibold text-slate-900">{f.q}</summary>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{f.a}</p>
            </details>
          ))}
        </div>
      </Section>

      <Section title="Still need help?">
        <p>
          Read our <Link href="/safety" className="font-semibold text-emerald-700 hover:underline">safety guide</Link>,{" "}
          <Link href="/employer-guidelines" className="font-semibold text-emerald-700 hover:underline">employer guidelines</Link>, or{" "}
          <Link href="/about" className="font-semibold text-emerald-700 hover:underline">learn more about Growentix</Link>.
        </p>
      </Section>
    </StaticPage>
  );
}
