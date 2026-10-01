import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";
import { studentProfileSchema } from "@/lib/validation";
import { profileCompletion } from "@/lib/match";

export async function PUT(req: Request) {
  const user = await getSessionUser();
  if (!user || user.role !== "STUDENT") return NextResponse.json({ error: "Not authorized." }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  // Allow partial updates: photoUrl/cvFileId handled separately
  const { photoUrl, cvFileId, ...rest } = body as Record<string, unknown>;
  const parsed = studentProfileSchema.partial().safeParse(rest);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
  const data = parsed.data;

  const profile = await db.studentProfile.findUnique({ where: { userId: user.id } });
  if (!profile) return NextResponse.json({ error: "Profile not found." }, { status: 404 });

  // Validate photo/cv ownership
  if (photoUrl) {
    const f = await db.uploadedFile.findFirst({ where: { id: String(photoUrl), ownerId: user.id, purpose: "PHOTO" } });
    if (!f) return NextResponse.json({ error: "Invalid photo." }, { status: 400 });
  }
  if (cvFileId) {
    const f = await db.uploadedFile.findFirst({ where: { id: String(cvFileId), ownerId: user.id, purpose: "CV" } });
    if (!f) return NextResponse.json({ error: "Invalid CV file." }, { status: 400 });
  }

  const updateData: Record<string, unknown> = {};
  if (data.headline !== undefined) updateData.headline = data.headline || null;
  if (data.bio !== undefined) updateData.bio = data.bio || null;
  if (data.locationId !== undefined) updateData.locationId = data.locationId || null;
  if (data.educationLevel !== undefined) updateData.educationLevel = data.educationLevel || null;
  if (data.college !== undefined) updateData.college = data.college || null;
  if (data.languages !== undefined) updateData.languages = data.languages;
  if (data.availability !== undefined) updateData.availability = data.availability;
  if (data.preferredJobTypes !== undefined) updateData.preferredJobTypes = data.preferredJobTypes;
  if (data.preferredSchedules !== undefined) updateData.preferredSchedules = data.preferredSchedules;
  if (data.preferredArrangement !== undefined) updateData.preferredArrangement = data.preferredArrangement || null;
  if (data.expectedSalaryMin !== undefined) updateData.expectedSalaryMin = data.expectedSalaryMin ?? null;
  if (data.expectedSalaryMax !== undefined) updateData.expectedSalaryMax = data.expectedSalaryMax ?? null;
  if (data.salaryType !== undefined) updateData.salaryType = data.salaryType || null;
  if (data.portfolioLinks !== undefined) updateData.portfolioLinks = data.portfolioLinks;
  if (photoUrl) updateData.photoUrl = `/api/files/${photoUrl}`;
  if (cvFileId) updateData.cvFileId = String(cvFileId);

  // Skills: replace set
  if (data.skills !== undefined) {
    await db.studentSkill.deleteMany({ where: { studentId: profile.id } });
    for (const s of data.skills) {
      const name = s.name.trim();
      if (!name) continue;
      const skill = await db.skill.upsert({ where: { name }, update: {}, create: { name } });
      await db.studentSkill.create({ data: { studentId: profile.id, skillId: skill.id, level: s.level || null } });
    }
  }

  const current = await db.studentProfile.findUnique({ where: { id: profile.id } });
  updateData.profileCompletion = profileCompletion({
    headline: (updateData.headline ?? current?.headline) as string | null,
    bio: (updateData.bio ?? current?.bio) as string | null,
    locationId: (updateData.locationId ?? current?.locationId) as string | null,
    educationLevel: (updateData.educationLevel ?? current?.educationLevel) as string | null,
    college: (updateData.college ?? current?.college) as string | null,
    photoUrl: (updateData.photoUrl ?? current?.photoUrl) as string | null,
    cvFileId: (updateData.cvFileId ?? current?.cvFileId) as string | null,
  });

  await db.studentProfile.update({ where: { id: profile.id }, data: updateData });
  const completion = updateData.profileCompletion as number;
  await db.analyticsEvent.create({ data: { userId: user.id, event: "profile_completed", props: { completion } } });

  return NextResponse.json({ ok: true, completion });
}
