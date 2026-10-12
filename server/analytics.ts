import { version } from "../package.json";
import { catalogSlug } from "../src/lib/catalog-naming";
import type { loadConfig } from "./config";
import type { openStore } from "./store";

type Config = ReturnType<typeof loadConfig>;
type Store = Pick<ReturnType<typeof openStore>, "claimAnalytics" | "finishAnalytics">;

// Call without awaiting from the webhook. Every error, including store errors, stays here.
export async function sendOrderCompleted(config: Config, store: Store, id: string, transport: typeof fetch = fetch): Promise<void> {
  let claimed = false;
  try {
    if (!config.analytics.enabled || !config.analytics.key) return;
    const host = new URL(config.analytics.host);
    if (host.origin !== config.analytics.host.replace(/\/$/, "") || host.protocol !== "https:") return;
    const delivery = store.claimAnalytics(id);
    if (!delivery) return;
    claimed = true;
    const { order, uuid } = delivery;
    const response = await transport(`${host.origin}/i/v0/e/`, {
      method: "POST", headers: { "Content-Type": "application/json" }, signal: AbortSignal.timeout(5000),
      body: JSON.stringify({ api_key: config.analytics.key, event: "order_completed", uuid,
        distinct_id: order.analytics!.distinctId, timestamp: new Date().toISOString(),
        properties: {
          order_ref: order.id, revenue_cents: order.totalCents, shipping_cents: order.shippingCents,
          item_count: order.items.reduce((sum, item) => sum + item.quantity, 0),
          items: order.items.map(item => ({ slug: catalogSlug(item.slug), variant: item.variantId, qty: item.quantity, price_cents: item.unitCents })),
          payment_method: order.method === "card" ? "stripe" : "venmo",
          site_version: version, viewport_bucket: order.analytics!.viewportBucket,
          $process_person_profile: false, $geoip_disable: true, $ip: null,
        },
      }),
    });
    store.finishAnalytics(id, response.ok);
  } catch {
    if (claimed) { try { store.finishAnalytics(id, false); } catch { /* Lease expiry allows a later retry. */ } }
  }
}
