import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";

export async function GET(req: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Not authorized." }, { status: 401 });

  const convos = await db.conversation.findMany({
    where: { OR: [{ studentId: user.id }, { employerId: user.id }] },
    orderBy: { updatedAt: "desc" },
    include: {
      application: { include: { job: { select: { title: true } } } },
      messages: { orderBy: { createdAt: "desc" }, take: 1 },
      _count: { select: { messages: true } },
    },
  });

  const unreadCounts = await Promise.all(
    convos.map((c) =>
      db.message.count({ where: { conversationId: c.id, senderId: { not: user.id }, readAt: null } })
    )
  );

  return NextResponse.json({
    conversations: convos.map((c, i) => {
      const otherId = c.studentId === user.id ? c.employerId : c.studentId;
      return {
        id: c.id, applicationId: c.applicationId, otherId,
        jobTitle: c.application.job.title,
        applicationStatus: c.application.status,
        lastMessage: c.messages[0]?.body || null,
        lastAt: c.messages[0]?.createdAt || c.createdAt,
        unread: unreadCounts[i],
      };
    }),
  });
}

export async function POST(req: Request) {
  const user = await getSessionUser();
  if (!user || user.role !== "EMPLOYER") return NextResponse.json({ error: "Not authorized." }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const applicationId = String(body.applicationId || "");
  if (!applicationId) return NextResponse.json({ error: "Application required." }, { status: 400 });

  const app = await db.application.findFirst({
    where: { id: applicationId, job: { company: { ownerId: user.id } } },
    include: { student: { include: { user: true } } },
  });
  if (!app) return NextResponse.json({ error: "Application not found." }, { status: 404 });

  let convo = await db.conversation.findUnique({ where: { applicationId } });
  if (!convo) {
    convo = await db.conversation.create({
      data: { applicationId, studentId: app.student.user.id, employerId: user.id },
    });
  }
  return NextResponse.json({ ok: true, conversationId: convo.id });
}
