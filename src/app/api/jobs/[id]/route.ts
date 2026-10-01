import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";
import { jobPostSchema } from "@/lib/validation";

async function ownJob(userId: string, id: string) {
  return db.job.findFirst({ where: { id, company: { ownerId: userId } } });
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await getSessionUser();
  if (!user || user.role !== "EMPLOYER") return NextResponse.json({ error: "Not authorized." }, { status: 401 });

  const job = await ownJob(user.id, id);
  if (!job) return NextResponse.json({ error: "Job not found." }, { status: 404 });
  if (!["DRAFT", "REJECTED", "PAUSED"].includes(job.status)) {
    return NextResponse.json({ error: "Only draft, paused or rejected jobs can be edited." }, { status: 400 });
  }

  const body = await req.json().catch(() => ({}));
  const parsed = jobPostSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
  const data = parsed.data;

  await db.job.update({
    where: { id },
    data: {
      title: data.title.trim(),
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
      // Editing a rejected/paused job sends it back for review
      status: job.status === "REJECTED" || job.status === "PAUSED" ? "PENDING_REVIEW" : job.status,
    },
  });

  await db.jobSkill.deleteMany({ where: { jobId: id } });
  for (const name of data.skills) {
    const skill = await db.skill.upsert({ where: { name: name.trim() }, update: {}, create: { name: name.trim() } });
    await db.jobSkill.create({ data: { jobId: id, skillId: skill.id } });
  }

  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await getSessionUser();
  if (!user || user.role !== "EMPLOYER") return NextResponse.json({ error: "Not authorized." }, { status: 401 });

  const job = await ownJob(user.id, id);
  if (!job) return NextResponse.json({ error: "Job not found." }, { status: 404 });

  // Soft-close: keep record + applications, hide from search
  await db.job.update({ where: { id }, data: { status: "EXPIRED", expiresAt: new Date() } });
  return NextResponse.json({ ok: true });
}

// Pause / resume
export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await getSessionUser();
  if (!user || user.role !== "EMPLOYER") return NextResponse.json({ error: "Not authorized." }, { status: 401 });

  const job = await ownJob(user.id, id);
  if (!job) return NextResponse.json({ error: "Job not found." }, { status: 404 });

  const body = await req.json().catch(() => ({}));
  if (body.action === "pause" && job.status === "ACTIVE") {
    await db.job.update({ where: { id }, data: { status: "PAUSED" } });
    return NextResponse.json({ ok: true, status: "PAUSED" });
  }
  if (body.action === "resume" && job.status === "PAUSED") {
    await db.job.update({ where: { id }, data: { status: "ACTIVE" } });
    return NextResponse.json({ ok: true, status: "ACTIVE" });
  }
  return NextResponse.json({ error: "Invalid action." }, { status: 400 });
}
