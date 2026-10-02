import { db } from "./db";

// Fire-and-forget analytics. Never throws — analytics must never break
// the request that triggered it.
export async function track(userId: string | null, event: string, props?: Record<string, string | number | boolean>) {
  try {
    await db.analyticsEvent.create({
      data: { userId, event, props: props || {} },
    });
  } catch {
    // ignore analytics failures
  }
}
