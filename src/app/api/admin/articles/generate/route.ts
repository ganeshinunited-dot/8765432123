import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import {
  parseRss,
  fetchPageText,
  writeArticle,
  type RssItem,
} from "@/lib/articleWriter";

export const maxDuration = 60;

// POST { topic?: string, url?: string, focusKeyword?: string }
// Researches the topic (or fetches the URL) and returns a bilingual draft.
export async function POST(req: Request) {
  const user = await getSessionUser();
  if (!user || !user.isAdmin) {
    return NextResponse.json({ error: "Not authorized." }, { status: 403 });
  }
  if (!process.env.AI_API_KEY) {
    return NextResponse.json({ error: "AI not configured." }, { status: 500 });
  }
  const body = await req.json().catch(() => ({}));
  const topic = String(body.topic ?? "").trim();
  const url = String(body.url ?? "").trim();
  const focusKeyword = String(body.focusKeyword ?? "").trim() || undefined;
  if (!topic && !url) {
    return NextResponse.json(
      { error: "Give a topic or a news URL." },
      { status: 400 }
    );
  }

  let item: RssItem;
  let pageText = "";
  try {
    if (url) {
      pageText = await fetchPageText(url);
      item = {
        title: topic || url,
        link: url,
        pubDate: new Date().toUTCString(),
        publisher: "",
        description: "",
        category: "global",
        country: null,
      };
    } else {
      const rss = await fetch(
        `https://news.google.com/rss/search?q=${encodeURIComponent(
          topic
        )}&hl=en&gl=NP&ceid=NP:en`,
        {
          headers: { "User-Agent": "Mozilla/5.0 (compatible; GrowentixBot/1.0)" },
          signal: AbortSignal.timeout(15_000),
        }
      );
      if (!rss.ok) throw new Error("News search failed.");
      const items = parseRss(await rss.text(), "global", null).filter((i) => i.link);
      if (!items.length) {
        return NextResponse.json(
          { error: "No fresh news found for that topic. Try different words." },
          { status: 404 }
        );
      }
      item = items[0];
      pageText = await fetchPageText(item.link);
    }
  } catch {
    return NextResponse.json(
      { error: "Could not research that right now. Try again." },
      { status: 502 }
    );
  }

  const draft = await writeArticle(item, pageText, focusKeyword);
  if (!draft) {
    return NextResponse.json(
      { error: "AI could not write a draft. Try again." },
      { status: 502 }
    );
  }
  return NextResponse.json({
    ok: true,
    draft: { ...draft, sources: [item.link] },
    researched: { title: item.title, publisher: item.publisher, link: item.link },
  });
}
