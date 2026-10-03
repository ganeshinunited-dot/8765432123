"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Card, EmptyState } from "@/components/ui/primitives";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { timeAgo } from "@/lib/format";

interface N { id: string; type: string; title: string; body: string | null; link: string | null; read: boolean; createdAt: string }

const ICONS: Record<string, string> = {
  APPLICATION_STATUS: "📋", NEW_MESSAGE: "💬", INTERVIEW_SCHEDULED: "📅",
  JOB_SUBMITTED: "📝", JOB_APPROVED: "✅", JOB_REJECTED: "❌", WELCOME: "👋",
};

export default function NotificationsClient({ homeHref }: { homeHref: string }) {
  const toast = useToast();
  const [items, setItems] = useState<N[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/notifications").then((r) => r.json()).then((d) => setItems(d.notifications || [])).finally(() => setLoading(false));
  }, []);

  async function markRead(id?: string) {
    try {
      await fetch("/api/notifications", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(id ? { id } : { action: "read_all" }) });
      setItems((xs) => xs.map((x) => (id ? (x.id === id ? { ...x, read: true } : x) : { ...x, read: true })));
    } catch {
      toast.push("Could not update.", "error");
    }
  }

  if (loading) return <Card className="p-6 text-sm text-slate-500">Loading…</Card>;

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <Link href={homeHref} className="text-sm font-medium text-emerald-700 hover:underline">← Back</Link>
        {items.some((i) => !i.read) && <Button size="sm" variant="secondary" onClick={() => markRead()}>Mark all as read</Button>}
      </div>
      {items.length === 0 ? (
        <EmptyState title="No notifications yet." description="Updates about your applications, messages and interviews will appear here." />
      ) : (
        <div className="space-y-2.5">
          {items.map((n) => {
            const inner = (
              <div className={`flex gap-3.5 rounded-xl border p-4 transition-colors ${n.read ? "border-slate-200 bg-white" : "border-emerald-200 bg-emerald-50/60"}`}>
                <span className="text-xl" aria-hidden="true">{ICONS[n.type] || "🔔"}</span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-slate-900">{n.title}</p>
                  {n.body && <p className="mt-0.5 text-sm text-slate-600">{n.body}</p>}
                  <p className="mt-1 text-xs text-slate-400">{timeAgo(new Date(n.createdAt))}</p>
                </div>
                {!n.read && <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full gx-btn gx-btn-primary" aria-label="Unread" />}
              </div>
            );
            return n.link ? (
              <Link key={n.id} href={n.link} onClick={() => markRead(n.id)} className="block">{inner}</Link>
            ) : (
              <div key={n.id} onClick={() => markRead(n.id)} className="cursor-pointer">{inner}</div>
            );
          })}
        </div>
      )}
    </div>
  );
}
