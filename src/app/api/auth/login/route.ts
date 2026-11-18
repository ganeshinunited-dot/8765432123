import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { createSession, verifyPassword, rateLimit, clientKey } from "@/lib/auth";
import { loginSchema } from "@/lib/validation";

export async function POST(req: Request) {
  if (!rateLimit(clientKey("login", req), 5, 60_000)) {
    return NextResponse.json(
      { error: "Too many sign-in attempts. Please try again in a minute." },
      { status: 429 }
    );
  }

  let data: unknown;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }
  const parsed = loginSchema.safeParse(data);
  if (!parsed.success) {
    return NextResponse.json({ error: "Please enter your email and password." }, { status: 400 });
  }

  const user = await db.user.findUnique({ where: { email: parsed.data.email } });
  // Same message for unknown email and wrong password — never reveal
  // which accounts exist.
  if (!user || !(await verifyPassword(parsed.data.password, user.passwordHash))) {
    return NextResponse.json({ error: "Email or password is incorrect." }, { status: 401 });
  }
  if (user.status !== "ACTIVE") {
    return NextResponse.json({ error: "This account is not active." }, { status: 403 });
  }

  await createSession(user.id, user.isAdmin);
  const redirectTo = user.isAdmin
    ? "/admin/verifications"
    : user.role === "EMPLOYER"
      ? "/for-employers"
      : "/";
  return NextResponse.json({
    ok: true,
    redirectTo,
    user: { name: user.name, email: user.email, role: user.role, isAdmin: user.isAdmin },
  });
}
