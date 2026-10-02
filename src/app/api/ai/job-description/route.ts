import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSessionUser, rateLimit } from "@/lib/auth";
import { aiComplete, aiEnabled, parseAiJson, templateJobText, type GeneratedJobText } from "@/lib/ai";

export const maxDuration = 60;

const JOB_TYPE_LABELS: Record<string, string> = { PART_TIME: "Part-time", FULL_TIME: "Full-time", INTERNSHIP: "Internship", TEMPORARY: "Temporary", CONTRACT: "Contract" };
const ARRANGEMENT_LABELS: Record<string, string> = { ON_SITE: "On-site", REMOTE: "Remote", HYBRID: "Hybrid" };

/** AI job-post generator for employers (smart-template fallback until a key is set). */
export async function POST(req: NextRequest) {
  const user = await getSessionUser();
  if (!user || user.role !== "EMPLOYER") return NextResponse.json({ error: "Employers only." }, { status: 401 });
  if (!rateLimit(`ai-jobdesc:${user.id}`, 10, 60_000)) return NextResponse.json({ error: "Too many requests. Wait a minute." }, { status: 429 });

  const body = await req.json().catch(() => ({}));
  const title = String(body.title || "").trim();
  if (title.length < 3) return NextResponse.json({ error: "Add a job title first." }, { status: 400 });
  const jobType = JOB_TYPE_LABELS[body.jobType] ? body.jobType : "PART_TIME";
  const arrangement = ARRANGEMENT_LABELS[body.workArrangement] ? body.workArrangement : "ON_SITE";

  const [category, location] = await Promise.all([
    body.categoryId ? db.jobCategory.findUnique({ where: { id: body.categoryId }, select: { name: true } }) : null,
    body.locationId ? db.location.findUnique({ where: { id: body.locationId }, select: { name: true } }) : null,
  ]);
  const ctx = { title, jobTypeLabel: JOB_TYPE_LABELS[jobType], arrangementLabel: ARRANGEMENT_LABELS[arrangement], categoryName: category?.name };

  const llmText = await aiComplete(
    [
      { role: "system", content: "You write clear, student-friendly job postings for Growentix, a student jobs platform in Nepal. Reply ONLY with JSON: {\"description\": string (2 short paragraphs, no markdown), \"responsibilities\": string (lines starting with '- '), \"requirements\": string (lines starting with '- '), \"benefits\": string (lines starting with '- '), \"skills\": string[] (max 5)}. Keep it realistic for students: flexible around classes, training provided, NPR context. Never promise payment in advance or ask applicants to pay anything." },
      { role: "user", content: `Job title: ${title}\nCategory: ${category?.name || "General"}\nType: ${JOB_TYPE_LABELS[jobType]}\nArrangement: ${ARRANGEMENT_LABELS[arrangement]}\nLocation: ${location?.name || "Nepal"}` },
    ],
    { json: true, maxTokens: 800 }
  );
  const parsed = parseAiJson<GeneratedJobText>(llmText);
  if (parsed?.description) {
    return NextResponse.json({ source: "ai", ...parsed, skills: (parsed.skills || []).slice(0, 5) });
  }
  return NextResponse.json({ source: aiEnabled() ? "ai" : "smart", ...templateJobText(ctx) });
}
