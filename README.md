# Student Jobs Nepal

A job marketplace connecting students in Nepal with part-time work, internships, and flexible gigs. Students use the platform **free forever**; employers pay for job-posting plans.

**⚠️ Safety first:** Never pay an employer to apply for or receive a job. This warning appears in the site footer and on every application flow.

## Stack

- **Next.js 16** (App Router) + React 19 + TypeScript + Tailwind CSS v4
- **PostgreSQL** via Prisma 7 (`@prisma/adapter-pg`)
- Custom **scrypt** password hashing, hashed session tokens in HTTP-only cookies
- Provider abstractions: storage (local/S3), email (log/SMTP/Resend), payments (mock/eSewa/Khalti), maps (none/Google/Mapbox)

## Quick start

```bash
npm install
cp .env.example .env        # fill in DATABASE_URL + SESSION_SECRET at minimum
npx prisma migrate dev      # or: npx prisma db push (quick local)
npx prisma generate
npm run seed                # demo data + test accounts
npm run dev                 # http://localhost:3000
```

Test accounts (password `password123`):
- `student@example.com` — student
- `employer@example.com` — employer
- `admin@example.com` — admin

See **[SETUP.md](SETUP.md)** for the full local setup, production checklist, and admin bootstrap.

## Project structure

```
src/
  app/            # Routes (public pages, dashboards, API routes)
    (public)      # /, /jobs, /companies, SEO landing pages, /p/[slug]
    dashboard/    # Student: home, profile, applications, saved, messages, interviews
    employer/     # Employer: home, company, jobs, applicants, messages, billing
    admin/        # Admin: home, jobs, verifications, reports, users, companies, plans, cms, audit
    api/          # REST APIs (auth, jobs, applications, messaging, billing, admin…)
  components/     # UI primitives, forms, dashboards, SEO
  lib/            # auth, db, validation, storage, email, payments, notifications, analytics
prisma/
  schema.prisma   # Normalized data model
  seed.ts         # Idempotent demo seed
```

## Key features

**Students**
- Browse/search/filter jobs, save jobs, apply with cover note + CV
- Profile with skills, education, documents; match-scored recommendations
- Applications tracker, interview accept/decline/reschedule, messaging, notifications

**Employers**
- Company profile + verification (document upload, admin review)
- 4-step job posting wizard with validation → admin moderation queue
- Applicant pipeline (view → shortlist → interview → hire/reject), secure CV access
- Messaging, interview scheduling, subscription plans + billing (eSewa/Khalti/mock)

**Admin**
- Dashboard metrics, job moderation (approve/reject/takedown), verification review
- Reports triage, user suspend/reactivate, company oversight, plan editor, CMS pages, audit log

**Platform**
- SEO landing pages (`/part-time-jobs`, `/internships`, …), company directory, sitemap, robots
- Rate limiting, server-side authorization on every mutation, private CV access control
- Analytics events (signup, job_view, application_submitted)

## Environment

All secrets live in environment variables — see `.env.example`. Missing payment/email/maps credentials never block unrelated features; each has a documented fallback driver.

## Scripts

| Script | Purpose |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run seed` | Seed demo data (idempotent) |
| `npx prisma studio` | Database GUI |

## License

Proprietary — all rights reserved.
