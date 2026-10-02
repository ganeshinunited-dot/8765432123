import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { clientKey, rateLimit } from "@/lib/auth";
import { aiComplete, parseAiJson } from "@/lib/ai";

interface Filters {
  q?: string;
  jobType?: string;
  workArrangement?: string;
  schedule?: string;
  locationSlug?: string;
}

const JOB_TYPES = ["PART_TIME", "FULL_TIME", "INTERNSHIP", "TEMPORARY", "CONTRACT"];
const ARRANGEMENTS = ["ON_SITE", "REMOTE", "HYBRID"];
const SCHEDULES = ["MORNING", "AFTERNOON", "EVENING", "WEEKEND"];
const TYPE_LABELS: Record<string, string> = { PART_TIME: "Part-time", FULL_TIME: "Full-time", INTERNSHIP: "Internship", TEMPORARY: "Temporary", CONTRACT: "Contract" };
const SCHED_LABELS: Record<string, string> = { MORNING: "Morning", AFTERNOON: "Afternoon", EVENING: "Evening", WEEKEND: "Weekend" };

/** Keyword parser (English + Romanized Nepali) — the no-key fallback for AI search. */
function fallbackParse(raw: string, locations: { name: string; slug: string }[]): Filters {
  const text = ` ${raw.toLowerCase()} `;
  const f: Filters = {};
  if (/\b(evening|sanjha|sandhya|beluka)\b/.test(text)) f.schedule = "EVENING";
  else if (/\b(morning|bihana|bihan)\b/.test(text)) f.schedule = "MORNING";
  else if (/\b(afternoon|diuso)\b/.test(text)) f.schedule = "AFTERNOON";
  else if (/\b(weekend|saturday|sanibar|hapta)\b/.test(text)) f.schedule = "WEEKEND";
  if (/\b(intern|internship|prashikshan)\b/.test(text)) f.jobType = "INTERNSHIP";
  else if (/\bpart[\s-]?time\b/.test(text)) f.jobType = "PART_TIME";
  else if (/\bfull[\s-]?time\b/.test(text)) f.jobType = "FULL_TIME";
  else if (/\b(temp|temporary)\b/.test(text)) f.jobType = "TEMPORARY";
  if (/\b(remote|ghar bata|work from home|wfh)\b/.test(text)) f.workArrangement = "REMOTE";
  else if (/\bhybrid\b/.test(text)) f.workArrangement = "HYBRID";
  for (const loc of locations) {
    if (text.includes(loc.name.toLowerCase()) || text.includes(loc.slug.replace(/-/g, " "))) { f.locationSlug = loc.slug; break; }
  }
  if (!f.locationSlug) {
    if (/\b(ktm|kathmandu)\b/.test(text)) f.locationSlug = "kathmandu";
    else if (/\b(patan|lalitpur)\b/.test(text)) f.locationSlug = "lalitpur";
    else if (/\b(bhadgaon|bhaktapur)\b/.test(text)) f.locationSlug = "bhaktapur";
  }
  const roleWords = ["barista", "tutor", "delivery", "rider", "cashier", "data entry", "designer", "developer", "marketing", "sales", "waiter", "teacher", "support", "accountant", "receptionist", "editor", "writer"];
  const role = roleWords.find((w) => text.includes(w));
  if (role) f.q = role;
  return f;
}

/** AI job search: natural language (English/Nepali mix) -> real listings. */
export async function POST(req: NextRequest) {
  if (!rateLimit(clientKey("ai-search", req), 20, 60_000)) {
    return NextResponse.json({ error: "Too many searches. Wait a minute." }, { status: 429 });
  }
  const body = await req.json().catch(() => ({}));
  const query = String(body.query || "").trim().slice(0, 300);
  if (query.length < 3) return NextResponse.json({ error: "Describe the job you want in a few words." }, { status: 400 });

  const locations = await db.location.findMany({ select: { name: true, slug: true } });

  let filters: Filters | null = null;
  let source: "ai" | "smart" = "smart";
  const llmText = await aiComplete(
    [
      { role: "system", content: `Convert a job seeker's sentence (English, Nepali or Romanized Nepali) into JSON filters for a Nepal student-jobs platform. Reply ONLY JSON: {"q": string|null (job title keyword), "jobType": one of ${JOB_TYPES.join("|")} or null, "workArrangement": one of ${ARRANGEMENTS.join("|")} or null, "schedule": one of ${SCHEDULES.join("|")} or null, "locationSlug": one of ${locations.map((l) => l.slug).join("|")} or null}. "sanjha/beluka"=EVENING, "bihana"=MORNING, "diuso"=AFTERNOON, "ghar bata"=REMOTE.` },
      { role: "user", content: query },
    ],
    { json: true, maxTokens: 150 }
  );
  const parsed = parseAiJson<Filters>(llmText);
  if (parsed) {
    source = "ai";
    filters = {
      q: parsed.q || undefined,
      jobType: parsed.jobType && JOB_TYPES.includes(parsed.jobType) ? parsed.jobType : undefined,
      workArrangement: parsed.workArrangement && ARRANGEMENTS.includes(parsed.workArrangement) ? parsed.workArrangement : undefined,
      schedule: parsed.schedule && SCHEDULES.includes(parsed.schedule) ? parsed.schedule : undefined,
      locationSlug: parsed.locationSlug && locations.some((l) => l.slug === parsed.locationSlug) ? parsed.locationSlug : undefined,
    };
  } else {
    filters = fallbackParse(query, locations);
  }

  const loc = filters.locationSlug ? locations.find((l) => l.slug === filters!.locationSlug) : null;
  const jobs = await db.job.findMany({
    where: {
      status: "ACTIVE",
      ...(filters.q ? { title: { contains: filters.q, mode: "insensitive" } } : {}),
      ...(filters.jobType ? { jobType: filters.jobType as never } : {}),
      ...(filters.workArrangement ? { workArrangement: filters.workArrangement as never } : {}),
      ...(filters.schedule ? { schedules: { has: filters.schedule as never } } : {}),
      ...(loc ? { location: { slug: loc.slug } } : {}),
    },
    orderBy: [{ featured: "desc" }, { publishedAt: "desc" }],
    take: 6,
    include: {
      company: { select: { name: true, slug: true, verificationStatus: true } },
      location: { select: { name: true } },
      category: { select: { name: true } },
    },
  });

  const understood: string[] = [];
  if (filters.q) understood.push(`“${filters.q}” roles`);
  if (filters.jobType) understood.push(TYPE_LABELS[filters.jobType]);
  if (filters.schedule) understood.push(SCHED_LABELS[filters.schedule]);
  if (filters.workArrangement === "REMOTE") understood.push("Remote");
  if (loc) understood.push(loc.name);

  const params = new URLSearchParams();
  if (filters.q) params.set("q", filters.q);
  if (filters.jobType) params.set("type", filters.jobType);
  if (filters.workArrangement) params.set("arrangement", filters.workArrangement);
  if (filters.schedule) params.set("schedule", filters.schedule);
  if (loc) params.set("location", loc.name);

  return NextResponse.json({
    source,
    filters,
    message: jobs.length
      ? `Found ${jobs.length} job${jobs.length === 1 ? "" : "s"}${understood.length ? ` matching ${understood.join(" · ")}` : ""}. Tap a job to view and apply.`
      : `No live jobs match ${understood.length ? understood.join(" · ") : "that"} yet. Try removing a filter or check all jobs below.`,
    jobs: jobs.map((j) => ({
      id: j.id,
      slug: j.slug,
      title: j.title,
      company: j.company.name,
      verified: j.company.verificationStatus === "VERIFIED",
      location: j.location?.name ?? null,
      jobType: TYPE_LABELS[j.jobType] ?? j.jobType,
      salaryMin: j.salaryMin,
      salaryMax: j.salaryMax,
      salaryType: j.salaryType,
    })),
    allJobsUrl: `/jobs${params.toString() ? `?${params.toString()}` : ""}`,
  });
}
