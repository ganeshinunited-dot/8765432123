import type { Metadata } from "next";
import Link from "next/link";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Countries — Jobs by Country",
  description: "Browse job news and vacancies by country — USA, UK, Canada, Australia, Europe, Asia, Gulf, Korea & Japan, and Nepal. Verified vacancies and job news, newest first.",
  alternates: { canonical: "https://growentix.cloud/countries" },
  openGraph: {
    title: "Countries — Jobs by Country | Growentix",
    description: "Browse job news and vacancies by country — USA, UK, Canada, Australia, Europe, Asia, Gulf, Korea & Japan, and Nepal.",
    url: "https://growentix.cloud/countries",
  },
};

const COUNTRIES = [
  {
    href: "/usa",
    label: "United States",
    desc: "USA jobs — federal and state government vacancies, H-1B and H-2A visas, salaries and deadlines.",
  },
  {
    href: "/uk",
    label: "United Kingdom",
    desc: "UK jobs — government and private sector vacancies, Skilled Worker visas, salaries and deadlines.",
  },
  {
    href: "/canada",
    label: "Canada",
    desc: "Canada jobs — federal and provincial vacancies, Express Entry and work permits, salaries and deadlines.",
  },
  {
    href: "/australia",
    label: "Australia",
    desc: "Australia jobs — government and private sector vacancies, skilled migration, salaries and deadlines.",
  },
  {
    href: "/europe",
    label: "Europe",
    desc: "Europe jobs — vacancies across the EU and UK, including Germany, with salaries and deadlines.",
  },
  {
    href: "/asia",
    label: "Asia",
    desc: "Asia jobs — vacancies across the region, including Singapore, India and Japan, with salaries and deadlines.",
  },
  {
    href: "/gulf",
    label: "Gulf",
    desc: "Gulf jobs — vacancies in the UAE, Saudi Arabia, Qatar and across the Gulf, with salaries and deadlines.",
  },
  {
    href: "/korea-japan",
    label: "Korea & Japan",
    desc: "Korea & Japan jobs — EPS, SSW and other work routes, with salaries and deadlines.",
  },
  {
    href: "/nepal",
    label: "Nepal",
    desc: "Nepal jobs — government vacancies, Lok Sewa notices and private sector roles, with deadlines.",
  },
] as const;

export default function CountriesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
      <p className="gx-eyebrow">Countries</p>
      <h1 className="gx-h2 mt-2">Jobs by country</h1>
      <p className="gx-sub mt-2 max-w-2xl">
        Verified vacancies and job news from around the world, newest first. Choose a country to see its
        latest jobs — every article links to its official source.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {COUNTRIES.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="gx-lift group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5"
          >
            <p className="font-sans text-lg font-bold leading-snug text-slate-900 group-hover:text-emerald-800">
              {c.label}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{c.desc}</p>
            <p className="mt-3 text-xs font-semibold text-emerald-700">View jobs →</p>
          </Link>
        ))}
      </div>

      <p className="mt-8 max-w-2xl text-sm leading-relaxed text-slate-600">
        Germany is covered under Europe, Japan under Korea &amp; Japan, Singapore under Asia, and the UAE
        under Gulf. Looking for work anywhere in the world?{" "}
        <Link href="/remote" className="font-semibold text-emerald-700 hover:underline">
          Remote jobs
        </Link>{" "}
        and{" "}
        <Link href="/work-abroad" className="font-semibold text-emerald-700 hover:underline">
          work abroad
        </Link>{" "}
        are listed separately.
      </p>
    </div>
  );
}
