import { NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { db } from "@/lib/db";
import { rateLimit, clientKey } from "@/lib/auth";
import { forgotPasswordSchema } from "@/lib/validation";
import { sendTemplatedEmail } from "@/lib/email";

// Always returns ok — never reveal whether an email has an account.
export async function POST(req: Request) {
  if (!rateLimit(clientKey("forgot-password", req), 3, 3_600_000)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again in an hour." },
      { status: 429 }
    );
  }

  let data: unknown;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }
  const parsed = forgotPasswordSchema.safeParse(data);
  if (!parsed.success) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const user = await db.user.findUnique({ where: { email: parsed.data.email } });
  if (user) {
    const token = randomBytes(32).toString("hex");
    await db.user.update({
      where: { id: user.id },
      data: { resetToken: token, resetTokenExpiry: new Date(Date.now() + 3600 * 1000) },
    });
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://growentix.cloud";
    try {
      await sendTemplatedEmail(user.email, "password_reset", {
        name: user.name,
        reset_url: `${baseUrl}/reset-password?token=${token}`,
      });
    } catch (e) {
      console.error("[forgot-password] reset email failed:", e);
    }
  }
  return NextResponse.json({ ok: true });
}
