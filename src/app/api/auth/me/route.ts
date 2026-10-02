import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { unreadCount } from "@/lib/notifications";

/** Lightweight session endpoint for client components (e.g. Navbar). */
export async function GET() {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ user: null, unread: 0 });
  const unread = await unreadCount(user.id).catch(() => 0);
  return NextResponse.json({ user, unread });
}
