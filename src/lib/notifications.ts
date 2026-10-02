import { db } from "./db";
import type { NotificationType } from "@prisma/client";

export async function notify(
  userId: string,
  type: NotificationType,
  title: string,
  body?: string,
  link?: string
): Promise<void> {
  await db.notification.create({
    data: { userId, type, title, body: body ?? null, link: link ?? null },
  });
}

export async function unreadCount(userId: string): Promise<number> {
  return db.notification.count({ where: { userId, readAt: null } });
}
