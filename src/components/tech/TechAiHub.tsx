import Link from "next/link";
import { db } from "@/lib/db";
import { articleImagesFor } from "@/data/articleImages";

/** Word-boundary match so "IT" never matches "with" and "app" never matches "apple". */
const TECH_PATTERN =
  /\b(ai|artificial intelligence|tech|technology|software|developer|programmer|programming|coding|machine learning|robot|semiconductor|chip|cloud|cyber|startup|digital|data|automation)\b/i;

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}

/**
 * Tech & AI hub — server-rendered so Google indexes real article links, not an
 * empty shell. Lists recent articles whose title or excerpt matches tech/AI
 * keywords, newest first, with their hero image when the article has one.
 */
export default async function TechAiHub() {
  const recent = await db.article.findMany({
    orderBy: { publishedAt: "desc" },
    take: 80,
    select: { slug: true, titleEn: true, excerptEn: true, publishedAt: true, category: true },
  });
  const articles = recent
    .filter(
      (a) =>
        a.category !== "taylor-swift" &&
        (TECH_PATTERN.test(a.titleEn) || TECH_PATTERN.test(a.excerptEn))
    )
    .slice(0, 24);

  return (
    <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
        Tech &amp; AI Job News
      </h1>
      <p className="mt-2 text-base leading-relaxed text-slate-600">
        Tech and AI job news — hiring, skills and remote tech roles from around the world, with the
        newest stories first.
      </p>

      {articles.length > 0 ? (
        <ul className="mt-8 space-y-4">
          {articles.map((a) => {
            const images = articleImagesFor(a.slug);
            return (
              <li key={a.slug} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                <Link href={`/articles/${a.slug}`} className="block">
                  {images && (
                    <img
                      src={images[0]}
                      alt={a.titleEn}
                      className="aspect-video w-full object-cover"
                      loading="lazy"
                    />
                  )}
                  <span className="block p-4">
                    <span className="text-xs text-slate-500">
                      {formatDate(a.publishedAt.toISOString())}
                    </span>
                    <span className="mt-1 block text-lg font-bold text-slate-900 hover:underline">
                      {a.titleEn}
                    </span>
                    {a.excerptEn && (
                      <span className="mt-1 block text-sm leading-relaxed text-slate-600">
                        {a.excerptEn}
                      </span>
                    )}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="mt-8 text-base text-slate-600">
          No tech and AI stories yet —{" "}
          <Link href="/articles" className="font-semibold text-emerald-700 hover:underline">
            see all job news
          </Link>
          .
        </p>
      )}

      <p className="mt-10 border-t border-slate-200 pt-6 text-sm text-slate-500">
        <Link href="/articles" className="font-semibold text-emerald-700 hover:underline">
          All job news
        </Link>
      </p>
    </main>
  );
}
