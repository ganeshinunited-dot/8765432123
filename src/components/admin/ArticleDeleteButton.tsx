"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function ArticleDeleteButton({ id, title }: { id: string; title: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  async function remove() {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setBusy(true);
    await fetch(`/api/admin/articles/${id}`, { method: "DELETE" });
    router.refresh();
  }
  return (
    <button
      type="button"
      onClick={remove}
      disabled={busy}
      className="rounded-lg px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 disabled:opacity-50"
    >
      {busy ? "Deleting…" : "Delete"}
    </button>
  );
}
