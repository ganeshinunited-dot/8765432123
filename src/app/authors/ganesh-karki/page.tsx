import type { Metadata } from "next";
import Link from "next/link";
import { AUTHOR } from "@/lib/author";
import { VerifiedBadge } from "@/components/articles/VerifiedBadge";
import { Section } from "@/components/layout/StaticPage";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Ganesh Karki",
  description:
    "Ganesh Karki is the founder of Growentix. He writes every article on Growentix and checks each vacancy against its official source before publication.",
  alternates: { canonical: "https://growentix.cloud/authors/ganesh-karki" },
};

export default function AuthorPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="flex items-center gap-4">
        <span
          aria-hidden="true"
          className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-slate-900 text-xl font-bold text-white"
        >
          GK
        </span>
        <div>
          <h1 className="flex items-center gap-2 text-3xl font-bold tracking-tight text-slate-900">
            {AUTHOR.name}
            <VerifiedBadge className="h-7 w-7" />
          </h1>
          <p className="mt-1 text-base text-slate-600">{AUTHOR.role}</p>
        </div>
      </div>

      <div className="mt-8">
        <Section title="About">
          <p>{AUTHOR.bio}</p>
        </Section>

        <Section title="On Growentix">
          <p>
            Every article on Growentix is written and checked by Ganesh, with its official sources linked at
            the bottom of the page. Before a vacancy is published, he verifies it against the original
            notice — the job title, the deadline, who can apply, and the official application link — under
            the site&apos;s{" "}
            <Link href="/verification-policy" className="font-semibold text-emerald-700 hover:underline">
              Verification Policy
            </Link>
            . If a deadline passes, the post is marked closed; if the details change, it is updated.
          </p>
        </Section>

        <Section title="Elsewhere">
          <ul className="list-disc space-y-1.5 pl-5">
            <li>
              <a
                href={AUTHOR.portfolioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-emerald-700 hover:underline"
              >
                ganeshkarki.info.np
              </a>{" "}
              — personal portfolio
            </li>
            <li>
              <a
                href={AUTHOR.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-emerald-700 hover:underline"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <Link href="/" className="font-semibold text-emerald-700 hover:underline">
                Growentix
              </Link>{" "}
              — the job news site he founded
            </li>
          </ul>
        </Section>
      </div>
    </div>
  );
}
