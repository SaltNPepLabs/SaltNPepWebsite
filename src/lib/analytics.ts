import { version } from "../../package.json";
import { products } from "./products";
import { catalogSlug, catalogText } from "./catalog-naming";
import { getProductVariants } from "./product-variants";

export type AnalyticsProps = Record<string, unknown>;
type Viewport = "mobile" | "tablet" | "desktop";
type Configuration = { provider?: string; key?: string; host?: string };
type QueuedEvent = { event: string; properties: AnalyticsProps; timestamp: Date };
type Sink = (event: QueuedEvent) => void;
type Runtime = {
  allowed: () => boolean;
  viewport: () => Viewport;
  distinctId: () => string;
  load: (config: Configuration, distinctId: string) => Promise<Sink>;
};

const slugs = new Set(products.map(product => catalogSlug(product.slug)));
const names = new Set(products.flatMap(product => [catalogText(product.name), catalogText(product.shortName)]));
const variants = new Set(products.flatMap(product => getProductVariants(product).map(variant => variant.id)));
const uuid = "[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}";
export const analyticsIdPattern = new RegExp(`^snp_${uuid}$`, "i");
const orderPattern = new RegExp(`^SNP-${uuid}$`, "i");
const fields: Record<string, string[]> = {
  "$pageview": ["path"], age_gate_viewed: [], age_gate_accepted: [],
  product_viewed: ["product_slug", "product_name", "variant", "price_cents"],
  carousel_interaction: ["method", "product_slug"], carousel_product_opened: ["product_slug"],
  add_to_cart: ["product_slug", "variant", "quantity", "price_cents", "cart_value_cents"],
  remove_from_cart: ["product_slug", "variant", "quantity", "price_cents", "cart_value_cents"],
  cart_opened: ["item_count", "cart_value_cents"],
  checkout_started: ["item_count", "cart_value_cents", "items"],
  checkout_submitted: ["payment_method", "cart_value_cents"], checkout_error: ["stage", "error_code"],
  order_result_viewed: ["status", "order_ref"], research_search: ["query_length", "result_count", "filters"],
  research_paper_opened: ["compound_slug", "pmid"], outbound_click: ["type", "product_slug", "pmid"],
};

// Only exported routes are retained. All query values and fragments are discarded.
export function analyticsPath(url: string) {
  try {
    const path = new URL(url, "https://store.invalid").pathname.replace(/\/$/, "") || "/";
    if (["/", "/products", "/science", "/faq", "/checkout", "/checkout/result"].includes(path)) return path;
    const match = /^\/(products|science)\/([a-z0-9-]+)(?:\/(\d{1,12}))?$/.exec(path);
    if (match && slugs.has(match[2]) && (match[1] === "science" || !match[3])) return path;
  } catch { /* Invalid input never leaves the browser. */ }
  return "/unknown";
}

const numeric = (value: unknown) => typeof value === "number" && Number.isSafeInteger(value) && value >= 0;
const choice = (value: unknown, options: string[]) => typeof value === "string" && options.includes(value);
function scrubField(key: string, value: unknown): unknown {
  if (["product_slug", "compound_slug", "slug"].includes(key)) return typeof value === "string" && slugs.has(value) ? value : undefined;
  if (key === "product_name") return typeof value === "string" && names.has(value) ? value : undefined;
  if (key === "variant") return typeof value === "string" && variants.has(value) ? value : undefined;
  if (key === "path") return typeof value === "string" ? analyticsPath(value) : undefined;
  if (key === "order_ref") return typeof value === "string" && orderPattern.test(value) ? value : undefined;
  if (key === "pmid") return typeof value === "string" && /^\d{1,12}$/.test(value) ? value : undefined;
  if (key === "method") return choice(value, ["drag", "arrow", "selector", "keyboard"]) ? value : undefined;
  if (key === "payment_method") return choice(value, ["stripe", "venmo"]) ? value : undefined;
  if (key === "status") return choice(value, ["awaiting_review", "approved", "rejected", "paid", "unavailable"]) ? value : undefined;
  if (key === "type") return choice(value, ["certificate_pdf", "pubmed"]) ? value : undefined;
  if (key === "stage") return choice(value, ["config", "validation", "storage", "submit", "result", "payment", "recovery", "preview"]) ? value : undefined;
  if (key === "error_code") return typeof value === "string" && /^(invalid_form|invalid_request|invalid_response|storage_unavailable|request_failed|network_error|http_[45]\d\d)$/.test(value) ? value : undefined;
  if (key === "items") return Array.isArray(value) ? value.slice(0, 100).flatMap(item => {
    if (!item || typeof item !== "object") return [];
    const record = item as AnalyticsProps;
    const slug = scrubField("slug", record.slug), variant = scrubField("variant", record.variant);
    return slug && variant && numeric(record.qty) ? [{ slug, variant, qty: record.qty }] : [];
  }) : undefined;
  if (key === "filters" && value && typeof value === "object" && !Array.isArray(value)) {
    const result: AnalyticsProps = {};
    for (const [filter, selection] of Object.entries(value)) {
      const options: Record<string, string[]> = {
        compound: ["all", ...slugs], type: ["all", "clinical-trial", "review", "case-report", "research", "other"],
        evidence: ["all", "human", "preclinical"], view: ["catalog", "explained"], sort: ["newest", "oldest"],
      };
      if (options[filter] && choice(selection, options[filter])) result[filter] = selection;
      if (filter === "year" && typeof selection === "string" && /^(all|(?:19|20)\d\d)$/.test(selection)) result.year = selection;
    }
    return result;
  }
  if (["price_cents", "cart_value_cents", "quantity", "item_count", "query_length", "result_count"].includes(key)) return numeric(value) ? value : undefined;
  return undefined;
}

export function scrubAnalyticsProps(event: string, props: AnalyticsProps = {}): AnalyticsProps {
  const clean: AnalyticsProps = {};
  for (const key of fields[event] || []) {
    const value = scrubField(key, props[key]);
    if (value !== undefined) clean[key] = value;
  }
  return clean;
}

// Injectable runtime keeps the gate, disabled mode, and transport independently testable.
export function createAnalytics(config: Configuration, runtime: Runtime) {
  let accepted = false, loading = false, sink: Sink | undefined, id: string | undefined, lastUrl: string | undefined;
  let queue: QueuedEvent[] = [];
  const enabled = () => config.provider === "posthog" && !!config.key && runtime.allowed();
  function track(event: string, props: AnalyticsProps = {}) {
    if (!enabled() || !fields[event]) return;
    const entry = { event, timestamp: new Date(), properties: { ...scrubAnalyticsProps(event, props), site_version: version, viewport_bucket: runtime.viewport() } };
    if (sink) { try { sink(entry); } catch { /* Analytics cannot affect the storefront. */ } }
    else { queue.push(entry); if (queue.length > 100) queue.shift(); }
  }
  function acceptGate() {
    if (!enabled()) { queue = []; return; }
    accepted = true;
    if (loading) return;
    loading = true;
    try {
      id = runtime.distinctId();
      void runtime.load(config, id).then(loaded => {
        if (!enabled()) { queue = []; return; }
        sink = loaded;
        const pending = queue; queue = [];
        for (const entry of pending) { try { sink(entry); } catch { /* Continue flushing safe events. */ } }
      }).catch(() => { queue = []; });
    } catch { queue = []; }
  }
  return {
    track, acceptGate,
    pageview(url: string) { if (!enabled() || lastUrl === url) return; lastUrl = url; track("$pageview", { path: url }); },
    checkoutMetadata() { return accepted && enabled() && id ? { distinctId: id, viewportBucket: runtime.viewport() } : undefined; },
  };
}

async function loadPostHog(config: Configuration, distinctId: string): Promise<Sink> {
  const { default: posthog } = await import("posthog-js");
  posthog.init(config.key!, {
    api_host: config.host || "https://us.i.posthog.com",
    autocapture: false, capture_pageview: false, capture_pageleave: false,
    disable_session_recording: true, enable_recording_console_log: false, capture_performance: false,
    disable_surveys: true, advanced_disable_flags: true, advanced_disable_feature_flags: true,
    disable_external_dependency_loading: true, save_referrer: false, save_campaign_params: false,
    persistence: "memory", person_profiles: "never", respect_dnt: true, ip: false,
    bootstrap: { distinctID: distinctId, isIdentifiedID: false },
    before_send: event => {
      if (!event || !fields[event.event]) return null;
      // Remove SDK-added URLs, referrers, person properties, and device identifiers too.
      event.properties = {
        ...scrubAnalyticsProps(event.event, event.properties), distinct_id: distinctId,
        site_version: version, viewport_bucket: event.properties.viewport_bucket,
        $process_person_profile: false, $geoip_disable: true, $ip: null,
      };
      return event;
    },
  });
  return entry => { posthog.capture(entry.event, entry.properties, { timestamp: entry.timestamp }); };
}

let memoryId: string | undefined;
const analytics = createAnalytics({
  provider: process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER,
  key: process.env.NEXT_PUBLIC_POSTHOG_KEY,
  host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
}, {
  allowed: () => typeof window !== "undefined" && ![navigator.doNotTrack, (window as Window & { doNotTrack?: string }).doNotTrack].some(value => value === "1" || value === "yes"),
  viewport: () => window.innerWidth < 768 ? "mobile" : window.innerWidth < 1024 ? "tablet" : "desktop",
  distinctId: () => {
    if (memoryId) return memoryId;
    try { const saved = localStorage.getItem("snp-analytics-id"); if (saved && analyticsIdPattern.test(saved)) memoryId = saved; } catch { /* Anonymous in-memory fallback. */ }
    memoryId ||= `snp_${crypto.randomUUID()}`;
    try { localStorage.setItem("snp-analytics-id", memoryId); } catch { /* Storage is optional. */ }
    return memoryId;
  },
  load: loadPostHog,
});
export const track = analytics.track;
export const pageview = analytics.pageview;
export const acceptAnalyticsGate = analytics.acceptGate;
export const getAnalyticsCheckoutMetadata = analytics.checkoutMetadata;
