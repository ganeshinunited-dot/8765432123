import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyPassword, createSession, rateLimit, clientKey, destroySession } from "@/lib/auth";
import { loginSchema } from "@/lib/validation";
import { trackEvent } from "@/lib/klaviyo";

export async function POST(req: Request) {
  if (!rateLimit(clientKey("login", req), 15, 60_000)) {
    return NextResponse.json({ error: "Too many attempts. Please try again later." }, { status: 429 });
  }
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
  }
  const user = await db.user.findUnique({ where: { email: parsed.data.email.toLowerCase().trim() } });
  if (!user || !(await verifyPassword(parsed.data.password, user.passwordHash))) {
    return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
  }
  if (user.status !== "ACTIVE") {
    return NextResponse.json({ error: "This account has been suspended. Please contact support." }, { status: 403 });
  }
  await createSession(user.id);
  // Fresh credential login only — session refreshes never hit this route.
  void trackEvent({ email: user.email, metric: "Logged In", properties: { role: user.role } });
  return NextResponse.json({ ok: true, role: user.role });
}

export async function DELETE() {
  await destroySession();
  return NextResponse.json({ ok: true });
}
