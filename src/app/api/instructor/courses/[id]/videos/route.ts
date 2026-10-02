import { NextResponse } from "next/server";
import { z } from "zod";
import { getSessionUser } from "@/lib/auth";
import { db } from "@/lib/db";

async function instructorProfile() {
  const user = await getSessionUser();
  if (!user || user.role !== "INSTRUCTOR") return null;
  const profile = await db.instructorProfile.findUnique({ where: { userId: user.id } });
  return profile?.isPaid ? profile : null;
}

const videoSchema = z.object({
  title: z.string().trim().min(2).max(160),
  fileId: z.string().trim().max(80).optional().or(z.literal("")),
  durationSec: z.coerce.number().int().min(0).max(86400).optional(),
});

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const profile = await instructorProfile();
  if (!profile) return NextResponse.json({ error: "Not authorized." }, { status: 403 });
  const course = await db.course.findFirst({ where: { id, instructorId: profile.id } });
  if (!course) return NextResponse.json({ error: "Course not found." }, { status: 404 });
  const body = await req.json().catch(() => ({}));
  const parsed = videoSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });

  if (parsed.data.fileId) {
    const file = await db.uploadedFile.findFirst({ where: { id: parsed.data.fileId, ownerId: profile.userId } });
    if (!file) return NextResponse.json({ error: "File not found." }, { status: 400 });
  }
  const count = await db.courseVideo.count({ where: { courseId: id } });
  const video = await db.courseVideo.create({
    data: {
      courseId: id,
      title: parsed.data.title,
      fileId: parsed.data.fileId || null,
      durationSec: parsed.data.durationSec ?? null,
      position: count,
    },
  });
  return NextResponse.json({ ok: true, id: video.id });
}

