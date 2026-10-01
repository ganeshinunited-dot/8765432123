import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { hashPassword, rateLimit, clientKey, destroySession } from "@/lib/auth";

// POST /api/auth/reset-password { token, password }
export async function POST(req: NextRequest) {
  if (!rateLimit(clientKey("reset", req), 5, 60_000)) {
    return NextResponse.json({ error: "Too many requests. Try again in a minute." }, { status: 429 });
  }
  let body: { token?: string; password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const token = (body.token || "").trim();
  const password = body.password || "";
  if (!token) return NextResponse.json({ error: "Reset token is required." }, { status: 400 });
  if (password.length < 8) return NextResponse.json({ error: "Password must be at least 8 characters." }, { status: 400 });

  const user = await db.user.findUnique({ where: { resetToken: token } });
  if (!user || !user.resetTokenExpiry || user.resetTokenExpiry < new Date()) {
    return NextResponse.json({ error: "This reset link is invalid or has expired." }, { status: 400 });
  }
  const passwordHash = await hashPassword(password);
  await db.user.update({
    where: { id: user.id },
    data: { passwordHash, resetToken: null, resetTokenExpiry: null },
  });
  // Invalidate all sessions so a compromised session can't linger.
  await db.session.deleteMany({ where: { userId: user.id } });
  await destroySession().catch(() => {});
  return NextResponse.json({ ok: true, message: "Password updated. You can now log in." });
}
