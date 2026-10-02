"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/fields";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/primitives";
import { useToast } from "@/components/ui/Toast";
import { timeAgo } from "@/lib/format";

interface Convo {
  id: string; applicationId: string; jobTitle: string; applicationStatus: string;
  lastMessage: string | null; lastAt: string; unread: number;
}
interface Msg { id: string; body: string; senderId: string; mine: boolean; createdAt: string }

export default function MessagesClient() {
  const toast = useToast();
  const searchParams = useSearchParams();
  const toApplication = searchParams.get("to");
  const [convos, setConvos] = useState<Convo[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/conversations");
        const d = await res.json();
        const list: Convo[] = d.conversations || [];
        setConvos(list);

        // Deep-link: ?to=<applicationId> — find or create the conversation
        if (toApplication) {
          let match: Convo | undefined = list.find((c) => c.applicationId === toApplication);
          if (!match) {
            const cr = await fetch("/api/conversations", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ applicationId: toApplication }),
            });
            const cd = await cr.json().catch(() => ({}));
            if (cr.ok && cd.conversationId) {
              // Refresh list to include the new conversation
              const rr = await fetch("/api/conversations");
              const rd = await rr.json();
              const refreshed: Convo[] = rd.conversations || [];
              setConvos(refreshed);
              match = refreshed.find((c) => c.id === cd.conversationId);
            }
          }
          if (match) setActiveId(match.id);
        } else if (list.length > 0 && !activeId) {
          setActiveId(list[0].id);
        }
      } catch {
        toast.push("Could not load messages.", "error");
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toApplication]);

  useEffect(() => {
    if (!activeId) return;
    fetch(`/api/conversations/${activeId}/messages`)
      .then((r) => r.json())
      .then((d) => {
        setMessages(d.messages || []);
        setConvos((cs) => cs.map((c) => (c.id === activeId ? { ...c, unread: 0 } : c)));
      })
      .catch(() => toast.push("Could not load thread.", "error"));
  }, [activeId, toast]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function send() {
    const text = draft.trim();
    if (!text || !activeId || sending) return;
    setSending(true);
    try {
      const res = await fetch(`/api/conversations/${activeId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body: text }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Could not send.");
      setMessages((ms) => [...ms, { ...data.message, senderId: "", mine: true }]);
      setDraft("");
    } catch (e) {
      toast.push(e instanceof Error ? e.message : "Could not send.", "error");
    } finally {
      setSending(false);
    }
  }

  const active = convos.find((c) => c.id === activeId);

  if (loading) return <Card className="p-6 text-sm text-slate-500">Loading messages…</Card>;

  return (
    <div className="grid gap-4 md:grid-cols-[320px_1fr]">
      <Card className="divide-y divide-slate-100 overflow-hidden">
        {convos.length === 0 && <p className="p-5 text-sm text-slate-500">No conversations yet. Messages appear here once an employer contacts you about an application.</p>}
        {convos.map((c) => (
          <button
            key={c.id}
            onClick={() => setActiveId(c.id)}
            className={`block w-full px-4 py-3.5 text-left hover:bg-slate-50 ${c.id === activeId ? "bg-emerald-50" : ""}`}
          >
            <div className="flex items-center justify-between gap-2">
              <p className="truncate text-sm font-semibold text-slate-900">{c.jobTitle}</p>
              {c.unread > 0 && <span className="rounded-full bg-emerald-600 px-2 py-0.5 text-[11px] font-bold text-white">{c.unread}</span>}
            </div>
            <p className="truncate text-xs text-slate-500">{c.lastMessage || "No messages yet"}</p>
            <p className="mt-0.5 text-[11px] text-slate-400">{timeAgo(new Date(c.lastAt))}</p>
          </button>
        ))}
      </Card>

      <Card className="flex min-h-[420px] flex-col">
        {!active ? (
          <div className="flex flex-1 items-center justify-center p-8 text-sm text-slate-500">Select a conversation to start chatting.</div>
        ) : (
          <>
            <div className="border-b border-slate-100 px-5 py-3">
              <p className="text-sm font-bold text-slate-900">{active.jobTitle}</p>
              <p className="text-xs text-slate-500">Only discuss this job here. Never pay to apply or receive a job.</p>
            </div>
            <div className="flex-1 space-y-2.5 overflow-y-auto px-5 py-4" role="log" aria-label="Messages">
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.mine ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-sm ${m.mine ? "bg-emerald-700 text-white" : "bg-slate-100 text-slate-900"}`}>
                    <p>{m.body}</p>
                    <p className={`mt-1 text-[10px] ${m.mine ? "text-emerald-200" : "text-slate-400"}`}>{timeAgo(new Date(m.createdAt))}</p>
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>
            <form
              className="flex gap-2 border-t border-slate-100 p-3"
              onSubmit={(e) => { e.preventDefault(); send(); }}
            >
              <Input name="message" aria-label="Type a message" placeholder="Type a message…" value={draft} onChange={(e) => setDraft(e.target.value)} maxLength={2000} />
              <Button type="submit" loading={sending} disabled={!draft.trim()}>Send</Button>
            </form>
          </>
        )}
      </Card>
    </div>
  );
}
