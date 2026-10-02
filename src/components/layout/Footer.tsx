import Link from "next/link";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <Logo />
            </div>
            <p className="mt-3 text-sm text-slate-600">
              Part-time, evening, weekend and remote job opportunities for students across Nepal — from verified employers.
            </p>
          </div>
          <nav aria-label="Job seekers">
            <h3 className="text-sm font-semibold text-slate-900">Job Seekers</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li><Link href="/jobs" className="hover:text-emerald-700">Find jobs</Link></li>
              <li><Link href="/jobs?type=PART_TIME" className="hover:text-emerald-700">Part-time jobs</Link></li>
              <li><Link href="/jobs?arrangement=REMOTE" className="hover:text-emerald-700">Remote jobs</Link></li>
              <li><Link href="/jobs?type=INTERNSHIP" className="hover:text-emerald-700">Internships</Link></li>
              <li><Link href="/safety" className="hover:text-emerald-700">Job seeker safety</Link></li>
            </ul>
          </nav>
          <nav aria-label="Employers">
            <h3 className="text-sm font-semibold text-slate-900">Employers</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li><Link href="/for-employers" className="hover:text-emerald-700">Post a job</Link></li>
              <li><Link href="/companies" className="hover:text-emerald-700">Companies</Link></li>
              <li><Link href="/pricing" className="hover:text-emerald-700">Pricing</Link></li>
              <li><Link href="/employer-guidelines" className="hover:text-emerald-700">Employer guidelines</Link></li>
            </ul>
          </nav>
          <nav aria-label="Company">
            <h3 className="text-sm font-semibold text-slate-900">Company</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li><Link href="/about" className="hover:text-emerald-700">About</Link></li>
              <li><Link href="/support" className="hover:text-emerald-700">Help &amp; Support</Link></li>
              <li><Link href="/faq" className="hover:text-emerald-700">FAQ</Link></li>
              <li><Link href="/terms" className="hover:text-emerald-700">Terms of service</Link></li>
              <li><Link href="/privacy" className="hover:text-emerald-700">Privacy policy</Link></li>
            </ul>
          </nav>
        </div>
        <div className="mt-10 border-t border-slate-200 pt-6 text-center text-sm text-slate-500">
          <p className="mb-2 font-medium text-amber-700">Never pay an employer to apply for or receive a job.</p>
          <p>© {new Date().getFullYear()} Growentix. A job marketplace — we do not guarantee employment.</p>
        </div>
      </div>
    </footer>
  );
}
