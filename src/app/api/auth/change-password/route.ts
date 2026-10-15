import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import {
  getSessionUser,
  hashPassword,
  verifyPassword,
  rateLimit,
  clientKey,
  destroySession,
} from "@/lib/auth";

// POST /api/auth/change-password { currentPassword, newPassword }
// Logged-in users only. Lets a user replace their password without the
// email reset flow (which cannot deliver mail until Resend is configured).
export async function POST(req: NextRequest) {
  if (!rateLimit(clientKey("change-pw", req), 5, 60_000)) {
    return NextResponse.json({ error: "Too many requests. Try again in a minute." }, { status: 429 });
  }
  const sessionUser = await getSessionUser();
  if (!sessionUser) return NextResponse.json({ error: "You must be logged in." }, { status: 401 });

  let body: { currentPassword?: string; newPassword?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const currentPassword = body.currentPassword || "";
  const newPassword = body.newPassword || "";
  if (!currentPassword) return NextResponse.json({ error: "Current password is required." }, { status: 400 });
  if (newPassword.length < 8)
    return NextResponse.json({ error: "New password must be at least 8 characters." }, { status: 400 });
  if (newPassword === currentPassword)
    return NextResponse.json({ error: "New password must be different from the current one." }, { status: 400 });

  const user = await db.user.findUnique({ where: { id: sessionUser.id } });
  if (!user) return NextResponse.json({ error: "Account not found." }, { status: 404 });
  if (!(await verifyPassword(currentPassword, user.passwordHash))) {
    return NextResponse.json({ error: "Current password is incorrect." }, { status: 400 });
  }

  await db.user.update({
    where: { id: user.id },
    data: { passwordHash: await hashPassword(newPassword) },
  });
  // Invalidate all sessions (including this one) so a leaked old password
  // cannot keep any session alive. The user logs in again with the new one.
  await db.session.deleteMany({ where: { userId: user.id } });
  await destroySession().catch(() => {});
  return NextResponse.json({ ok: true, message: "Password updated. Please log in again." });
}
