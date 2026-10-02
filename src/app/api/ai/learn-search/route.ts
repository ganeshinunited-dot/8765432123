import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { clientKey, getSessionUser, rateLimit } from "@/lib/auth";
import { aiComplete, parseAiJson } from "@/lib/ai";

export const maxDuration = 60;

const JOB_TYPES = ["PART_TIME", "FULL_TIME", "INTERNSHIP", "TEMPORARY", "CONTRACT"];
const ARRANGEMENTS = ["ON_SITE", "REMOTE", "HYBRID"];
const SCHEDULES = ["MORNING", "AFTERNOON", "EVENING", "WEEKEND"];

interface Intent {
  kind?: "job" | "course" | "both";
  q?: string | null;
  jobType?: string | null;
  workArrangement?: string | null;
  schedule?: string | null;
  locationSlug?: string | null;
  courseKeyword?: string | null;
}

/** Heuristic fallback: decide whether the user wants a job, a course, or both. */
function fallbackIntent(raw: string, locations: { name: string; slug: string }[]): Intent {
  const text = ` ${raw.toLowerCase()} `;
  const intent: Intent = {};
  const courseWords = ["course", "cource", "sikne", "sikna", "padhne", "padhna", "video", "tutorial", "class", "skill", "sikaune", "training"];
  const jobWords = ["job", "jagir", "kam", "apply", "salary", "talab", "intern", "part-time", "part time", "vacancy", "bharti"];
  const wantsCourse = courseWords.some((w) => text.includes(w));
  const wantsJob = jobWords.some((w) => text.includes(w));
  intent.kind = wantsCourse && !wantsJob ? "course" : !wantsCourse && wantsJob ? "job" : "both";

  if (/\b(evening|sanjha|beluka)\b/.test(text)) intent.schedule = "EVENING";
  else if (/\b(morning|bihana|bihan)\b/.test(text)) intent.schedule = "MORNING";
  else if (/\b(afternoon|diuso)\b/.test(text)) intent.schedule = "AFTERNOON";
  else if (/\b(weekend|saturday|sanibar)\b/.test(text)) intent.schedule = "WEEKEND";
  if (/\b(intern|internship)\b/.test(text)) intent.jobType = "INTERNSHIP";
  else if (/\bpart[\s-]?time\b/.test(text)) intent.jobType = "PART_TIME";
  if (/\b(remote|ghar bata|work from home|wfh)\b/.test(text)) intent.workArrangement = "REMOTE";
  for (const loc of locations) {
    if (text.includes(loc.name.toLowerCase())) { intent.locationSlug = loc.slug; break; }
  }
  // keyword = longest meaningful word-ish chunk
  const words = raw.toLowerCase().replace(/[^a-z\s]/g, " ").split(/\s+/).filter((w) => w.length > 3 && !courseWords.includes(w) && !jobWords.includes(w));
  const kw = words.sort((a, b) => b.length - a.length)[0];
  if (kw) { intent.q = kw; intent.courseKeyword = kw; }
  return intent;
}

/** AI assistant inside the student dashboard: natural language -> matching jobs AND courses. */
export async function POST(req: NextRequest) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Log in to use the AI assistant." }, { status: 401 });
  }
  if (user.role !== "STUDENT") {
    return NextResponse.json({ error: "Only student accounts can use this assistant." }, { status: 403 });
  }
  if (!rateLimit(clientKey("learn-search", req), 20, 60_000)) {
    return NextResponse.json({ error: "Too many searches. Wait a minute." }, { status: 429 });
  }
  const body = await req.json().catch(() => ({}));
  const query = String(body.query || "").trim().slice(0, 300);
  if (query.length < 3) return NextResponse.json({ error: "Describe what you want in a few words." }, { status: 400 });

  const locations = await db.location.findMany({ select: { name: true, slug: true } });

  let intent: Intent = {};
  let source: "ai" | "smart" = "smart";
  const llmText = await aiComplete(
    [
      {
        role: "system",
        content: `You help a Nepali student find a JOB and/or a COURSE. The user writes in English, Nepali or Romanized Nepali. Reply ONLY JSON: {"kind": "job"|"course"|"both", "q": string|null (job title keyword, e.g. "barista"), "courseKeyword": string|null (course topic keyword, e.g. "video editing"), "jobType": one of ${JOB_TYPES.join("|")} or null, "workArrangement": one of ${ARRANGEMENTS.join("|")} or null, "schedule": one of ${SCHEDULES.join("|")} or null, "locationSlug": one of ${locations.map((l) => l.slug).join("|")} or null}. "course/sikne/padhne/video/tutorial" => kind "course". "job/jagir/kam/apply/salary" => kind "job". Ambiguous or both mentioned => "both". "sanjha/beluka"=EVENING, "bihana"=MORNING, "ghar bata"=REMOTE.`,
      },
      { role: "user", content: query },
    ],
    { json: true, maxTokens: 200 }
  );
  const parsed = parseAiJson<Intent>(llmText);
  if (parsed && (parsed.kind === "job" || parsed.kind === "course" || parsed.kind === "both")) {
    source = "ai";
    intent = {
      kind: parsed.kind,
      q: parsed.q || undefined,
      courseKeyword: parsed.courseKeyword || parsed.q || undefined,
      jobType: parsed.jobType && JOB_TYPES.includes(parsed.jobType) ? parsed.jobType : undefined,
      workArrangement: parsed.workArrangement && ARRANGEMENTS.includes(parsed.workArrangement) ? parsed.workArrangement : undefined,
      schedule: parsed.schedule && SCHEDULES.includes(parsed.schedule) ? parsed.schedule : undefined,
      locationSlug: parsed.locationSlug && locations.some((l) => l.slug === parsed.locationSlug) ? parsed.locationSlug : undefined,
    };
  } else {
    intent = fallbackIntent(query, locations);
  }
  if (!intent.kind) intent.kind = "both";

  const loc = intent.locationSlug ? locations.find((l) => l.slug === intent.locationSlug) : null;

  const [jobs, courses] = await Promise.all([
    intent.kind === "course"
      ? []
      : db.job
          .findMany({
            where: {
              status: "ACTIVE",
              ...(intent.q ? { title: { contains: intent.q, mode: "insensitive" } } : {}),
              ...(intent.jobType ? { jobType: intent.jobType as never } : {}),
              ...(intent.workArrangement ? { workArrangement: intent.workArrangement as never } : {}),
              ...(intent.schedule ? { schedules: { has: intent.schedule as never } } : {}),
              ...(loc ? { location: { slug: loc.slug } } : {}),
            },
            orderBy: [{ featured: "desc" }, { publishedAt: "desc" }],
            take: 4,
            select: {
              slug: true, title: true,
              company: { select: { name: true, verificationStatus: true } },
              location: { select: { name: true } },
            },
          })
          .catch(() => []),
    intent.kind === "job"
      ? []
      : db.course
          .findMany({
            where: {
              status: "PUBLISHED",
              ...(intent.courseKeyword
                ? {
                    OR: [
                      { title: { contains: intent.courseKeyword, mode: "insensitive" } },
                      { description: { contains: intent.courseKeyword, mode: "insensitive" } },
                      { category: { contains: intent.courseKeyword, mode: "insensitive" } },
                    ],
                  }
                : {}),
            },
            orderBy: [{ sales: "desc" }],
            take: 4,
            select: { slug: true, title: true, price: true, category: true, thumbnailUrl: true },
          })
          .catch(() => []),
  ]);

  const parts: string[] = [];
  if (jobs.length) parts.push(`${jobs.length} job${jobs.length === 1 ? "" : "s"}`);
  if (courses.length) parts.push(`${courses.length} course${courses.length === 1 ? "" : "s"}`);
  const message = parts.length
    ? `Found ${parts.join(" and ")} for “${query}”.`
    : `Nothing live matches “${query}” yet. Try different words.`;

  return NextResponse.json({
    source,
    kind: intent.kind,
    message,
    jobs: jobs.map((j) => ({
      slug: j.slug,
      title: j.title,
      company: j.company.name,
      verified: j.company.verificationStatus === "VERIFIED",
      location: j.location?.name ?? null,
    })),
    courses: courses.map((c) => ({
      slug: c.slug,
      title: c.title,
      price: c.price,
      category: c.category,
      thumbnailUrl: c.thumbnailUrl,
    })),
  });
}
