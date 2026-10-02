import { db } from "@/lib/db";
import { notify } from "@/lib/notifications";

export async function notifyMessage(conversationId: string, senderId: string, body: string) {
  const convo = await db.conversation.findUnique({ where: { id: conversationId } });
  if (!convo) return;
  const recipient = convo.studentId === senderId ? convo.employerId : convo.studentId;
  const sender = await db.user.findUnique({ where: { id: senderId }, select: { name: true } });
  await notify(
    recipient,
    "NEW_MESSAGE",
    "New message",
    `${sender?.name || "Someone"}: ${body.slice(0, 120)}`,
    recipient === convo.employerId ? "/employer/messages" : "/dashboard/messages"
  );
}
