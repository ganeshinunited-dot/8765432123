import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";

// Used by the footer to reconcile the chrome-hint cookie and to hide the
// public footer for signed-in non-admin users. Always 200 — logged out
// is a normal state, not an error.
export async function GET() {
  const user = await getSessionUser();
  return NextResponse.json({ user: user ?? null });
}
