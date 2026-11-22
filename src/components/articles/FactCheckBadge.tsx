import { VERDICT_LABELS, VERDICT_STYLES, type FactCheckVerdict } from "@/lib/factCheck";

function formatShortDate(iso: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(iso));
}

/**
 * Verdict banner + "Claim checked" box for fact-check articles.
 * Rendered near the top of the article, above the body. The verdict is
 * the editors' rating of the claim (stored on the article row); the
 * confidence score and how it was reached are stated in the article body.
 */
export function FactCheckBadge({
  verdict,
  claim,
  claimant,
  claimUrl,
  checkedAt,
}: {
  verdict: FactCheckVerdict;
  claim: string;
  claimant: string | null;
  claimUrl: string | null;
  checkedAt: string | null;
}) {
  const styles = VERDICT_STYLES[verdict];
  const label = VERDICT_LABELS[verdict];
  let claimHost: string | null = null;
  if (claimUrl) {
    try {
      claimHost = new URL(claimUrl).hostname.replace(/^www\./, "");
    } catch {
      claimHost = null;
    }
  }
  return (
    <section aria-label="Fact-check verdict" className="mt-6">
      <div className={`rounded-xl border-2 p-5 ${styles.banner}`}>
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Verdict</p>
        <p className="mt-2 flex flex-wrap items-center gap-3">
          <span className={`inline-flex items-center rounded-full px-4 py-1.5 text-base font-bold ${styles.pill}`}>
            {label}
          </span>
          {checkedAt && (
            <span className="text-sm text-slate-600">Checked {formatShortDate(checkedAt)}</span>
          )}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-slate-700">
          Growentix checked this claim against primary sources. The evidence and the
          confidence score are in the article below — including what is still unknown.
        </p>
      </div>

      <div className="mt-4 rounded-xl border border-slate-200 bg-white p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Claim checked</p>
        <blockquote className="mt-2 text-base font-semibold leading-snug text-slate-900">
          &ldquo;{claim}&rdquo;
        </blockquote>
        <dl className="mt-3 space-y-1 text-sm text-slate-600">
          {claimant && (
            <div className="flex flex-wrap gap-x-2">
              <dt className="font-semibold text-slate-900">Claimed by:</dt>
              <dd>{claimant}</dd>
            </div>
          )}
          {claimUrl && (
            <div className="flex flex-wrap gap-x-2">
              <dt className="font-semibold text-slate-900">Seen on:</dt>
              <dd>
                <a
                  href={claimUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-emerald-700 hover:underline"
                >
                  {claimHost ?? claimUrl}
                </a>
              </dd>
            </div>
          )}
        </dl>
      </div>
    </section>
  );
}
