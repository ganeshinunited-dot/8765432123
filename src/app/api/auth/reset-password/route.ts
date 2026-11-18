import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { hashPassword, rateLimit, clientKey } from "@/lib/auth";
import { resetPasswordSchema } from "@/lib/validation";

export async function POST(req: Request) {
  if (!rateLimit(clientKey("reset-password", req), 5, 3_600_000)) {
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
  const parsed = resetPasswordSchema.safeParse(data);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return NextResponse.json(
      { error: first?.message || "Please check the form and try again." },
      { status: 400 }
    );
  }

  const user = await db.user.findUnique({ where: { resetToken: parsed.data.token } });
  if (!user || !user.resetTokenExpiry || user.resetTokenExpiry < new Date()) {
    return NextResponse.json(
      { error: "This reset link is invalid or has expired. Request a new one." },
      { status: 400 }
    );
  }

  await db.user.update({
    where: { id: user.id },
    data: {
      passwordHash: await hashPassword(parsed.data.password),
      resetToken: null,
      resetTokenExpiry: null,
    },
  });
  return NextResponse.json({ ok: true });
}
