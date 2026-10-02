/**
 * Unit tests for src/lib/klaviyo.ts — mocked fetch, no network.
 * Run: npx tsx tests/klaviyo.test.ts
 */
import assert from "node:assert";

type Call = { url: string; body: unknown; auth: string | null; revision: string | null };

const calls: Call[] = [];

// Mock global fetch before importing the lib.
(globalThis as unknown as { fetch: unknown }).fetch = async (url: string, init: RequestInit = {}) => {
  const headers = new Headers(init.headers);
  calls.push({
    url,
    body: init.body ? JSON.parse(String(init.body)) : null,
    auth: headers.get("Authorization"),
    revision: headers.get("revision"),
  });
  return { ok: true, status: 202, text: async () => "" };
};

// eslint-disable-next-line @typescript-eslint/no-require-imports
const klaviyo = require("../src/lib/klaviyo") as typeof import("../src/lib/klaviyo");

function reset() {
  calls.length = 0;
  delete process.env.KLAVIYO_PRIVATE_KEY;
  delete process.env.KLAVIYO_MARKETING_LIST_ID;
}

async function main() {
  // 1. No key -> graceful no-op, no fetch calls, never throws.
  reset();
  assert.equal(klaviyo.klaviyoConfigured(), false);
  await klaviyo.trackEvent({ email: "a@x.com", metric: "Signed Up" });
  await klaviyo.upsertProfile({ email: "a@x.com" });
  await klaviyo.setEmailConsent({ email: "a@x.com", consented: true });
  assert.equal(calls.length, 0, "no fetch without key");
  console.log("ok 1 - no-op without key");

  // 2. trackEvent payload shape: standard metric name, profile by email, properties, value, unique_id.
  reset();
  process.env.KLAVIYO_PRIVATE_KEY = "pk_test";
  await klaviyo.trackEvent({
    email: "jane@example.com",
    metric: "Placed Order",
    properties: { OrderId: "ord_1", Items: ["Course A"] },
    value: 4999,
    uniqueId: "order-ord_1",
  });
  assert.equal(calls.length, 1);
  const ev = calls[0];
  assert.equal(ev.url, "https://a.klaviyo.com/api/events/");
  assert.equal(ev.auth, "Klaviyo-API-Key pk_test");
  assert.ok(ev.revision, "revision header present");
  const attr = (ev.body as { data: { attributes: Record<string, unknown> } }).data.attributes;
  assert.equal(
    ((attr.metric as { data: { attributes: { name: string } } }).data.attributes.name),
    "Placed Order"
  );
  assert.equal(
    ((attr.profile as { data: { attributes: { email: string } } }).data.attributes.email),
    "jane@example.com"
  );
  assert.deepEqual(attr.properties, { OrderId: "ord_1", Items: ["Course A"] });
  assert.equal(attr.value, 4999);
  assert.equal(attr.unique_id, "order-ord_1");
  console.log("ok 2 - trackEvent payload shape");

  // 3. upsertProfile: profile-import upsert, idempotent by email.
  reset();
  process.env.KLAVIYO_PRIVATE_KEY = "pk_test";
  await klaviyo.upsertProfile({
    email: "jane@example.com",
    firstName: "Jane",
    properties: { role: "STUDENT", email_verified: true },
  });
  assert.equal(calls.length, 1);
  const up = calls[0];
  assert.equal(up.url, "https://a.klaviyo.com/api/profile-import/");
  const importAttrs = (up.body as { data: { type: string; attributes: { profiles: { data: Array<{ type: string; attributes: Record<string, unknown> }> } } } }).data;
  assert.equal(importAttrs.type, "profile-import");
  const profileAttrs = importAttrs.attributes.profiles.data[0].attributes;
  assert.equal(profileAttrs.email, "jane@example.com");
  assert.equal(profileAttrs.first_name, "Jane");
  assert.deepEqual(profileAttrs.properties, { role: "STUDENT", email_verified: true });
  console.log("ok 3 - upsertProfile payload shape");

  // 4. setEmailConsent(true): bulk subscribe job with consent SUBSCRIBED against the list.
  reset();
  process.env.KLAVIYO_PRIVATE_KEY = "pk_test";
  process.env.KLAVIYO_MARKETING_LIST_ID = "list_123";
  await klaviyo.setEmailConsent({ email: "jane@example.com", consented: true });
  assert.equal(calls.length, 1);
  const sub = calls[0];
  assert.equal(sub.url, "https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs/");
  const subData = (sub.body as { data: { type: string; relationships: { list: { data: { id: string } } } } }).data;
  assert.equal(subData.type, "profile-subscription-bulk-create-job");
  assert.equal(subData.relationships.list.data.id, "list_123");
  const subProfile = (sub.body as { data: { attributes: { profiles: { data: Array<{ attributes: Record<string, unknown> }> } } } }).data.attributes.profiles.data[0].attributes;
  assert.equal(
    ((subProfile.subscriptions as { email: { marketing: { consent: string } } }).email.marketing.consent),
    "SUBSCRIBED"
  );
  console.log("ok 4 - setEmailConsent(true) subscribes to list");

  // 5. setEmailConsent(false): bulk delete job.
  reset();
  process.env.KLAVIYO_PRIVATE_KEY = "pk_test";
  process.env.KLAVIYO_MARKETING_LIST_ID = "list_123";
  await klaviyo.setEmailConsent({ email: "jane@example.com", consented: false });
  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, "https://a.klaviyo.com/api/profile-subscription-bulk-delete-jobs/");
  assert.equal(
    (calls[0].body as { data: { type: string } }).data.type,
    "profile-subscription-bulk-delete-job"
  );
  console.log("ok 5 - setEmailConsent(false) unsubscribes");

  // 6. Consent without a list id -> no fetch (never market without a list).
  reset();
  process.env.KLAVIYO_PRIVATE_KEY = "pk_test";
  await klaviyo.setEmailConsent({ email: "jane@example.com", consented: true });
  assert.equal(calls.length, 0, "no fetch without list id");
  console.log("ok 6 - consent no-op without list id");

  // 7. Klaviyo failure never throws to the caller.
  reset();
  process.env.KLAVIYO_PRIVATE_KEY = "pk_test";
  (globalThis as unknown as { fetch: unknown }).fetch = async () => {
    throw new Error("network down");
  };
  await klaviyo.trackEvent({ email: "a@x.com", metric: "Signed Up" }); // must not throw
  (globalThis as unknown as { fetch: unknown }).fetch = async () => ({
    ok: false, status: 500, text: async () => "boom",
  });
  await klaviyo.trackEvent({ email: "a@x.com", metric: "Signed Up" }); // must not throw
  console.log("ok 7 - failures swallowed");

  console.log("\nAll klaviyo lib tests passed.");
}

main().catch((e) => {
  console.error("TEST FAILURE:", e);
  process.exit(1);
});
