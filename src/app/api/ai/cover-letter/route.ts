import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSessionUser, rateLimit } from "@/lib/auth";
import { aiComplete, aiEnabled, templateCoverLetter } from "@/lib/ai";

export const maxDuration = 60;

/** AI cover-letter writer for students (template fallback until a key is set). */
export async function POST(req: NextRequest) {
  const user = await getSessionUser();
  if (!user || user.role !== "STUDENT") return NextResponse.json({ error: "Students only." }, { status: 401 });
  if (!rateLimit(`ai-cover:${user.id}`, 10, 60_000)) return NextResponse.json({ error: "Too many requests. Wait a minute." }, { status: 429 });

  const body = await req.json().catch(() => ({}));
  const jobId = String(body.jobId || "");
  if (!jobId) return NextResponse.json({ error: "Job is required." }, { status: 400 });

  const [job, profile] = await Promise.all([
    db.job.findUnique({ where: { id: jobId }, include: { company: { select: { name: true } }, skills: { include: { skill: true } } } }),
    db.studentProfile.findUnique({ where: { userId: user.id }, include: { skills: { include: { skill: true } } } }),
  ]);
  if (!job) return NextResponse.json({ error: "Job not found." }, { status: 404 });

  const mySkills = profile?.skills.map((s) => s.skill.name) ?? [];
  const jobSkillNames = job.skills.map((s) => s.skill.name);
  const matching = jobSkillNames.filter((s) => mySkills.some((m) => m.toLowerCase() === s.toLowerCase()));

  const llmText = await aiComplete(
    [
      { role: "system", content: "You write short, warm, professional cover messages for students applying to jobs in Nepal. Plain text only, 120-170 words, no placeholders like [Your Name]. Sign off with the student's full name. Be specific but never invent experience the student did not mention." },
      { role: "user", content: `Student: ${user.name}\nHeadline: ${profile?.headline || "Student"}\nEducation: ${profile?.educationLevel || "Student"}${profile?.college ? ` at ${profile.college}` : ""}\nSkills: ${mySkills.join(", ") || "communication, quick learner"}\nApplying for: ${job.title} at ${job.company.name}\nJob skills wanted: ${jobSkillNames.join(", ") || "general"}` },
    ],
    { maxTokens: 400 }
  );
  if (llmText) return NextResponse.json({ source: "ai", text: llmText });
  return NextResponse.json({
    source: aiEnabled() ? "ai" : "smart",
    text: templateCoverLetter({ studentName: user.name, headline: profile?.headline, skills: mySkills, jobTitle: job.title, companyName: job.company.name, matchingSkills: matching }),
  });
}
