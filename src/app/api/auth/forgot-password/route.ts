import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { db } from "@/lib/db";
import { rateLimit, clientKey } from "@/lib/auth";
import { sendTemplatedEmail } from "@/lib/email";

// POST /api/auth/forgot-password { email }
// Always returns 200 to avoid leaking which emails are registered.
export async function POST(req: NextRequest) {
  if (!rateLimit(clientKey("forgot", req), 5, 60_000)) {
    return NextResponse.json({ error: "Too many requests. Try again in a minute." }, { status: 429 });
  }
  let body: { email?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const email = (body.email || "").trim().toLowerCase();
  if (!email) return NextResponse.json({ error: "Email is required." }, { status: 400 });

  const user = await db.user.findUnique({ where: { email } });
  if (user) {
    const token = crypto.randomBytes(32).toString("hex");
    const expiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
    await db.user.update({ where: { id: user.id }, data: { resetToken: token, resetTokenExpiry: expiry } });
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    try {
      await sendTemplatedEmail(email, "password_reset", {
        name: user.name,
        app_name: "Growentix",
        reset_url: `${appUrl}/reset-password?token=${token}`,
      });
    } catch (e) {
      console.error("Failed to send password reset email:", e);
    }
  }
  return NextResponse.json({ ok: true, message: "If an account exists for that email, a reset link has been sent." });
}
