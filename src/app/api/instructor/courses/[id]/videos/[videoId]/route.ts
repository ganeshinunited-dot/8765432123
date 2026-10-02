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

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string; videoId: string }> }) {
  const { id, videoId } = await params;
  const profile = await instructorProfile();
  if (!profile) return NextResponse.json({ error: "Not authorized." }, { status: 403 });
  const course = await db.course.findFirst({ where: { id, instructorId: profile.id } });
  if (!course) return NextResponse.json({ error: "Course not found." }, { status: 404 });
  await db.courseVideo.deleteMany({ where: { id: videoId, courseId: id } });
  return NextResponse.json({ ok: true });
}
