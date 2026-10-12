import test from "node:test";
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { mkdtempSync, rmSync, rmdirSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { sendOrderCompleted } from "./analytics";
import { loadConfig } from "./config";
import { openStore, newToken } from "./store";

const metadata = { distinctId: `snp_${randomUUID()}`, viewportBucket: "mobile" };
const input = { items: [{ slug: "bpc-157", variantId: "10mg", quantity: 2 }], method: "venmo", customer: { name: "Private Researcher", email: "private@example.com", organization: "Private Laboratory", researchPurpose: "In vitro assay research for a private project", address: "123 Private Street", address2: "", city: "Salt Lake City", state: "UT", zip: "84101" }, researchOnly: true, analytics: metadata };
const config = loadConfig({ ANALYTICS_ENABLED: "true", POSTHOG_API_KEY: "phc_test", POSTHOG_HOST: "https://us.i.posthog.com" });
function paid(store: ReturnType<typeof openStore>, request: unknown = input) {
  const order = store.create(request, 500, ["UT"], randomUUID(), newToken());
  store.review(order.id, true, "Verified laboratory eligibility");
  return store.markPaid(order.id, "venmo", order.totalCents, `VENMO_${randomUUID()}`);
}

test("paid capture is concurrent/retry idempotent, durable, linked to browser ID, and excludes PII", async () => {
  const directory = mkdtempSync(join(tmpdir(), "snp-analytics-")); const path = join(directory, "orders.sqlite");
  let store = openStore(path);
  try {
    const order = paid(store); const bodies: Record<string, unknown>[] = [];
    const transport: typeof fetch = async (url, init) => {
      assert.equal(url, "https://us.i.posthog.com/i/v0/e/");
      bodies.push(JSON.parse(String(init?.body)));
      await Promise.resolve(); return new Response("ok");
    };
    await Promise.all([sendOrderCompleted(config, store, order.id, transport), sendOrderCompleted(config, store, order.id, transport)]);
    store.close(); store = openStore(path);
    await sendOrderCompleted(config, store, order.id, transport);
    assert.equal(bodies.length, 1);
    const event = bodies[0]; const props = event.properties as Record<string, unknown>;
    assert.equal(event.distinct_id, metadata.distinctId); assert.equal(event.uuid, order.id.slice(4));
    assert.equal(props.revenue_cents, order.totalCents); assert.equal(props.shipping_cents, 500);
    assert.equal(props.item_count, 2); assert.equal(props.payment_method, "venmo");
    assert.deepEqual(props.items, [{ slug: "bpc-157", variant: "10mg", qty: 2, price_cents: 4999 }]);
    assert.ok(!JSON.stringify(event).includes("Private")); assert.ok(!JSON.stringify(event).includes("private@example.com"));
  } finally {
    store.close();
    for (const file of [path, `${path}-wal`, `${path}-shm`]) rmSync(file, { force: true });
    rmdirSync(directory); // Empty, known temporary directory; no recursive deletion.
  }
});

test("disabled, unpaid, and untracked/DNT orders send nothing", async () => {
  const store = openStore(":memory:"); let calls = 0;
  const transport: typeof fetch = async () => { calls++; return new Response("ok"); };
  try {
    const order = paid(store);
    await sendOrderCompleted(loadConfig({}), store, order.id, transport);
    const pending = store.create(input, 500, ["UT"], randomUUID(), newToken());
    await sendOrderCompleted(config, store, pending.id, transport);
    await sendOrderCompleted(config, store, paid(store, { ...input, analytics: undefined }).id, transport);
    await sendOrderCompleted(config, store, paid(store, { ...input, analytics: { distinctId: "private@example.com", viewportBucket: "mobile" } }).id, transport);
    assert.equal(calls, 0);
  } finally { store.close(); }
});

test("analytics metadata cannot duplicate an order on retry; crashed claims expire", () => {
  const store = openStore(":memory:"); const key = randomUUID(), token = newToken();
  try {
    const order = store.create(input, 500, ["UT"], key, token);
    const retry = store.create({ ...input, analytics: { distinctId: `snp_${randomUUID()}`, viewportBucket: "desktop" } }, 500, ["UT"], key, token);
    assert.equal(retry.id, order.id); assert.deepEqual(retry.analytics, metadata);
    assert.equal(store.create({ ...input, analytics: undefined }, 500, ["UT"], key, token).id, order.id);
    store.review(order.id, true, "Verified laboratory eligibility");
    store.markPaid(order.id, "venmo", order.totalCents, `VENMO_${randomUUID()}`);
    assert.deepEqual(store.listUnsentAnalytics(), [order.id]);
    const claim = store.claimAnalytics(order.id, 1000);
    assert.ok(claim); assert.equal(store.claimAnalytics(order.id, 30999), undefined);
    assert.equal(store.claimAnalytics(order.id, 31000)?.uuid, claim.uuid);
    store.finishAnalytics(order.id, true);
    assert.deepEqual(store.listUnsentAnalytics(), []);
    assert.equal(store.claimAnalytics(order.id, 61000), undefined);
  } finally { store.close(); }
});

test("network/HTTP/store failures never reject or change paid state; retries reuse UUID", async () => {
  const store = openStore(":memory:"); const order = paid(store); const uuids: string[] = [];
  const transport: typeof fetch = async (_url, init) => {
    uuids.push(JSON.parse(String(init?.body)).uuid);
    if (uuids.length === 1) throw new Error("offline");
    return new Response("", { status: uuids.length === 2 ? 503 : 200 });
  };
  try {
    for (let attempt = 0; attempt < 4; attempt++) await assert.doesNotReject(sendOrderCompleted(config, store, order.id, transport));
    assert.equal(uuids.length, 3); assert.equal(new Set(uuids).size, 1); assert.equal(store.get(order.id)?.status, "paid");
    await assert.doesNotReject(sendOrderCompleted(config, { claimAnalytics: () => { throw new Error("DB unavailable"); }, finishAnalytics: () => { throw new Error("DB unavailable"); } }, order.id, transport));
    await assert.doesNotReject(sendOrderCompleted(config, { claimAnalytics: store.claimAnalytics, finishAnalytics: () => { throw new Error("DB unavailable"); } }, paid(store).id, transport));
  } finally { store.close(); }
});
