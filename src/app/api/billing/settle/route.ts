import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";
import { notify } from "@/lib/notifications";
import { trackEvent } from "@/lib/klaviyo";

// Settles a payment. For real providers this is called by the provider
// callback after server-side verification. The MOCK driver calls it from
// the dev-only mock checkout page.
export async function POST(req: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Not authorized." }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const paymentId = String(body.paymentId || "");
  const outcome = String(body.outcome || ""); // success | fail

  const payment = await db.payment.findUnique({ where: { id: paymentId }, include: { company: true } });
  if (!payment) return NextResponse.json({ error: "Payment not found." }, { status: 404 });

  // Only the owning employer (or admin) may settle a MOCK payment.
  const isOwner = payment.company.ownerId === user.id;
  const isAdmin = user.isAdmin;
  if (!isOwner && !isAdmin) return NextResponse.json({ error: "Not authorized." }, { status: 403 });
  if (payment.provider !== "MOCK" && !isAdmin) {
    return NextResponse.json({ error: "Only the provider callback can settle this payment." }, { status: 403 });
  }
  if (payment.state !== "PENDING") return NextResponse.json({ error: "Payment already settled." }, { status: 400 });

  if (outcome === "success") {
    const raw = (payment.rawResponse || {}) as Record<string, string>;
    const plan = raw.planSlug ? await db.subscriptionPlan.findUnique({ where: { slug: raw.planSlug } }) : null;

    await db.$transaction(async (tx) => {
      await tx.payment.update({
        where: { id: payment.id },
        data: { state: "SUCCESSFUL", providerRef: payment.provider === "MOCK" ? "mock-ref" : payment.providerRef },
      });
      if (plan) {
        // Expire any current subscription, then activate the new one
        await tx.subscription.updateMany({ where: { companyId: payment.companyId, status: "ACTIVE" }, data: { status: "EXPIRED" } });
        const sub = await tx.subscription.create({
          data: {
            companyId: payment.companyId,
            planId: plan.id,
            status: "ACTIVE",
            endsAt: new Date(Date.now() + 30 * 86400000),
          },
        });
        await tx.payment.update({ where: { id: payment.id }, data: { subscriptionId: sub.id } });
      }
    });

    await notify(
      payment.company.ownerId, "PAYMENT_CONFIRMATION", "Payment successful",
      plan ? `Your ${plan.name} plan is now active.` : "Your payment was successful.",
      "/employer/billing"
    );
    const owner = await db.user.findUnique({ where: { id: payment.company.ownerId }, select: { email: true } });
    if (owner && plan) {
      void trackEvent({
        email: owner.email,
        metric: "Placed Order",
        value: plan.priceMonthly,
        uniqueId: `plan-order-${payment.id}`,
        properties: {
          OrderId: payment.id,
          Items: [{ ProductName: `${plan.name} plan`, planSlug: plan.slug, price: plan.priceMonthly }],
        },
      });
    }
    return NextResponse.json({ ok: true, state: "SUCCESSFUL" });
  }

  await db.payment.update({ where: { id: payment.id }, data: { state: "FAILED" } });
  return NextResponse.json({ ok: true, state: "FAILED" });
}
