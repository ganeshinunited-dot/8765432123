"use client";

import { ReactNode } from "react";

export function Tabs({
  tabs,
  active,
  onChange,
}: {
  tabs: { id: string; label: string; count?: number }[];
  active: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="flex gap-1 overflow-x-auto border-b border-slate-200" role="tablist">
      {tabs.map((t) => (
        <button
          key={t.id}
          role="tab"
          aria-selected={active === t.id}
          onClick={() => onChange(t.id)}
          className={`flex min-h-[44px] items-center gap-2 whitespace-nowrap border-b-2 px-4 text-sm font-medium transition-colors ${
            active === t.id
              ? "border-emerald-700 text-emerald-800"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          {t.label}
          {t.count !== undefined && (
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-600">{t.count}</span>
          )}
        </button>
      ))}
    </div>
  );
}

export function Table({
  headers,
  rows,
  empty,
}: {
  headers: string[];
  rows: ReactNode[][];
  empty?: ReactNode;
}) {
  if (!rows.length && empty) return <>{empty}</>;
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200">
      <table className="w-full min-w-[640px] border-collapse bg-white text-left text-sm">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50">
            {headers.map((h) => (
              <th key={h} className="px-4 py-3 font-semibold text-slate-600">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/60">
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 align-top text-slate-800">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Pagination({
  page,
  totalPages,
  onPage,
}: {
  page: number;
  totalPages: number;
  onPage: (p: number) => void;
}) {
  if (totalPages <= 1) return null;
  const pages: (number | "…")[] = [];
  for (let p = 1; p <= totalPages; p++) {
    if (p === 1 || p === totalPages || Math.abs(p - page) <= 1) pages.push(p);
    else if (pages[pages.length - 1] !== "…") pages.push("…");
  }
  return (
    <nav className="flex items-center justify-center gap-1.5" aria-label="Pagination">
      <PageBtn disabled={page <= 1} onClick={() => onPage(page - 1)} label="Previous page">‹</PageBtn>
      {pages.map((p, i) =>
        p === "…" ? (
          <span key={`e${i}`} className="px-2 text-slate-400">…</span>
        ) : (
          <PageBtn key={p} active={p === page} onClick={() => onPage(p)} label={`Page ${p}`}>{p}</PageBtn>
        )
      )}
      <PageBtn disabled={page >= totalPages} onClick={() => onPage(page + 1)} label="Next page">›</PageBtn>
    </nav>
  );
}

function PageBtn({ children, active, disabled, onClick, label }: { children: ReactNode; active?: boolean; disabled?: boolean; onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      aria-current={active ? "page" : undefined}
      className={`flex h-10 min-w-10 items-center justify-center rounded-lg px-2 text-sm font-medium transition-colors disabled:opacity-40 ${
        active ? "bg-emerald-700 text-white" : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
      }`}
    >
      {children}
    </button>
  );
}
