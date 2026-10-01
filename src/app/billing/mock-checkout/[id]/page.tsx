import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";
import MockCheckoutClient from "./MockCheckoutClient";

export const dynamic = "force-dynamic";

// Development-only mock payment page. Real eSewa/Khalti flows redirect to
// the provider's hosted checkout instead of this page.
export default async function MockCheckoutPage({ params }: { params: Promise<{ id: string }> }) {
  if ((process.env.PAYMENT_DRIVER || "mock") !== "mock") notFound();
  const { id } = await params;
  const user = await getSessionUser();
  if (!user) notFound();

  const payment = await db.payment.findUnique({
    where: { id },
    include: { company: true, subscription: { include: { plan: true } } },
  });
  if (!payment || payment.company.ownerId !== user.id || payment.state !== "PENDING") notFound();

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <div className="rounded-2xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
        <span className="font-bold">Demo checkout.</span> No real money moves here. Configure eSewa/Khalti credentials for production.
      </div>
      <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-6">
        <h1 className="text-lg font-bold text-slate-900">Pay NPR {payment.amount.toLocaleString()}</h1>
        <p className="mt-1 text-sm text-slate-600">
          {payment.subscription?.plan.name} plan · {payment.company.name}
        </p>
        <p className="mt-1 font-mono text-xs text-slate-400">Mock provider · {payment.id.slice(0, 8)}</p>
        <div className="mt-6">
          <MockCheckoutClient paymentId={payment.id} />
        </div>
      </div>
    </div>
  );
}
