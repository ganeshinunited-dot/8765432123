# Klaviyo marketing integration

Growentix syncs verified users and customer events to Klaviyo **server-side only**.
Transactional email (OTP, login, password reset, email verification) is **never**
sent through Klaviyo — it stays in `src/lib/email.ts`.

## Configuration (manual user step)

1. In the Klaviyo dashboard: **Settings → API Keys → Create Private API Key**.
2. Create a marketing **List** (e.g. "Growentix marketing", single opt-in).
3. Add as Vercel environment variables (Production):
   - `KLAVIYO_PRIVATE_KEY` — server-only, never `NEXT_PUBLIC_`
   - `KLAVIYO_MARKETING_LIST_ID`

Until both are set, the integration is a **safe no-op** (server warns, nothing breaks).

## Module

`src/lib/klaviyo.ts` — server-only, key read from env at call time.

- `trackEvent({ email, metric, properties, value, uniqueId })` — POST `/api/events/`
  (202). Profile is created on first use from the email.
- `upsertProfile({ email, firstName, lastName, properties })` — POST
  `/api/profile-import/`, idempotent by email. Never touches consent.
- `setEmailConsent({ email, consented })` — subscribes/unsubscribes
  `KLAVIYO_MARKETING_LIST_ID` via the profile-subscription bulk jobs.

All functions swallow failures (warn to server logs) — call them fire-and-forget
**after** the DB commit: `void trackEvent({...})`.

## Events fired

| Metric (standard name) | When (single server-side point) | Properties |
|---|---|---|
| `Signed Up` | `POST /api/auth/register` success | `role`, `marketing_opt_in` · unique_id `signup-<userId>` |
| `Logged In` | `POST /api/auth/login` success (fresh credential login only) | `role` |
| `Subscribed to Email Marketing` | Email verified with opt-in, or consent toggle ON | `source`: `email_verification` / `settings_toggle` |
| `Unsubscribed from Email Marketing` | Consent toggle OFF | `source`: `settings_toggle` |
| `Viewed Product` | Course detail page render (logged-in viewers) | `ProductName`, `slug`, `price`, `category` |
| `Viewed Job` | `POST /api/track/view` `{ kind: "job" }` on job page view (logged-in viewers) | `JobTitle`, `slug`, `company` |
| `Started Checkout` | `POST /api/billing/checkout` success (employer plan); start of `POST /api/courses/[id]/purchase` (course demo checkout) | `value`, `items` |
| `Placed Order` | `POST /api/billing/settle` success (employer plan); `POST /api/instructor/billing/complete` (Creator Yearly); `POST /api/courses/[id]/purchase` after commit | `value`, `OrderId`, `Items` · unique_id per order |

Notes:
- No cart exists in the product, so no `Added to Cart` event is fired.
- Signup does **not** subscribe anyone — subscription happens only on explicit
  consent (opt-in checkbox + verified email, or the settings toggle).
- The browser never calls Klaviyo; the client only pings our own
  `/api/track/view`, and that single API route fires the Klaviyo event.

## Consent model

- `User.marketingOptIn` (boolean, default `false`) is the source of truth.
- Signup form has an **unchecked** checkbox: "Email me job alerts, course offers & updates".
- `/profile` has a subscribe/unsubscribe toggle → `POST /api/marketing-consent`.
- We never market to non-consented users: list subscription requires
  `marketingOptIn === true` (checked at verification and at toggle time).

## Building flows in the Klaviyo dashboard

With the metrics above, these standard flows can be built without code changes:

1. **Welcome Email** — trigger: metric `Subscribed to Email Marketing`
   (fires on verification with opt-in). Add a time delay + follow-up emails.
2. **Abandoned cart / checkout** — trigger: `Started Checkout`, flow filter:
   "has not `Placed Order` since starting this flow". (Course demo checkout is
   instant, so this mainly applies if a real multi-step checkout is added.)
3. **Post-purchase** — trigger: `Placed Order`. Segment by `Items` / `value`
   for course upsells or employer plan renewals.
4. **Browse abandonment** — trigger: `Viewed Product` or `Viewed Job`, filter:
   "has not `Placed Order` since". Good for course reminders.
5. **Win-back** — segment: subscribed profiles with no `Logged In` event in
   60 days.

Standard metric names (`Viewed Product`, `Started Checkout`, `Placed Order`)
are used deliberately so Klaviyo's built-in e-commerce flow templates recognize them.
