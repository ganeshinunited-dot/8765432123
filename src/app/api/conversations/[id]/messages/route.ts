import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSessionUser, rateLimit, clientKey } from "@/lib/auth";
import { notifyMessage } from "@/lib/messaging";

async function ownConvo(userId: string, id: string) {
  return db.conversation.findFirst({
    where: { id, OR: [{ studentId: userId }, { employerId: userId }] },
  });
}

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Not authorized." }, { status: 401 });

  const convo = await ownConvo(user.id, id);
  if (!convo) return NextResponse.json({ error: "Not found." }, { status: 404 });

  const messages = await db.message.findMany({
    where: { conversationId: id },
    orderBy: { createdAt: "asc" },
    take: 200,
    include: { sender: { select: { name: true } } },
  });

  // Mark others' messages as read
  await db.message.updateMany({
    where: { conversationId: id, senderId: { not: user.id }, readAt: null },
    data: { readAt: new Date() },
  });

  return NextResponse.json({
    messages: messages.map((m) => ({
      id: m.id, body: m.body, senderId: m.senderId, senderName: m.sender.name,
      mine: m.senderId === user.id, createdAt: m.createdAt,
    })),
  });
}

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!rateLimit(clientKey("msg", req), 30, 60_000)) {
    return NextResponse.json({ error: "Too many messages. Slow down." }, { status: 429 });
  }
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Not authorized." }, { status: 401 });

  const convo = await ownConvo(user.id, id);
  if (!convo) return NextResponse.json({ error: "Not found." }, { status: 404 });
  if (convo.blockedById) return NextResponse.json({ error: "This conversation is blocked." }, { status: 403 });

  const body = await req.json().catch(() => ({}));
  const text = String(body.body || "").trim();
  if (!text) return NextResponse.json({ error: "Message cannot be empty." }, { status: 400 });
  if (text.length > 2000) return NextResponse.json({ error: "Message too long." }, { status: 400 });

  const msg = await db.message.create({ data: { conversationId: id, senderId: user.id, body: text } });
  await db.conversation.update({ where: { id }, data: { updatedAt: new Date() } });
  await notifyMessage(id, user.id, text);

  return NextResponse.json({ ok: true, message: { id: msg.id, body: msg.body, createdAt: msg.createdAt, mine: true } });
}
