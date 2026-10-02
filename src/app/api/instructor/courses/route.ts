import { NextResponse } from "next/server";
import { z } from "zod";
import { getSessionUser } from "@/lib/auth";
import { db } from "@/lib/db";

async function paidInstructor() {
  const user = await getSessionUser();
  if (!user || user.role !== "INSTRUCTOR") return { error: NextResponse.json({ error: "Not authorized." }, { status: 403 }) };
  const profile = await db.instructorProfile.findUnique({ where: { userId: user.id } });
  if (!profile?.isPaid) return { error: NextResponse.json({ error: "Complete billing first." }, { status: 403 }) };
  return { user, profile };
}

export async function GET() {
  const auth = await paidInstructor();
  if ("error" in auth) return auth.error;
  const courses = await db.course.findMany({
    where: { instructorId: auth.profile.id },
    orderBy: { updatedAt: "desc" },
    include: { _count: { select: { videos: true, reviews: true } } },
  });
  return NextResponse.json({ courses });
}

const createSchema = z.object({
  title: z.string().trim().min(3).max(120),
  description: z.string().trim().min(20).max(5000),
  price: z.coerce.number().int().min(0).max(1000000),
  category: z.string().trim().max(60).optional().or(z.literal("")),
  thumbnailUrl: z.string().trim().max(500).optional().or(z.literal("")),
});

function slugify(title: string): string {
  const base = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60) || "course";
  return `${base}-${Date.now().toString(36)}`;
}

export async function POST(req: Request) {
  const auth = await paidInstructor();
  if ("error" in auth) return auth.error;
  const body = await req.json().catch(() => ({}));
  const parsed = createSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
  const course = await db.course.create({
    data: {
      instructorId: auth.profile.id,
      title: parsed.data.title,
      slug: slugify(parsed.data.title),
      description: parsed.data.description,
      price: parsed.data.price,
      category: parsed.data.category || null,
      thumbnailUrl: parsed.data.thumbnailUrl || null,
    },
  });
  return NextResponse.json({ ok: true, id: course.id });
}
