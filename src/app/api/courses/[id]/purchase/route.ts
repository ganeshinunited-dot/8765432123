import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { trackEvent } from "@/lib/klaviyo";

/** Demo enrollment/purchase. Free courses enroll instantly; paid ones complete instantly in demo mode. */
export async function POST(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await getSessionUser();
  if (!user || user.role !== "STUDENT") return NextResponse.json({ error: "Students only." }, { status: 403 });

  const course = await db.course.findUnique({ where: { id }, select: { id: true, instructorId: true, price: true, status: true, title: true, slug: true } });
  if (!course || course.status !== "PUBLISHED") return NextResponse.json({ error: "Course not found." }, { status: 404 });

  const existing = await db.coursePurchase.findFirst({ where: { courseId: id, studentId: user.id } });
  if (existing?.status === "COMPLETED") return NextResponse.json({ ok: true, already: true });

  // Demo checkout is instant: checkout-start and order-complete fire in sequence.
  void trackEvent({
    email: user.email,
    metric: "Started Checkout",
    value: course.price,
    properties: { Items: [{ ProductName: course.title, slug: course.slug, price: course.price }] },
  });

  await db.$transaction([
    db.coursePurchase.upsert({
      where: { courseId_studentId: { courseId: id, studentId: user.id } },
      update: { status: "COMPLETED", amount: course.price },
      create: { courseId: id, studentId: user.id, amount: course.price, status: "COMPLETED" },
    }),
    db.course.update({ where: { id }, data: { sales: { increment: 1 } } }),
    db.instructorProfile.update({ where: { id: course.instructorId }, data: { totalSales: { increment: 1 } } }),
  ]);

  void trackEvent({
    email: user.email,
    metric: "Placed Order",
    value: course.price,
    uniqueId: `course-order-${user.id}-${course.id}`,
    properties: {
      OrderId: `course-${course.id}`,
      Items: [{ ProductName: course.title, slug: course.slug, price: course.price }],
    },
  });
  return NextResponse.json({ ok: true });
}
