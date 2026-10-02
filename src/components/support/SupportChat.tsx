"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { Alert } from "@/components/ui/primitives";

interface Msg {
  role: "user" | "assistant";
  text: string;
}

const STARTERS = [
  "How do I apply for a job?",
  "How do I post a job?",
  "How do I upload my CV?",
  "What are the employer plans?",
  "How does company verification work?",
  "Is it safe? What should I avoid?",
];

const GREETING: Msg = {
  role: "assistant",
  text: "Namaste! I'm the Growentix Support Assistant. Ask me anything about using this platform — applying for jobs, posting jobs, verification, pricing, safety and more.",
};

export function SupportChat() {
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [messages, busy]);

  async function ask(question: string) {
    const q = question.trim();
    if (!q || busy) return;
    setError("");
    setInput("");
    setMessages((m) => [...m, { role: "user", text: q }]);
    setBusy(true);
    try {
      const res = await fetch("/api/ai/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setMessages((m) => [...m, { role: "assistant", text: data.answer }]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not reach the assistant. Try again.");
    } finally {
      setBusy(false);
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    ask(input);
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 bg-emerald-800 px-4 py-3 sm:px-5">
        <p className="text-sm font-semibold text-white">Growentix Support Assistant</p>
        <p className="text-xs text-emerald-100">Ask how anything on this platform works — replies in seconds.</p>
      </div>

      <div className="max-h-[26rem] space-y-3 overflow-y-auto px-4 py-4 sm:px-5" aria-live="polite">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[85%] whitespace-pre-wrap rounded-xl px-3.5 py-2.5 text-sm leading-relaxed ${
                m.role === "user" ? "bg-emerald-700 text-white" : "bg-slate-100 text-slate-800"
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
        {busy && <p className="text-sm text-slate-500">Assistant is typing…</p>}
        <div ref={bottomRef} />
      </div>

      <div className="border-t border-slate-100 px-4 pt-3 sm:px-5">
        <div className="flex flex-wrap gap-1.5">
          {STARTERS.map((s) => (
            <button
              key={s}
              type="button"
              disabled={busy}
              onClick={() => ask(s)}
              className="rounded-full border border-slate-300 px-2.5 py-1 text-xs font-medium text-slate-700 hover:border-emerald-600 hover:text-emerald-800 disabled:opacity-50"
            >
              {s}
            </button>
          ))}
        </div>
        {error && (
          <div className="mt-3">
            <Alert tone="rose">{error}</Alert>
          </div>
        )}
        <form onSubmit={onSubmit} className="flex gap-2 py-3">
          <label htmlFor="support-q" className="sr-only">
            Ask a support question
          </label>
          <input
            id="support-q"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g. How do I withdraw my application?"
            className="h-11 flex-1 rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/25"
          />
          <button
            type="submit"
            disabled={busy || input.trim().length < 2}
            className="inline-flex h-11 items-center rounded-lg bg-emerald-700 px-4 text-sm font-semibold text-white hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {busy ? "Asking…" : "Ask"}
          </button>
        </form>
      </div>
    </div>
  );
}
