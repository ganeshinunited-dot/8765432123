import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";
import { createCheckout } from "@/lib/payments";
import { z } from "zod";

const schema = z.object({
  planSlug: z.string().min(1),
  provider: z.enum(["ESEWA", "KHALTI", "MOCK"]),
});

export async function POST(req: Request) {
  const user = await getSessionUser();
  if (!user || user.role !== "EMPLOYER") return NextResponse.json({ error: "Not authorized." }, { status: 401 });

  const company = await db.company.findFirst({ where: { ownerId: user.id } });
  if (!company) return NextResponse.json({ error: "Create your company profile first." }, { status: 400 });

  const body = await req.json().catch(() => ({}));
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  const plan = await db.subscriptionPlan.findUnique({ where: { slug: parsed.data.planSlug, active: true } });
  if (!plan) return NextResponse.json({ error: "Plan not found." }, { status: 404 });

  // Reject if already on an equal-or-better active plan
  const current = await db.subscription.findFirst({
    where: { companyId: company.id, status: "ACTIVE" },
    orderBy: { startedAt: "desc" },
    include: { plan: true },
  });
  if (current && current.plan.priceMonthly >= plan.priceMonthly) {
    return NextResponse.json({ error: "You're already on this plan or a better one." }, { status: 400 });
  }

  try {
    const result = await createCheckout({
      companyId: company.id,
      amount: plan.priceMonthly,
      provider: parsed.data.provider,
      returnUrl: `${process.env.APP_URL || "http://localhost:3000"}/employer/billing`,
    });
    // Remember which plan this payment is for
    await db.payment.update({ where: { id: result.paymentId }, data: { rawResponse: { planSlug: plan.slug } } });
    return NextResponse.json({ ok: true, ...result });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Could not start checkout." }, { status: 400 });
  }
}
