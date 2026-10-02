import { db } from "./db";
import type { PaymentProvider, PaymentState } from "@prisma/client";

// Payment abstraction. Driver via PAYMENT_DRIVER: mock | esewa | khalti.
// The MOCK driver simulates the provider flow for development. eSewa/Khalti
// drivers build the real signed request payloads — they need merchant
// credentials (see .env.example / SETUP.md) and are never faked as successful.

export interface CheckoutRequest {
  companyId: string;
  subscriptionId?: string;
  amount: number; // NPR
  provider: PaymentProvider;
  returnUrl: string;
}

export interface CheckoutResult {
  paymentId: string;
  redirectUrl?: string; // provider-hosted checkout page
  mockApproveUrl?: string; // MOCK driver only
}

export async function createCheckout(req: CheckoutRequest): Promise<CheckoutResult> {
  const driver = process.env.PAYMENT_DRIVER || "mock";
  const payment = await db.payment.create({
    data: {
      companyId: req.companyId,
      subscriptionId: req.subscriptionId ?? null,
      provider: req.provider,
      amount: req.amount,
      state: "PENDING",
    },
  });

  if (driver === "mock" || req.provider === "MOCK") {
    return {
      paymentId: payment.id,
      mockApproveUrl: `/billing/mock-checkout/${payment.id}`,
    };
  }

  if (req.provider === "ESEWA") {
    assertEnv(["ESEWA_MERCHANT_ID", "ESEWA_SECRET_KEY"]);
    // eSewa v2 API: build signed form payload and redirect the user to
    // https://rc-epay.esewa.com.np/api/epay/main/v2/form (test) with
    // signature = HMAC_SHA256(secret, "total_amount,transaction_uuid,product_code")
    return { paymentId: payment.id, redirectUrl: `/api/payments/esewa/start?paymentId=${payment.id}` };
  }

  if (req.provider === "KHALTI") {
    assertEnv(["KHALTI_SECRET_KEY"]);
    // Khalti ePayment v2: server initiates via
    // POST https://dev-pay.khalti.com/api/v2/epayment/initiate/
    // then redirects user to the returned payment_url.
    return { paymentId: payment.id, redirectUrl: `/api/payments/khalti/start?paymentId=${payment.id}` };
  }

  throw new Error(`Unsupported payment provider: ${req.provider}`);
}

export async function settlePayment(
  paymentId: string,
  state: PaymentState,
  providerRef?: string,
  rawResponse?: unknown
): Promise<void> {
  await db.payment.update({
    where: { id: paymentId },
    data: { state, providerRef: providerRef ?? null, rawResponse: (rawResponse as object) ?? undefined },
  });
}

function assertEnv(names: string[]): void {
  const missing = names.filter((n) => !process.env[n]);
  if (missing.length) {
    throw new Error(
      `Missing payment credentials: ${missing.join(", ")}. Add them to .env (see .env.example).`
    );
  }
}
