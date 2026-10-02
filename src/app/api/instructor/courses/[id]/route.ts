import { NextResponse } from "next/server";
import { z } from "zod";
import { getSessionUser } from "@/lib/auth";
import { db } from "@/lib/db";

async function ownedCourse(userId: string, id: string) {
  const user = await getSessionUser();
  if (!user || user.id !== userId || user.role !== "INSTRUCTOR") return null;
  const profile = await db.instructorProfile.findUnique({ where: { userId } });
  if (!profile?.isPaid) return null;
  return db.course.findFirst({ where: { id, instructorId: profile.id } });
}

const updateSchema = z.object({
  title: z.string().trim().min(3).max(120).optional(),
  description: z.string().trim().min(20).max(5000).optional(),
  price: z.coerce.number().int().min(0).max(1000000).optional(),
  category: z.string().trim().max(60).optional(),
  thumbnailUrl: z.string().trim().max(500).optional(),
  status: z.enum(["DRAFT", "PUBLISHED"]).optional(),
});

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Not authorized." }, { status: 403 });
  const course = await ownedCourse(user.id, id);
  if (!course) return NextResponse.json({ error: "Not found." }, { status: 404 });
  const body = await req.json().catch(() => ({}));
  const parsed = updateSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
  const data: Record<string, unknown> = {};
  if (parsed.data.title !== undefined) data.title = parsed.data.title;
  if (parsed.data.description !== undefined) data.description = parsed.data.description;
  if (parsed.data.price !== undefined) data.price = parsed.data.price;
  if (parsed.data.category !== undefined) data.category = parsed.data.category || null;
  if (parsed.data.thumbnailUrl !== undefined) data.thumbnailUrl = parsed.data.thumbnailUrl || null;
  if (parsed.data.status !== undefined) data.status = parsed.data.status;
  await db.course.update({ where: { id }, data });
  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Not authorized." }, { status: 403 });
  const course = await ownedCourse(user.id, id);
  if (!course) return NextResponse.json({ error: "Not found." }, { status: 404 });
  await db.course.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
