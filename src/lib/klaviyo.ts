/**
 * Server-only Klaviyo marketing integration.
 *
 * - Uses KLAVIYO_PRIVATE_KEY / KLAVIYO_MARKETING_LIST_ID from env ONLY.
 *   Nothing NEXT_PUBLIC_ may ever touch this module or these keys.
 * - Every function is safe to call fire-and-forget AFTER a DB commit:
 *   failures are swallowed (server-side warn) and never break UX.
 * - With no key configured the module is a graceful no-op so local/dev and
 *   pre-setup production behave normally.
 *
 * Transactional email (OTP, login, verification) is NEVER sent through
 * Klaviyo — that stays in src/lib/email.ts.
 */

const KLAVIYO_API = "https://a.klaviyo.com/api";
const REVISION = "2025-04-15";
const SOURCE = "Growentix website";

function privateKey(): string | null {
  return process.env.KLAVIYO_PRIVATE_KEY || null;
}

function marketingListId(): string | null {
  return process.env.KLAVIYO_MARKETING_LIST_ID || null;
}

/** True when the server is configured to talk to Klaviyo. */
export function klaviyoConfigured(): boolean {
  return !!privateKey();
}

async function klaviyoFetch(path: string, body: unknown): Promise<boolean> {
  const key = privateKey();
  if (!key) {
    console.warn("[klaviyo] KLAVIYO_PRIVATE_KEY not set — skipping", path);
    return false;
  }
  try {
    const res = await fetch(`${KLAVIYO_API}${path}`, {
      method: "POST",
      headers: {
        Authorization: `Klaviyo-API-Key ${key}`,
        revision: REVISION,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.warn(`[klaviyo] ${path} -> ${res.status} ${text.slice(0, 200)}`);
      return false;
    }
    return true;
  } catch (e) {
    console.warn("[klaviyo] request failed:", e instanceof Error ? e.message : e);
    return false;
  }
}

export interface TrackEventInput {
  email: string;
  /** Standard Klaviyo metric name, e.g. "Signed Up", "Placed Order", "Viewed Product". */
  metric: string;
  properties?: Record<string, unknown>;
  /** Order/revenue value for e-commerce metrics. */
  value?: number;
  /** Stable id to make retried logical events idempotent (Klaviyo dedupes on metric+profile+unique_id). */
  uniqueId?: string;
}

/**
 * Track a customer event. Profile is created on first use from the email.
 * Fire-and-forget: `void trackEvent({...})` after your DB commit.
 */
export async function trackEvent(input: TrackEventInput): Promise<void> {
  const { email, metric, properties, value, uniqueId } = input;
  if (!email || !metric) return;
  const attributes: Record<string, unknown> = {
    metric: { data: { type: "metric", attributes: { name: metric } } },
    profile: { data: { type: "profile", attributes: { email } } },
    properties: properties ?? {},
  };
  if (typeof value === "number") attributes.value = value;
  if (uniqueId) attributes.unique_id = uniqueId;
  await klaviyoFetch("/events/", { data: { type: "event", attributes } });
}

export interface UpsertProfileInput {
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  /** Custom profile properties (role, userId, email_verified, ...). */
  properties?: Record<string, unknown>;
}

/**
 * Create or update a Klaviyo profile, idempotent by email.
 * Consent is NOT touched here — use setEmailConsent for list subscription.
 */
export async function upsertProfile(input: UpsertProfileInput): Promise<void> {
  const { email, firstName, lastName, properties } = input;
  if (!email) return;
  const attributes: Record<string, unknown> = { email };
  if (firstName) attributes.first_name = firstName;
  if (lastName) attributes.last_name = lastName;
  if (properties && Object.keys(properties).length > 0) attributes.properties = properties;
  await klaviyoFetch("/profile-import/", {
    data: {
      type: "profile-import",
      attributes: { profiles: { data: [{ type: "profile", attributes }] } },
    },
  });
}

/**
 * Subscribe/unsubscribe an email to/from the marketing list.
 * Only ever called with explicit user consent (signup opt-in checkbox,
 * verification-time opt-in, or the settings toggle).
 */
export async function setEmailConsent(input: { email: string; consented: boolean }): Promise<void> {
  const { email, consented } = input;
  if (!email) return;
  const listId = marketingListId();
  if (!listId) {
    console.warn("[klaviyo] KLAVIYO_MARKETING_LIST_ID not set — cannot change consent for", email);
    return;
  }
  if (consented) {
    await klaviyoFetch("/profile-subscription-bulk-create-jobs/", {
      data: {
        type: "profile-subscription-bulk-create-job",
        attributes: {
          custom_source: SOURCE,
          profiles: {
            data: [
              {
                type: "profile",
                attributes: {
                  email,
                  subscriptions: { email: { marketing: { consent: "SUBSCRIBED" } } },
                },
              },
            ],
          },
        },
        relationships: { list: { data: { type: "list", id: listId } } },
      },
    });
  } else {
    await klaviyoFetch("/profile-subscription-bulk-delete-jobs/", {
      data: {
        type: "profile-subscription-bulk-delete-job",
        attributes: {
          profiles: { data: [{ type: "profile", attributes: { email } }] },
        },
        relationships: { list: { data: { type: "list", id: listId } } },
      },
    });
  }
}
