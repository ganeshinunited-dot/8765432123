import { NextResponse } from "next/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

// GET /api/auth/verify-email?token=… — marks the owner's email verified
// and sends them to sign in. The admin approve button stays disabled
// until this happens (or the admin confirms contact manually).
export async function GET(req: Request) {
  const token = new URL(req.url).searchParams.get("token") ?? "";
  if (!token) redirect("/login?verify=invalid");

  const user = await db.user.findUnique({ where: { emailVerifyToken: token } });
  if (!user || !user.emailVerifyExpiry || user.emailVerifyExpiry < new Date()) {
    redirect("/login?verify=expired");
  }

  await db.user.update({
    where: { id: user.id },
    data: { emailVerified: true, emailVerifyToken: null, emailVerifyExpiry: null },
  });
  redirect("/login?verified=1");
}
