"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

/**
 * Workspace switcher for admins: flip between the Admin Console
 * and the Employer workspace without logging out.
 */
export function ViewSwitcher({ view, companyName }: { view: "admin" | "employer"; companyName?: string | null }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function switchTo(next: "admin" | "employer") {
    if (next === view || busy) return;
    setBusy(true);
    try {
      const res = await fetch("/api/view", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ view: next }),
      });
      if (!res.ok) throw new Error();
      router.push(next === "admin" ? "/admin/home" : "/employer/home");
      router.refresh();
    } catch {
      setBusy(false);
    }
  }

  return (
    <div className="hidden items-center rounded-lg bg-slate-100 p-1 sm:flex" role="group" aria-label="Switch workspace">
      {(["employer", "admin"] as const).map((v) => (
        <button
          key={v}
          type="button"
          disabled={busy}
          onClick={() => switchTo(v)}
          aria-pressed={view === v}
          title={v === "employer" ? (companyName ? `Employer workspace — ${companyName}` : "Employer workspace") : "Admin console"}
          className={`rounded-md px-3 py-1.5 text-xs font-bold transition-colors ${
            view === v ? "bg-slate-900 text-white shadow-sm" : "text-slate-500 hover:text-slate-800"
          }`}
        >
          {v === "employer" ? "Employer" : "Admin"}
        </button>
      ))}
    </div>
  );
}
