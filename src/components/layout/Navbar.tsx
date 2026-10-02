import Link from "next/link";
import { NavAuth } from "./NavAuth";
import { Logo } from "./Logo";

const links = [
  { href: "/jobs", label: "Find Jobs" },
  { href: "/companies", label: "Companies" },
  { href: "/for-employers", label: "For Employers" },
  { href: "/resources", label: "Resources" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center" aria-label="Growentix home">
          <Logo />
        </Link>
        <nav className="ml-4 hidden items-center gap-1 lg:flex" aria-label="Primary">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <NavAuth />
        </div>
      </div>
    </header>
  );
}
