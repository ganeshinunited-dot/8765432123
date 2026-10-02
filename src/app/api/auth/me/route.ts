import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { unreadCount } from "@/lib/notifications";
import { getViewMode } from "@/lib/view-mode";
import { db } from "@/lib/db";

/** Lightweight session endpoint for client components (e.g. Navbar). */
export async function GET() {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ user: null, unread: 0, view: "employer", hasCompany: false });
  const unread = await unreadCount(user.id).catch(() => 0);
  const view = await getViewMode(user.role === "ADMIN");
  let hasCompany = false;
  let companyName: string | null = null;
  if (user.role === "ADMIN") {
    const company = await db.company.findFirst({ where: { ownerId: user.id }, select: { name: true } });
    hasCompany = !!company;
    companyName = company?.name || null;
  }
  return NextResponse.json({ user, unread, view, hasCompany, companyName });
}
