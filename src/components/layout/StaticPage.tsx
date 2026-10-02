import { ReactNode } from "react";

interface StaticPageProps {
  title: string;
  subtitle?: string;
  updated?: string;
  children: ReactNode;
}

export function StaticPage({ title, subtitle, updated, children }: StaticPageProps) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">{title}</h1>
      {subtitle && <p className="mt-2 text-base text-slate-600">{subtitle}</p>}
      {updated && <p className="mt-2 text-xs uppercase tracking-wide text-slate-400">Last updated: {updated}</p>}
      <div className="mt-8">{children}</div>
    </div>
  );
}

export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-8 first:mt-0">
      <h2 className="text-lg font-bold text-slate-900">{title}</h2>
      <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-slate-700">{children}</div>
    </section>
  );
}

export function Bullets({ items }: { items: ReactNode[] }) {
  return (
    <ul className="list-disc space-y-1.5 pl-5">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}
