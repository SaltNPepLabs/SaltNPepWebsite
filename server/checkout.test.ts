import test from "node:test";
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import Stripe from "stripe";
import { loadConfig } from "./config";
import { newToken, openStore, priceOrder } from "./store";
import { createCheckoutServer } from "./api";
import { products } from "../src/lib/products";
import { getAvailableProductVariants, getDefaultProductVariant, getProductVariants, getStorefrontProductVariants } from "../src/lib/product-variants";
import { createCartItem, restoreCartItems } from "../src/lib/cart-items";
import { aurumCatalog } from "../src/lib/aurum-catalog";

const request = { items: [{ slug: "mt-2", quantity: 3 }], method: "card", customer: { name: "Research Buyer", email: "buyer@example.com", organization: "Example Laboratory", researchPurpose: "In vitro laboratory assay development", address: "123 Example St", address2: "", city: "Salt Lake City", state: "UT", zip: "84101" }, researchOnly: true };
const config = () => loadConfig({ CHECKOUT_ENABLED: "true", STOREFRONT_ORIGIN: "http://localhost:3015", SHIPPING_CENTS: "500", SHIPPING_STATES: "UT", SUPPORT_EMAIL: "orders@example.com", TAX_POLICY_APPROVED: "true", STRIPE_SECRET_KEY: "sk_test_example", STRIPE_WEBHOOK_SECRET: "whsec_example" });

test("server prices canonical catalog tiers and rejects invalid carts and states", () => {
  assert.equal(priceOrder({ ...request, totalCents: 1 }, 500, ["UT"]).totalCents, 12497);
  assert.throws(() => priceOrder({ ...request, items: [{ slug: "unknown", quantity: 1 }] }, 500, ["UT"]));
  assert.throws(() => priceOrder({ ...request, items: [...request.items, ...request.items] }, 500, ["UT"]));
  assert.throws(() => priceOrder(request, 500, ["CO"]));
  assert.throws(() => priceOrder({ ...request, items: [{ slug: "bpc-157", quantity: -1 }] }, 500, ["UT"]));
});

test("all Aurum sizes use the published vial prices in cards, saved carts and server checkout", () => {
  const expected: Record<string, Record<string, number>> = {
    "bpc-157": { "10mg": 49.99 },
    "tb-500": { "10mg": 64.99 },
    "ghk-cu": { "50mg": 39.99, "100mg": 49.99 },
    "mt-2": { "10mg": 39.99 }, "melanotan-i": { "10mg": 39.99 },
    selank: { "5mg": 44.99, "10mg": 64.99 }, semax: { "5mg": 44.99, "10mg": 64.99 },
    "cjc-1295-no-dac": { "5mg": 54.99 },
    ipamorelin: { "5mg": 49.99 }, "igf-1-lr3": { "1mg": 89.99 },
    tesamorelin: { "5mg": 64.99, "10mg": 119.99, "20mg": 166.66 },
    "glp-2-tz": { "10mg": 49.99, "30mg": 127.77 },
    "glp-1-sm": { "10mg": 59.99, "30mg": 169.99 },
    retatrutide: { "30mg": 166.66 },
    kpv: { "10mg": 54.99, "30mg": 129.99 }, "mots-c": { "10mg": 69.99 },
    "nad-plus": { "500mg": 59.99 },
    glutathione: { "1500mg": 74.99 }, klow: { "80mg": 119.99 }, "ss-31": { "10mg": 65.99 },
    "ara-290": { "10mg": 74.99 }, wolverine: { "20mg": 89.99 },
    cagrilintide: { "10mg": 89.99 },
  };
  assert.equal(products.length, 23);
  assert.deepEqual(aurumCatalog.map(product => product.slug).sort(), Object.keys(expected).sort());
  let availableCount = 0, soldOutCount = 0;
  for (const product of products) {
    const variants = getProductVariants(product);
    const sourcePrices = expected[product.slug];
    assert.deepEqual(getStorefrontProductVariants(product), variants);
    if (sourcePrices) {
      assert.deepEqual(variants.map(variant => variant.id), Object.keys(sourcePrices));
      assert.equal(getDefaultProductVariant(product).id, Object.keys(sourcePrices)[0]);
      assert.equal(product.price, Object.values(sourcePrices)[0]);
      assert.deepEqual(getAvailableProductVariants(product), variants);
    }
    for (const variant of variants) {
      if (!variant.inStock) {
        soldOutCount++;
        assert.ok(["pinealon", "epitalon"].includes(product.slug));
        assert.equal(createCartItem(product.slug, 1, variant.id), undefined);
        assert.deepEqual(restoreCartItems([{ slug: product.slug, variantId: variant.id, quantity: 1, price: 0.01 }]), []);
        assert.throws(() => priceOrder({ ...request, items: [{ slug: product.slug, variantId: variant.id, quantity: 1, price: product.price }] }, 500, ["UT"]), /sold out/);
      } else {
        availableCount++;
        assert.notEqual(variant.price, null);
        if (sourcePrices) assert.equal(variant.price, sourcePrices[variant.id]);
        for (const quantity of [1, 3, 5, 10]) {
          const expectedPrice = sourcePrices ? sourcePrices[variant.id] : product.bulkPricing.find(tier => tier.qty === quantity)?.price;
          assert.ok(expectedPrice);
          const priced = priceOrder({ ...request, items: [{ slug: product.slug, variantId: variant.id, quantity, unitCents: 1 }] }, 500, ["UT"]);
          assert.equal(priced.items[0].variantId, variant.id);
          assert.equal(priced.items[0].unitCents, Math.round(expectedPrice * 100));
          assert.equal(createCartItem(product.slug, quantity, variant.id)?.pricePerUnit, expectedPrice);
          assert.equal(restoreCartItems([{ slug: product.slug, variantId: variant.id, quantity, pricePerUnit: 0.01 }])[0]?.pricePerUnit, expectedPrice);
        }
      }
    }
    assert.equal(createCartItem(product.slug, 1, "unknown"), undefined);
    assert.throws(() => priceOrder({ ...request, items: [{ slug: product.slug, variantId: "unknown", quantity: 1 }] }, 500, ["UT"]), /Invalid compound or size/);
    for (const invalidId of [null, "", 5]) assert.throws(() => priceOrder({ ...request, items: [{ slug: product.slug, variantId: invalidId, quantity: 1 }] }, 500, ["UT"]));
  }
  assert.equal(soldOutCount, 0);
  assert.equal(availableCount, 31);
});

test("certificate links cover published current reports and explicitly leave missing reports unclaimed", () => {
  assert.equal(aurumCatalog.flatMap(product => product.certificates).length, 31);
  assert.deepEqual(aurumCatalog.filter(product => !product.certificates.length).map(product => product.slug),
    []);
  for (const product of aurumCatalog) for (const certificate of product.certificates) {
    const url = new URL(certificate.url);
    assert.ok(["https://aurumpeptidelabs.com", "https://buhowehvijcubhdrphao.supabase.co"].includes(url.origin));
    assert.match(url.pathname, /\.pdf$/);
    assert.doesNotMatch(url.pathname, /archive/i);
  }
  assert.deepEqual(aurumCatalog.find(product => product.slug === "bpc-157")?.certificates.map(certificate => certificate.label), ["10mg"]);
  assert.deepEqual(aurumCatalog.find(product => product.slug === "mots-c")?.certificates.map(certificate => certificate.label), ["40mg"]);
});

test("legacy cart lines keep their original vial size and available order snapshots retain size", () => {
  const restored = restoreCartItems(["bpc-157", "retatrutide", "tb-500", "mt-2", "mots-c", "pinealon", "epitalon", "ghk-cu"].map(slug => ({ slug, quantity: 3, pricePerUnit: 0.01 })));
  assert.deepEqual(restored.map(item => item.product.slug), ["mt-2", "mots-c", "ghk-cu"]);
  for (const slug of ["bpc-157", "retatrutide", "tb-500"]) {
    assert.equal(createCartItem(slug, 3), undefined);
    assert.throws(() => priceOrder({ ...request, items: [{ slug, quantity: 3 }] }, 500, ["UT"]), /Invalid compound or size/);
  }
  for (const item of restored) {
    assert.equal(item.variant.id, item.product.dosage);
    assert.equal(item.id, `${item.product.slug}:${item.product.dosage}`);
    assert.equal(item.pricePerUnit, item.product.bulkPricing.find(tier => tier.qty === 3)?.price);
  }
  assert.deepEqual(restoreCartItems([
    { slug: "mt-2", quantity: 3 }, { slug: "mt-2", variantId: "10mg", quantity: 1 },
    { slug: "bpc-157", quantity: 3 }, { slug: "bpc-157", variantId: "5mg", quantity: 1 },
    { slug: "bpc-157", variantId: "10mg", quantity: 1 },
    { slug: "bpc-157", variantId: "20mg", quantity: 1, price: 39.99 },
    { slug: "bpc-157", variantId: null, quantity: 1 }, { slug: "bpc-157", variantId: "unknown", quantity: 1 },
    { slug: "bpc-157", quantity: 101 }, { slug: "bpc-157", quantity: 1.5 }, null,
  ]).map(item => ({ id: item.id, quantity: item.quantity })), [{ id: "mt-2:10mg", quantity: 3 }, { id: "bpc-157:10mg", quantity: 1 }]);
  const explicit = { ...request, items: [{ slug: "mt-2", variantId: "10mg", quantity: 3 }] };
  assert.deepEqual(priceOrder(explicit, 500, ["UT"]).items, priceOrder(request, 500, ["UT"]).items);
  assert.throws(() => priceOrder({ ...request, items: [...request.items, ...explicit.items] }, 500, ["UT"]), /Duplicate compound and size/);
  const store = openStore(":memory:");
  try {
    const order = store.create(explicit, 500, ["UT"], randomUUID(), newToken());
    assert.equal(store.get(order.id)?.items[0].variantId, "10mg");
    assert.equal(store.get(order.id)?.items[0].name, "MT-2 · 10 mg");
  } finally { store.close(); }
});

test("idempotency, private order access, review and payment invariants", () => {
  const store = openStore(":memory:");
  try {
    const token = newToken(), key = randomUUID();
    const order = store.create(request, 500, ["UT"], key, token);
    assert.equal(store.create(request, 500, ["UT"], key, token).id, order.id);
    assert.throws(() => store.create({ ...request, method: "venmo" }, 500, ["UT"], key, token));
    assert.equal(store.authenticate(order.id, newToken()), undefined);
    assert.throws(() => store.markPaid(order.id, "venmo", order.totalCents, "verified transaction"));
    assert.throws(() => store.attachSession(order.id, "cs_test_one"));
    store.review(order.id, true, "Verified institution and laboratory purpose");
    store.attachSession(order.id, "cs_test_one");
    assert.throws(() => store.markPaid(order.id, "card", 1, "Stripe event evt_example", "cs_test_one"));
    assert.throws(() => store.markPaid(order.id, "card", order.totalCents, "Stripe event evt_example", "cs_test_other"));
    store.markPaid(order.id, "card", order.totalCents, "Stripe event evt_example", "cs_test_one");
    store.attachSession(order.id, "cs_test_one"); // A late session response cannot overwrite paid status.
    assert.equal(store.get(order.id)?.status, "paid");
    store.markPaid(order.id, "card", order.totalCents, "Stripe event evt_example", "cs_test_one");
    assert.equal(store.db.prepare("SELECT COUNT(*) AS n FROM audit WHERE action='paid'").get()?.n, 1);
    const manual = store.create({ ...request, method: "venmo" }, 500, ["UT"], randomUUID(), newToken());
    assert.throws(() => store.markPaid(manual.id, "venmo", manual.totalCents, "Verified transaction 12345"));
    store.review(manual.id, true, "Verified institution and laboratory purpose");
    assert.throws(() => store.markPaid(manual.id, "venmo", 100, "Verified transaction 12345"));
    assert.equal(store.markPaid(manual.id, "venmo", manual.totalCents, "1234567890123456789").status, "paid");
    const secondManual = store.create({ ...request, method: "venmo" }, 500, ["UT"], randomUUID(), newToken());
    store.review(secondManual.id, true, "Verified institution and laboratory purpose");
    assert.throws(() => store.markPaid(secondManual.id, "venmo", secondManual.totalCents, "1234567890123456789"));
    assert.equal(store.get(secondManual.id)?.status, "approved");
    const recovered = store.recoverAccess(order.id, "Verified ownership through original contact");
    assert.equal(store.authenticate(order.id, token), undefined);
    assert.equal(store.authenticate(order.id, recovered.token)?.id, order.id);
  } finally { store.close(); }
});

test("configuration fails closed for live credentials and unresolved shipping/tax", () => {
  assert.equal(loadConfig({}).enabled, false);
  assert.throws(() => loadConfig({ STRIPE_SECRET_KEY: "sk_live_example" }));
  assert.throws(() => loadConfig({ CHECKOUT_ENABLED: "true" }));
  assert.throws(() => loadConfig({ VENMO_BUSINESS_HANDLE: "example" }));
});

test("HTTP checkout requires review; signed exact-amount webhook alone confirms card payment", async () => {
  const settings = config(), store = openStore(":memory:"), stripe = new Stripe(settings.key);
  let creations = 0;
  const session = { id: "cs_test_example", status: "open", url: "https://checkout.stripe.com/c/pay/example", lastResponse: { headers: {}, requestId: "req_test", statusCode: 200 } } as Stripe.Response<Stripe.Checkout.Session>;
  stripe.checkout.sessions.create = (async (params: Stripe.Checkout.SessionCreateParams) => {
    creations++;
    assert.equal(params.line_items?.[0].price_data?.unit_amount, 3999);
    assert.equal(params.line_items?.[0].quantity, 3);
    assert.equal(params.line_items?.[0].price_data?.product_data?.name, "MT-2 · 10 mg");
    assert.equal(params.allowed_payment_method_types?.[0], "card");
    assert.equal(params.adaptive_pricing?.enabled, false);
    assert.ok(params.success_url?.includes("?order=SNP-"));
    return session;
  }) as typeof stripe.checkout.sessions.create;
  stripe.checkout.sessions.retrieve = (async () => session) as typeof stripe.checkout.sessions.retrieve;
  const server = createCheckoutServer(settings, store, stripe);
  await new Promise<void>(resolve => server.listen(0, "127.0.0.1", resolve));
  const address = server.address(); assert.ok(address && typeof address !== "string");
  const base = `http://127.0.0.1:${address.port}`;
  const token = newToken(), headers = { Origin: settings.origin, Authorization: `Bearer ${token}`, "Content-Type": "application/json", "Idempotency-Key": randomUUID() };
  try {
    assert.equal((await fetch(`${base}/orders`, { method: "POST", headers: { ...headers, Origin: "https://wrong.example" }, body: JSON.stringify(request) })).status, 403);
    for (const invalid of [
      { items: [{ slug: "bpc-157", variantId: "5mg", quantity: 1 }], error: "Invalid compound or size." },
      { items: [{ slug: "bpc-157", quantity: 1 }], error: "Invalid compound or size." },
      { items: [{ slug: "bpc-157", variantId: "20mg", quantity: 1 }], error: "Invalid compound or size." },
      { items: [{ slug: "pinealon", variantId: "5mg", quantity: 1 }], error: "Invalid compound or size." },
      { items: [{ slug: "mt-2", variantId: "5mg", quantity: 1 }], error: "Invalid compound or size." },
      { items: [{ slug: "bpc-157", variantId: "unknown", quantity: 1 }], error: "Invalid compound or size." },
      { items: [...request.items, { slug: "mt-2", variantId: "10mg", quantity: 1 }], error: "Duplicate compound and size." },
    ]) {
      const response = await fetch(`${base}/orders`, { method: "POST", headers: { ...headers, "Idempotency-Key": randomUUID() }, body: JSON.stringify({ ...request, items: invalid.items }) });
      assert.equal(response.status, 400);
      assert.deepEqual(await response.json(), { error: invalid.error });
    }
    assert.equal(store.db.prepare("SELECT COUNT(*) AS n FROM orders").get()?.n, 0);
    const created = await fetch(`${base}/orders`, { method: "POST", headers, body: JSON.stringify(request) });
    assert.equal(created.status, 201);
    const order = await created.json();
    assert.equal(order.customer, undefined);
    assert.equal((await fetch(`${base}/orders/${order.id}/pay`, { method: "POST", headers })).status, 409);
    assert.equal((await fetch(`${base}/orders/${order.id}`, { headers: { ...headers, Authorization: `Bearer ${newToken()}` } })).status, 404);
    store.review(order.id, true, "Verified institution and laboratory purpose");
    assert.equal((await fetch(`${base}/orders/${order.id}/pay`, { method: "POST", headers })).status, 200);
    assert.equal((await fetch(`${base}/orders/${order.id}/pay`, { method: "POST", headers })).status, 200);
    assert.equal(creations, 1);
    assert.equal(store.get(order.id)?.status, "approved");
    async function webhook(amount: number, signatureValid = true) {
      const payload = JSON.stringify({ id: "evt_test_verified", object: "event", type: "checkout.session.completed", data: { object: { ...session, payment_status: "paid", amount_total: amount, currency: "usd", livemode: false, metadata: { order_id: order.id } } } });
      return fetch(`${base}/webhooks/stripe`, { method: "POST", headers: { "stripe-signature": signatureValid ? stripe.webhooks.generateTestHeaderString({ payload, secret: settings.webhookSecret }) : "invalid" }, body: payload });
    }
    assert.equal((await webhook(order.totalCents, false)).status, 400);
    assert.equal((await webhook(1)).status, 503);
    assert.equal(store.get(order.id)?.status, "approved");
    assert.equal((await webhook(order.totalCents)).status, 200);
    assert.equal((await webhook(order.totalCents)).status, 200);
    assert.equal(store.get(order.id)?.status, "paid");
  } finally { await new Promise<void>(resolve => server.close(() => resolve())); store.close(); }
});

test("trusted ingress gives distinct customers independent request limits", async () => {
  const settings = { ...config(), trustProxy: true }, store = openStore(":memory:");
  const server = createCheckoutServer(settings, store, null);
  await new Promise<void>(resolve => server.listen(0, "127.0.0.1", resolve));
  const address = server.address(); assert.ok(address && typeof address !== "string");
  const url = `http://127.0.0.1:${address.port}/config`;
  try {
    for (let i = 0; i < 60; i++) assert.equal((await fetch(url, { headers: { Origin: settings.origin, "X-Forwarded-For": "192.0.2.1" } })).status, 200);
    assert.equal((await fetch(url, { headers: { Origin: settings.origin, "X-Forwarded-For": "192.0.2.1" } })).status, 429);
    assert.equal((await fetch(url, { headers: { Origin: settings.origin, "X-Forwarded-For": "192.0.2.2" } })).status, 200);
  } finally { await new Promise<void>(resolve => server.close(() => resolve())); store.close(); }
});


test("removed supplier products cannot enter restored carts or checkout", () => {
  for (const slug of ["kisspeptin", "bacteriostatic-water", "cjc-1295-dac", "pinealon", "epitalon"]) {
    assert.equal(products.some(product => product.slug === slug), false);
    assert.equal(createCartItem(slug, 1), undefined);
    assert.deepEqual(restoreCartItems([{ slug, quantity: 1 }]), []);
    assert.throws(() => priceOrder({ ...request, items: [{ slug, quantity: 1 }] }, 500, ["UT"]), /Invalid compound or size/);
  }
});
