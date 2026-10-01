import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";
import { logAdminAction } from "@/lib/admin";
import { z } from "zod";

const planSchema = z.object({
  name: z.string().min(2).max(60),
  description: z.string().max(500).optional().or(z.literal("")),
  priceMonthly: z.number().int().min(0),
  jobPostLimit: z.number().int().min(1).max(1000),
  featuredAllowed: z.boolean(),
  candidateSearch: z.boolean(),
  active: z.boolean(),
});

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const admin = await getSessionUser();
  if (!admin || admin.role !== "ADMIN") return NextResponse.json({ error: "Not authorized." }, { status: 403 });

  const body = await req.json().catch(() => ({}));
  const parsed = planSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });

  const plan = await db.subscriptionPlan.update({
    where: { id },
    data: {
      name: parsed.data.name,
      description: parsed.data.description || null,
      priceMonthly: parsed.data.priceMonthly,
      jobPostLimit: parsed.data.jobPostLimit,
      featuredAllowed: parsed.data.featuredAllowed,
      candidateSearch: parsed.data.candidateSearch,
      active: parsed.data.active,
    },
  });

  await logAdminAction(admin.id, "PLAN_UPDATED", "SubscriptionPlan", id, plan.name);
  return NextResponse.json({ ok: true });
}
