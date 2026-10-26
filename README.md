<p align="center">
  <img src="src/app/icon.svg" width="96" height="96" alt="Growentix logo" />
</p>

<h1 align="center">Growentix</h1>

<p align="center">
  <strong>Daily Job News &amp; Vacancy Notices — Nepal &amp; Abroad</strong><br />
  <a href="https://growentix.cloud">Website</a> •
  <a href="https://growentix.cloud/about">About</a> •
  <a href="https://growentix.cloud/privacy">Privacy</a> •
  <a href="https://growentix.cloud/terms">Terms</a> •
  <a href="https://growentix.cloud/support">Support</a>
</p>

---

## About

Growentix is a job news platform covering Nepal and the world. It publishes
daily job news and vacancy notices — Nepal government vacancies alongside
international hiring news from the USA, UK, Canada, Australia, Europe, Asia,
the Gulf, Korea &amp; Japan, and remote work worldwide.

Everything published is real: notices carry the deadline and seat count stated
by the source, articles are attributed to their sources, and figures are never
guessed. If a source does not state a fact, we say so instead of filling the
gap.

## What readers get

- **Daily job news** — new articles every day, in English with a Nepali version
  inside each article (language picker on the article page).
- **Nepal government vacancy notices** — current notices with deadlines,
  searchable and filterable by category.
- **International coverage** — dedicated sections for the USA, UK, Canada,
  Australia, Europe, Asia, the Gulf, Korea &amp; Japan, Remote, and Work Abroad.
- **Guides and a weekly roundup** — practical how-to guides and a Saturday
  roundup of the week's openings.
- **Trending, from real readers** — the homepage surfaces the most-read stories
  from actual visits, not editorial picks.
- **Search** — one dedicated search page for the site's stories and notices.
- **Privacy-friendly visit analytics** — first-party, cookie-free visit counting.

## Editorial standard

- Real sources only — no invented listings, figures, or deadlines.
- Source attribution in the article text.
- Scam caution wherever readers are asked to pay or share documents:
  **never pay anyone to apply for a job.**
- British English throughout the public site.

## ChatGPT app

Growentix ships an official read-only integration for ChatGPT (MCP server) at
`https://growentix.cloud/api/mcp`. Five tools expose live vacancy notices and
articles — expired vacancies are never shown as active, and fields the source
data does not carry are left out rather than guessed.

## For developers

### Stack

- **Next.js 16** (App Router) + React 19 + TypeScript + Tailwind CSS v4
- **PostgreSQL** via Prisma 7 (`@prisma/adapter-pg`)
- **Vercel** hosting + scheduled content pipelines (daily articles, weekly guides
  and roundup, article images)

### Quick start

```bash
npm install
cp .env.example .env        # fill in DATABASE_URL at minimum
npx prisma migrate dev      # or: npx prisma db push (quick local)
npx prisma generate
npm run dev                 # http://localhost:3000
```

See [SETUP.md](SETUP.md) for the full local setup and production checklist.

### Project structure

```
src/
  app/            # Pages + API routes (public pages, /api/cron/*, /api/mcp)
  components/     # UI
  data/           # Curated vacancy notices, article image manifest
  lib/            # db, articleWriter, mcp, ai, analytics
prisma/
  schema.prisma   # Data model
  migrations/     # Schema + content migrations
scripts/          # Build-time helpers (article image decoding)
article-image-sources/  # Generated article artwork sources
```

### Environment

All secrets live in environment variables — see `.env.example`. Optional
integrations (email, storage, payments) are configured via environment variables
and degrade gracefully when absent.

### Scripts

| Script | Purpose |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npx prisma studio` | Database GUI |

## License

Proprietary — all rights reserved.
