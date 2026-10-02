# SETUP.md — Local development, production deploy, admin bootstrap

## 1. Local development

### Prerequisites
- Node.js 20+ (tested on 24)
- PostgreSQL 14+ (or a hosted Postgres like Supabase/Neon)

### Steps

```bash
cd job-platform
npm install

# 1. Configure environment
cp .env.example .env
# Edit .env — at minimum set:
#   DATABASE_URL="postgresql://user:password@localhost:5432/jobplatform"
#   SESSION_SECRET="$(openssl rand -hex 32)"
#   NEXT_PUBLIC_APP_URL="http://localhost:3000"

# 2. Create database + apply schema
createdb jobplatform            # or create via your provider's dashboard
npx prisma migrate dev          # applies prisma/migrations/*

# 3. Generate client + seed demo data
npx prisma generate
npm run seed

# 4. Run
npm run dev                     # http://localhost:3000
```

### Seed accounts (password: `password123`)
| Email | Role | Notes |
|---|---|---|
| `student@example.com` | STUDENT | Completed profile, saved jobs |
| `employer@example.com` | EMPLOYER | Demo company + active jobs |
| `admin@example.com` | ADMIN | Full admin access |

The seed is idempotent — safe to re-run. Demo content is clearly marked.

### Useful commands
```bash
npx tsc --noEmit        # typecheck
npx eslint .            # lint
npm run build           # production build check
npx prisma studio       # database GUI at :5555
```

## 2. Environment variables

Full reference in `.env.example`. Key groups:

| Group | Vars | Fallback |
|---|---|---|
| Database | `DATABASE_URL` | — (required) |
| App | `NEXT_PUBLIC_APP_URL`, `SESSION_SECRET`, `SESSION_COOKIE_NAME` | — (required) |
| Storage | `STORAGE_DRIVER`=`local`\|`s3`, `UPLOAD_DIR`, `S3_STORAGE_*` | local disk |
| Email | `EMAIL_DRIVER`=`log`\|`smtp`\|`resend`, `EMAIL_FROM` | log (console) |
| Payments | `PAYMENT_DRIVER`=`mock`\|`esewa`\|`khalti` | mock (dev only) |
| Maps | `MAPS_PROVIDER`=`none`\|`google`\|`mapbox` | none |
| OAuth | `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` | disabled |
| Admin seed | `ADMIN_EMAIL`, `ADMIN_PASSWORD` | seed only |

**Never commit `.env`.** It is gitignored.

## 3. Production deploy (Vercel + hosted Postgres)

1. **Database** — create a Postgres database (Supabase, Neon, RDS…). Note the connection string.
2. **Vercel** — import the repo, set framework preset to Next.js.
3. **Env vars** — in Vercel project settings, add:
   - `DATABASE_URL` (use the pooled connection string if provided)
   - `SESSION_SECRET` (generate: `openssl rand -hex 32`)
   - `NEXT_PUBLIC_APP_URL` (`https://your-domain.com`)
   - `STORAGE_DRIVER=s3` + `S3_STORAGE_*` (local disk is ephemeral on Vercel — **do not use local storage in production**)
   - `EMAIL_DRIVER=smtp` or `resend` + credentials
   - `PAYMENT_DRIVER=esewa` or `khalti` + credentials (see §5)
4. **Migrations** — run once against production DB:
   ```bash
   DATABASE_URL="<prod-url>" npx prisma migrate deploy
   ```
5. **Seed (optional)** — for a fresh production DB you probably want an admin but *not* demo jobs. Create the admin via the seed's admin-only path or manually:
   ```bash
   DATABASE_URL="<prod-url>" ADMIN_EMAIL="you@company.com" ADMIN_PASSWORD="<strong-password>" npm run seed
   ```
   Then delete demo data via `/admin` or SQL if seeded.
6. **Deploy** — `git push` to the connected branch.

### Production checklist
- [ ] `SESSION_SECRET` is a fresh 32-byte random value (not the dev one)
- [ ] `STORAGE_DRIVER=s3` (local uploads vanish on redeploy)
- [ ] `EMAIL_DRIVER` is `smtp` or `resend` (not `log`)
- [ ] `PAYMENT_DRIVER` is `esewa`/`khalti` with live credentials (not `mock`)
- [ ] `NEXT_PUBLIC_APP_URL` matches the production domain (used in emails/payment callbacks)
- [ ] Database has `prisma migrate deploy` applied
- [ ] Admin account created, demo accounts removed/disabled
- [ ] HTTPS enforced (Vercel does this by default)
- [ ] Review rate-limit thresholds in `src/lib/auth.ts` for production traffic

## 4. Admin bootstrap

The first admin is created by the seed script using `ADMIN_EMAIL`/`ADMIN_PASSWORD` from `.env`. To promote another user later, an existing admin can… (currently: via database — set `role='ADMIN'` on the user row):

```sql
UPDATE "User" SET role='ADMIN' WHERE email='new-admin@example.com';
```

## 5. Payments (eSewa / Khalti)

The payment layer is a provider abstraction in `src/lib/payments.ts`.

- **Dev:** `PAYMENT_DRIVER=mock` — checkout redirects to a local demo approval page. No real money moves. The mock page is blocked in non-mock modes.
- **eSewa:** set `PAYMENT_DRIVER=esewa`, `ESEWA_MERCHANT_ID`, `ESEWA_SECRET_KEY`, `ESEWA_MODE=test|live`. Implement the provider handshake in `src/lib/payments.ts` (`esewaCheckout`) following eSewa's v2 API docs, then wire the callback route.
- **Khalti:** set `PAYMENT_DRIVER=khalti`, `KHALTI_PUBLIC_KEY`, `KHALTI_SECRET_KEY`. Same pattern.

The settle endpoint (`/api/billing/settle`) only accepts provider callbacks for non-mock payments — browser-initiated settle is rejected with 403.

**Never mark a payment successful without server-side verification from the provider.**

## 6. Email

- `EMAIL_DRIVER=log` — writes emails to the server console (dev default).
- `smtp` — set `EMAIL_SMTP_HOST/PORT/USER/PASS`.
- `resend` — set `RESEND_API_KEY`.

Templates live in `src/lib/email.ts` (`sendTemplatedEmail`).

## 7. Troubleshooting

| Symptom | Likely cause |
|---|---|
| `P1001` can't reach DB | Postgres not running / wrong `DATABASE_URL` |
| Prisma "engine not found" | Run `npx prisma generate`; offline envs need the schema-engine binary (see AGENTS.md) |
| Uploads 404 after redeploy | Local driver on ephemeral disk — switch to S3 |
| Session lost on refresh | `SESSION_SECRET` changed between deploys, or cookie not HTTPS on custom domain |
| `/jobs` 500 in dev | Stale dev server — kill old `next dev` processes and restart |
