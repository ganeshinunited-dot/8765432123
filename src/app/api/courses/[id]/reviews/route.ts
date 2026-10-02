import { NextResponse } from "next/server";
import { z } from "zod";
import { getSessionUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { analyzeSentiment, refreshInstructorTrust } from "@/lib/course-reviews";

/** Students review a course they purchased. Reviewer identity stays private — only stars show. */
export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await getSessionUser();
  if (!user || user.role !== "STUDENT") return NextResponse.json({ error: "Students only." }, { status: 403 });

  const course = await db.course.findUnique({ where: { id }, select: { id: true, instructorId: true, status: true } });
  if (!course || course.status !== "PUBLISHED") return NextResponse.json({ error: "Course not found." }, { status: 404 });

  const purchase = await db.coursePurchase.findFirst({ where: { courseId: id, studentId: user.id, status: "COMPLETED" } });
  if (!purchase) return NextResponse.json({ error: "Enroll in the course before reviewing." }, { status: 403 });

  const body = await req.json().catch(() => ({}));
  const parsed = z.object({
    rating: z.number().int().min(1).max(5),
    text: z.string().trim().max(1000).optional().or(z.literal("")),
  }).safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });

  const existing = await db.courseReview.findFirst({ where: { courseId: id, studentId: user.id } });
  if (existing) return NextResponse.json({ error: "You already reviewed this course." }, { status: 409 });

  const sentiment = await analyzeSentiment(parsed.data.text || "", parsed.data.rating);
  await db.courseReview.create({
    data: { courseId: id, studentId: user.id, rating: parsed.data.rating, text: parsed.data.text || null, sentiment },
  });
  await refreshInstructorTrust(course.instructorId);
  return NextResponse.json({ ok: true });
}
