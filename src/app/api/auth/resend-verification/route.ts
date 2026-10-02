import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { db } from "@/lib/db";
import { getSessionUser, rateLimit, clientKey } from "@/lib/auth";
import { sendTemplatedEmail } from "@/lib/email";

// POST /api/auth/resend-verification (authenticated, unverified users)
export async function POST(req: NextRequest) {
  if (!rateLimit(clientKey("resend-verify", req), 3, 60_000)) {
    return NextResponse.json({ error: "Too many requests. Try again in a minute." }, { status: 429 });
  }
  const session = await getSessionUser();
  if (!session) return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  if (session.emailVerified) return NextResponse.json({ ok: true, message: "Email already verified." });

  const token = crypto.randomBytes(32).toString("hex");
  const expiry = new Date(Date.now() + 24 * 60 * 60 * 1000);
  await db.user.update({
    where: { id: session.id },
    data: { emailVerifyToken: token, emailVerifyExpiry: expiry },
  });
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  try {
    await sendTemplatedEmail(session.email, "email_verification", {
      name: session.name,
      verify_url: `${appUrl}/verify-email?token=${token}`,
    });
  } catch (e) {
    console.error("Failed to send verification email:", e);
    return NextResponse.json({ error: "Could not send the email. Please try again later." }, { status: 502 });
  }
  return NextResponse.json({ ok: true, message: "Verification email sent." });
}
