import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { rateLimit, clientKey } from "@/lib/auth";

// POST /api/auth/verify-email { token }
export async function POST(req: NextRequest) {
  if (!rateLimit(clientKey("verify", req), 10, 60_000)) {
    return NextResponse.json({ error: "Too many requests. Try again in a minute." }, { status: 429 });
  }
  let body: { token?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const token = (body.token || "").trim();
  if (!token) return NextResponse.json({ error: "Verification token is required." }, { status: 400 });

  const user = await db.user.findUnique({ where: { emailVerifyToken: token } });
  if (!user || !user.emailVerifyExpiry || user.emailVerifyExpiry < new Date()) {
    return NextResponse.json({ error: "This verification link is invalid or has expired." }, { status: 400 });
  }
  await db.user.update({
    where: { id: user.id },
    data: { emailVerified: true, emailVerifyToken: null, emailVerifyExpiry: null },
  });
  return NextResponse.json({ ok: true, message: "Email verified. Thank you!" });
}
