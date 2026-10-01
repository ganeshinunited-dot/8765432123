import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSessionUser, rateLimit, clientKey } from "@/lib/auth";
import { jobPostSchema } from "@/lib/validation";
import { uniqueSlug } from "@/lib/format";
import { notify } from "@/lib/notifications";

async function getEmployerCompany(userId: string) {
  return db.company.findFirst({ where: { ownerId: userId } });
}

async function activeJobCount(companyId: string) {
  return db.job.count({ where: { companyId, status: { in: ["ACTIVE", "PENDING_REVIEW"] } } });
}

async function jobLimit(companyId: string): Promise<number> {
  const sub = await db.subscription.findFirst({
    where: { companyId, status: "ACTIVE" },
    orderBy: { startedAt: "desc" },
    include: { plan: true },
  });
  if (sub?.plan) return sub.plan.jobPostLimit;
  const free = await db.subscriptionPlan.findUnique({ where: { slug: "free" } });
  return free?.jobPostLimit ?? 1;
}

export async function POST(req: Request) {
  if (!rateLimit(clientKey("jobpost", req), 10, 60_000)) {
    return NextResponse.json({ error: "Too many requests. Please slow down." }, { status: 429 });
  }
  const user = await getSessionUser();
  if (!user || user.role !== "EMPLOYER") return NextResponse.json({ error: "Not authorized." }, { status: 401 });

  const company = await getEmployerCompany(user.id);
  if (!company) return NextResponse.json({ error: "Create your company profile first." }, { status: 400 });

  const body = await req.json().catch(() => ({}));
  const parsed = jobPostSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
  const data = parsed.data;

  // Subscription limit check
  const [count, limit] = await Promise.all([activeJobCount(company.id), jobLimit(company.id)]);
  if (count >= limit) {
    return NextResponse.json({ error: `Your plan allows ${limit} active job post${limit === 1 ? "" : "s"}. Upgrade to post more.` }, { status: 402 });
  }

  if (data.salaryType !== "NEGOTIABLE") {
    if (data.salaryMin == null || data.salaryMax == null) {
      return NextResponse.json({ error: "Please provide both minimum and maximum salary." }, { status: 400 });
    }
    if (data.salaryMax < data.salaryMin) {
      return NextResponse.json({ error: "Maximum salary cannot be less than minimum." }, { status: 400 });
    }
  }

  const title = data.title.trim();
  const job = await db.job.create({
    data: {
      slug: uniqueSlug(title),
      companyId: company.id,
      title,
      description: data.description.trim(),
      responsibilities: data.responsibilities?.trim() || null,
      requirements: data.requirements?.trim() || null,
      benefits: data.benefits?.trim() || null,
      categoryId: data.categoryId || null,
      jobType: data.jobType,
      workArrangement: data.workArrangement,
      schedules: data.schedules,
      locationId: data.locationId || null,
      salaryType: data.salaryType,
      salaryMin: data.salaryType === "NEGOTIABLE" ? null : data.salaryMin,
      salaryMax: data.salaryType === "NEGOTIABLE" ? null : data.salaryMax,
      openings: data.openings,
      deadline: data.deadline ? new Date(data.deadline) : null,
      status: "PENDING_REVIEW",
    },
  });

  for (const name of data.skills) {
    const skill = await db.skill.upsert({ where: { name: name.trim() }, update: {}, create: { name: name.trim() } });
    await db.jobSkill.create({ data: { jobId: job.id, skillId: skill.id } });
  }

  const admins = await db.user.findMany({ where: { role: "ADMIN", status: "ACTIVE" }, select: { id: true } });
  await Promise.all(
    admins.map((a) => notify(a.id, "SYSTEM", "New job awaiting review", `"${title}" by ${company.name} needs review.`, "/admin/jobs"))
  );

  return NextResponse.json({ ok: true, jobId: job.id, slug: job.slug });
}
