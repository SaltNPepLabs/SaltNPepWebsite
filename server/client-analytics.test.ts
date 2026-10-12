import test from "node:test";
import assert from "node:assert/strict";
import { createAnalytics, scrubAnalyticsProps, analyticsPath } from "../src/lib/analytics";

const distinctId = "snp_12345678-1234-4123-8123-123456789012";
function harness(provider?: string, key?: string, allowed = true) {
  let loads = 0, ids = 0;
  const events: { event: string; properties: Record<string, unknown> }[] = [];
  const analytics = createAnalytics({ provider, key }, {
    allowed: () => allowed, viewport: () => "mobile", distinctId: () => { ids++; return distinctId; },
    load: async () => { loads++; return entry => { events.push(entry); }; },
  });
  return { analytics, events, counts: () => ({ loads, ids }) };
}

test("unset, none, missing key, and DNT make every analytics call a no-op with no transport load", async () => {
  for (const [provider, key, allowed] of [[undefined, undefined, true], ["none", "phc_test", true], ["posthog", undefined, true], ["posthog", "phc_test", false]] as const) {
    const h = harness(provider, key, allowed);
    h.analytics.pageview("/checkout?email=private@example.com");
    h.analytics.track("age_gate_viewed"); h.analytics.acceptGate();
    await Promise.resolve();
    assert.deepEqual(h.counts(), { loads: 0, ids: 0 });
    assert.deepEqual(h.events, []); assert.equal(h.analytics.checkoutMetadata(), undefined);
  }
});

test("events queue before acceptance and during load; only sanitized events flush in order", async () => {
  const h = harness("posthog", "phc_test");
  h.analytics.pageview("/products/bpc-157?email=private@example.com#private");
  h.analytics.track("age_gate_viewed", { email: "private@example.com" });
  h.analytics.track("age_gate_accepted");
  assert.deepEqual(h.counts(), { loads: 0, ids: 0 }); assert.equal(h.analytics.checkoutMetadata(), undefined);
  h.analytics.acceptGate(); h.analytics.acceptGate();
  h.analytics.track("cart_opened", { item_count: 2, cart_value_cents: 9998, name: "Private Name" });
  assert.equal(h.events.length, 0);
  await Promise.resolve();
  assert.deepEqual(h.counts(), { loads: 1, ids: 1 });
  assert.deepEqual(h.events.map(event => event.event), ["$pageview", "age_gate_viewed", "age_gate_accepted", "cart_opened"]);
  assert.equal(h.events[0].properties.path, "/products/bpc-157");
  assert.equal(h.events[0].properties.viewport_bucket, "mobile");
  assert.equal(typeof h.events[0].properties.site_version, "string");
  assert.ok(!JSON.stringify(h.events).includes("private"));
  assert.deepEqual(h.analytics.checkoutMetadata(), { distinctId, viewportBucket: "mobile" });
});

test("property allowlists reject PII, free text, SDK properties and nested unknown fields", () => {
  assert.deepEqual(scrubAnalyticsProps("product_viewed", { product_slug: "bpc-157", product_name: "private@example.com", variant: "123 Main Street", price_cents: 4999, email: "private@example.com", $current_url: "https://example.com/?token=secret", phone: "801-555-1234" }), { product_slug: "bpc-157", price_cents: 4999 });
  assert.deepEqual(scrubAnalyticsProps("research_search", { query: "Private Name", query_length: 12, result_count: 1, filters: { compound: "bpc-157", year: "2026", type: "review", email: "private@example.com", sort: "Private Name" } }), { query_length: 12, result_count: 1, filters: { compound: "bpc-157", year: "2026", type: "review" } });
  assert.deepEqual(scrubAnalyticsProps("checkout_started", { items: [{ slug: "bpc-157", variant: "10mg", qty: 2, name: "Private Name" }, { slug: "private@example.com", variant: "10mg", qty: 1 }] }), { items: [{ slug: "bpc-157", variant: "10mg", qty: 2 }] });
  assert.deepEqual(scrubAnalyticsProps("checkout_error", { stage: "submit", error_code: "private@example.com", message: "Private Name" }), { stage: "submit" });
  assert.deepEqual(scrubAnalyticsProps("order_result_viewed", { status: "paid", order_ref: "private@example.com" }), { status: "paid" });
  assert.equal(analyticsPath("/science/bpc-157/123456?token=secret&q=private@example.com"), "/science/bpc-157/123456");
  assert.equal(analyticsPath("/private@example.com"), "/unknown");
});

test("pageviews include search-param navigation, deduplicate effects, and preserve return navigation", async () => {
  const h = harness("posthog", "phc_test"); h.analytics.acceptGate(); await Promise.resolve();
  for (const path of ["/science", "/science", "/science?q=a", "/products", "/science?q=a"]) h.analytics.pageview(path);
  assert.equal(h.events.length, 4);
  assert.deepEqual(h.events.map(event => event.properties.path), ["/science", "/science", "/products", "/science"]);
});

test("SDK load and capture failures never escape to callers", async () => {
  const broken = createAnalytics({ provider: "posthog", key: "test" }, { allowed: () => true, viewport: () => "desktop", distinctId: () => distinctId, load: async () => { throw new Error("offline"); } });
  assert.doesNotThrow(() => { broken.track("age_gate_viewed"); broken.acceptGate(); }); await Promise.resolve(); await Promise.resolve();
  const h = createAnalytics({ provider: "posthog", key: "test" }, { allowed: () => true, viewport: () => "desktop", distinctId: () => distinctId, load: async () => () => { throw new Error("offline"); } });
  h.track("age_gate_viewed"); h.acceptGate(); await Promise.resolve();
  assert.doesNotThrow(() => h.track("age_gate_accepted"));
});
