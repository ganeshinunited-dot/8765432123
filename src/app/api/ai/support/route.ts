import { NextRequest, NextResponse } from "next/server";
import { clientKey, rateLimit } from "@/lib/auth";
import { aiComplete } from "@/lib/ai";

export const maxDuration = 60;

const PLATFORM_GUIDE = `You are the Growentix Support Assistant for growentix.cloud — a jobs platform in Nepal that connects students with part-time, evening, weekend, remote and internship jobs from employers. Answer ONLY from the guide below. Be friendly, clear and concise (2-6 short sentences or a short numbered list of steps). If something is not in the guide, say you are not sure and suggest emailing support@growentix.cloud. Reply in the same language style the user used (English or Romanized Nepali mix).

FOR STUDENTS (always free):
- Sign up: /signup → choose "Student" → verify email from the link we send (check spam too). Login at /login. Forgot password: /forgot-password.
- Profile: after login, open Profile (/profile). Add headline, bio, city, education/college, skills, preferred job types, schedules and expected pay. A complete profile gets better Smart Match recommendations on the dashboard.
- CV/documents: upload CV in Profile. Files are private — only you, admins, and an employer you applied to can view them.
- Find jobs: /jobs with filters (type, schedule, location, arrangement), or use the AI Job Assistant box on /jobs — describe the job in your own words (English/Nepali mix works).
- Save jobs: bookmark button on a job → find them under Dashboard → Saved.
- Apply: open a job → "Apply Now" → optionally write a cover message (the "Write my cover letter with AI" button drafts one from your profile) → Submit. Track status under Dashboard → Applications; you can also withdraw there.
- Messages & interviews: employers can message you (Dashboard → Messages). Interview invitations appear there and under Dashboard → Interviews/Applications; accept or decline from the platform.
- Safety: NEVER pay an employer to apply or get a job — real employers never charge applicants. Report suspicious jobs with the Report button on the job page.

FOR EMPLOYERS:
- Sign up: /signup → choose "Employer". Then complete Company Profile (/employer/company): name, industry, location, description, logo.
- Verification: submit business details/documents from the company page; our admin team reviews them. A "Verified" badge builds student trust.
- Post a job: Employer → Post a Job (/employer/jobs/new). 4 steps: Basics → Details (the AI Job Writer can draft description/responsibilities/requirements from just the title) → Schedule & pay → Review. Jobs go live after a quick admin review.
- Plans (Employer → Billing): Free = 1 active job post; Basic NPR 999/month = 5 posts; Premium NPR 2,499/month = 20 posts + candidate search. Note: online checkout currently runs in demonstration mode — contact support for activation.
- Applicants: Employer → Applicants — shortlist, reject, select, download CVs (only for your applicants), message candidates and propose interviews with date/time.

GENERAL:
- Companies directory: /companies. Pricing details: /pricing. Safety: /safety. FAQ: /faq.
- Account problems: wrong role chosen at signup cannot be changed in settings — contact support.
- Growentix is for students in Nepal; jobs show NPR pay, locations across Nepal, schedules like Morning/Afternoon/Evening/Weekend.`;

// Keyword fallbacks used until an AI key is configured (or if the AI is unreachable).
const FALLBACKS: Array<{ match: RegExp; answer: string }> = [
  { match: /apply|application/i, answer: "To apply: open any job from /jobs, tap \"Apply Now\", optionally add a cover message (the AI button can draft one), then Submit. Track or withdraw it anytime under Dashboard → Applications." },
  { match: /post|employer.*job|job.*post/i, answer: "Employers: sign up as Employer → complete your Company Profile → \"Post a Job\" (4 quick steps; the AI Job Writer can draft the description from just the title). Jobs go live after a short admin review." },
  { match: /verif/i, answer: "Email verification: open the link we emailed after signup (check spam). Company verification: submit your business details from Employer → Company Profile; our team reviews them and adds the Verified badge." },
  { match: /cv|resume|document/i, answer: "Upload your CV under Profile. It stays private — only you, admins, and employers you applied to can open it." },
  { match: /password|forgot|login|log in/i, answer: "Forgot your password? Go to /forgot-password, enter your account email, and use the reset link (valid 1 hour). Then log in at /login with the new password." },
  { match: /price|pricing|cost|plan|subscription/i, answer: "Students are always free. Employers: Free plan = 1 job post, Basic NPR 999/month = 5 posts, Premium NPR 2,499/month = 20 posts + candidate search. See /pricing for details." },
  { match: /interview/i, answer: "Employers propose interviews from the Applicants page; you'll see invitations in Dashboard → Messages/Interviews and can accept or decline there." },
  { match: /message|chat|contact.*employer/i, answer: "Messaging opens once you're connected to an employer (e.g. after applying or being shortlisted). Find conversations under Dashboard → Messages." },
  { match: /save|bookmark/i, answer: "Tap the bookmark (\"Save Job\") on any job to save it, then find all saved jobs under Dashboard → Saved." },
  { match: /safe|scam|fraud|pay.*(fee|money)|report/i, answer: "Safety first: NEVER pay an employer to apply or receive a job — genuine employers never charge applicants. If a job looks suspicious, use the Report button on the job page and our team will review it. More at /safety." },
  { match: /human|person|email|phone|contact/i, answer: "You can reach the Growentix team at support@growentix.cloud. We usually reply within one working day." },
];

export async function POST(req: NextRequest) {
  if (!rateLimit(clientKey("ai-support", req), 15, 60_000)) {
    return NextResponse.json({ error: "Too many questions. Wait a minute and try again." }, { status: 429 });
  }
  const body = await req.json().catch(() => ({}));
  const question = String(body.question || "").trim().slice(0, 500);
  if (question.length < 2) return NextResponse.json({ error: "Type your question first." }, { status: 400 });

  const llm = await aiComplete(
    [
      { role: "system", content: PLATFORM_GUIDE },
      { role: "user", content: question },
    ],
    { maxTokens: 450 }
  );
  if (llm) {
    // Plain-text chat UI: strip markdown the model may add.
    const clean = llm.replace(/\*\*/g, "").replace(/__/g, "").replace(/`/g, "").replace(/^#{1,6}\s+/gm, "").trim();
    return NextResponse.json({ source: "ai", answer: clean });
  }

  const hit = FALLBACKS.find((f) => f.match.test(question));
  return NextResponse.json({
    source: "smart",
    answer: hit?.answer ?? "I can help with applying, posting jobs, verification, CV uploads, pricing and safety. Try asking, for example, \"How do I apply for a job?\" — or email support@growentix.cloud for anything else.",
  });
}
