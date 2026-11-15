"use client";

import { useEffect, useState } from "react";

type Comment = {
  id: string;
  name: string;
  body: string;
  createdAt: string;
};

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}

export function CommentSection({ slug }: { slug: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState("");
  const [posting, setPosting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/articles/${slug}/comments`)
      .then((res) => (res.ok ? res.json() : { comments: [] }))
      .then((data: { comments?: Comment[] }) => {
        if (!cancelled) setComments(data.comments ?? []);
      })
      .catch(() => {
        /* comments stay empty; the form still works */
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!name.trim() || !body.trim()) {
      setError("Please add your name and a comment.");
      return;
    }
    setPosting(true);
    try {
      const res = await fetch(`/api/articles/${slug}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), body: body.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error ?? "Could not post your comment. Please try again.");
        return;
      }
      setComments((prev) => [data.comment as Comment, ...prev]);
      setBody("");
    } catch {
      setError("Could not post your comment. Please try again.");
    } finally {
      setPosting(false);
    }
  }

  return (
    <section className="mt-12 border-t border-slate-200 pt-8">
      <h2 className="text-xl font-semibold text-slate-900">
        Comments {comments.length > 0 && `(${comments.length})`}
      </h2>

      <form onSubmit={submit} className="mt-5 space-y-3">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          maxLength={50}
          className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
        />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Share your thoughts…"
          rows={4}
          maxLength={1000}
          className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={posting}
          className="rounded-full bg-emerald-700 px-5 py-2 text-sm font-semibold text-white hover:bg-emerald-800 disabled:opacity-50"
        >
          {posting ? "Posting…" : "Post comment"}
        </button>
      </form>

      <div className="mt-8 space-y-5">
        {loading && <p className="text-sm text-slate-500">Loading comments…</p>}
        {!loading && comments.length === 0 && (
          <p className="text-sm text-slate-500">
            No comments yet — be the first to share your thoughts.
          </p>
        )}
        {comments.map((c) => (
          <div key={c.id} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
            <p className="text-sm font-semibold text-slate-900">
              {c.name}
              <span className="ml-2 text-xs font-normal text-slate-500">
                {formatDate(c.createdAt)}
              </span>
            </p>
            <p className="mt-1 whitespace-pre-wrap text-sm text-slate-700">{c.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
