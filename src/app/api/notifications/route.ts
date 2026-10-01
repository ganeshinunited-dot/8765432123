import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";

export async function GET() {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Not authorized." }, { status: 401 });

  const notifications = await db.notification.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return NextResponse.json({
    notifications: notifications.map((n) => ({
      id: n.id, type: n.type, title: n.title, body: n.body, link: n.link,
      read: !!n.readAt, createdAt: n.createdAt,
    })),
  });
}

export async function POST(req: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Not authorized." }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  if (body.action === "read_all") {
    await db.notification.updateMany({ where: { userId: user.id, readAt: null }, data: { readAt: new Date() } });
    return NextResponse.json({ ok: true });
  }
  if (body.id) {
    await db.notification.updateMany({ where: { id: body.id, userId: user.id }, data: { readAt: new Date() } });
    return NextResponse.json({ ok: true });
  }
  return NextResponse.json({ error: "Invalid action." }, { status: 400 });
}
