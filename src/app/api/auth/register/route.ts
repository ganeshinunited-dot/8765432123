import { NextResponse } from "next/server";
import { z } from "zod";
import crypto from "crypto";
import { db } from "@/lib/db";
import { hashPassword, createSession, rateLimit, clientKey } from "@/lib/auth";
import { registerSchema } from "@/lib/validation";
import { notify } from "@/lib/notifications";
import { sendTemplatedEmail } from "@/lib/email";
import { track } from "@/lib/analytics";

export async function POST(req: Request) {
  if (!rateLimit(clientKey("register", req), 10, 60_000)) {
    return NextResponse.json({ error: "Too many attempts. Please try again later." }, { status: 429 });
  }
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const parsed = registerSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
  }
  const { name, email, phone, password, role } = parsed.data;
  const normalizedEmail = email.toLowerCase().trim();

  const existing = await db.user.findFirst({
    where: { OR: [{ email: normalizedEmail }, ...(phone ? [{ phone }] : [])] },
    select: { id: true },
  });
  if (existing) {
    return NextResponse.json({ error: "An account with this email or phone already exists." }, { status: 409 });
  }

  const verifyToken = crypto.randomBytes(32).toString("hex");
  const verifyExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
  const user = await db.user.create({
    data: {
      name: name.trim(),
      email: normalizedEmail,
      phone: phone?.trim() || null,
      passwordHash: await hashPassword(password),
      role,
      emailVerifyToken: verifyToken,
      emailVerifyExpiry: verifyExpiry,
    },
  });

  if (role === "STUDENT") {
    await db.studentProfile.create({ data: { userId: user.id } });
    await db.analyticsEvent.create({ data: { userId: user.id, event: "signup", props: { role } } });
  }
  if (role === "INSTRUCTOR") {
    const { randomVerifyThreshold } = await import("@/lib/course-reviews");
    await db.instructorProfile.create({ data: { userId: user.id, autoVerifyAt: randomVerifyThreshold() } });
  }

  await notify(user.id, "SYSTEM", "Welcome to Growentix", role === "INSTRUCTOR" ? "Complete billing to start selling your courses." : "Complete your profile to get better job matches.", role === "STUDENT" ? "/profile" : role === "INSTRUCTOR" ? "/instructor/billing" : "/employer/company");
  sendTemplatedEmail(normalizedEmail, "welcome", { name: user.name }).catch(() => {});
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  sendTemplatedEmail(normalizedEmail, "email_verification", {
    name: user.name,
    verify_url: `${appUrl}/verify-email?token=${verifyToken}`,
  }).catch((e) => console.error("Failed to send verification email:", e));

  await createSession(user.id);
  track(user.id, "signup", { role });
  return NextResponse.json({ ok: true, role });
}

// CSRF: logout is a state-changing action — accept POST only, and verify origin.
export async function GET() {
  return NextResponse.json({ error: "Method not allowed." }, { status: 405 });
}
