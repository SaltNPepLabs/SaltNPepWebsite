# Analytics and conversion metrics

Analytics is optional and disabled by default. The static storefront uses PostHog through `src/lib/analytics.ts`; the separate Node checkout API sends verified paid-order events using plain `fetch`. `output: "export"` is unchanged. Tracking adds no visible elements.

## Enable

1. Create a PostHog project. Copy its **project ingestion key** (normally `phc_...`), not a personal/admin API key. Choose the matching ingestion host: `https://us.i.posthog.com` or `https://eu.i.posthog.com`, or your HTTPS self-hosted origin.
2. In `.env.local` and the production frontend build environment, set:

   ```dotenv
   NEXT_PUBLIC_ANALYTICS_PROVIDER=posthog
   NEXT_PUBLIC_POSTHOG_KEY=phc_your_project_key
   NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
   ```

   Public variables are compiled into the static export. Rebuild and redeploy after changing them. Unset provider, `none`, or a missing key is a silent no-op and never imports/initializes the SDK.
3. In `.env.checkout` on the separate API host, set:

   ```dotenv
   ANALYTICS_ENABLED=true
   POSTHOG_API_KEY=phc_your_project_key
   POSTHOG_HOST=https://us.i.posthog.com
   ```

   Use the same project and host as the browser. Restart the API. These settings do not enable checkout or live payments; existing merchant, research-review, shipping, tax, and payment guards still apply.
4. Add an accurate analytics disclosure to the privacy policy before launch. Suggested wording to review: “After you accept the site entry confirmations, we use PostHog to measure visits, product interactions, and completed purchases using an anonymous browser ID. We respect Do Not Track and do not send contact details, shipping information, or research-purpose text to analytics.” Entry acceptance is the existing age/research acknowledgment; it does not constitute a new analytics-consent checkbox. Review any consent requirements for your launch destinations before enabling analytics.
5. With a new browser profile, verify no PostHog SDK or requests load before acceptance. Accept the gate, visit a product, add a vial, open the cart, and test checkout. In PostHog inspect the events and properties. Revenue must come from a verified Stripe test webhook or the staff Venmo confirmation command, never the result page or preview simulator. Set provider to `none` and rebuild to verify zero analytics requests after acceptance as well.

## Event dictionary

All events carry `site_version` from `package.json` and `viewport_bucket`: mobile below 768px, tablet 768–1023px, desktop from 1024px. Prices are integer USD cents. Item counts are total vial quantities, not cart line counts. Public `glp-3` is used consistently for the legacy internal `retatrutide` catalog ID.

| Event | Trigger | Properties |
| --- | --- | --- |
| `$pageview` | Initial route and every App Router pathname/search-param navigation | `path` (all query values and fragments removed) |
| `age_gate_viewed` | Entry dialog first presented this visit | none |
| `age_gate_accepted` | Both confirmations accepted | none |
| `product_viewed` | Product detail mounts | `product_slug`, `product_name`, `variant`, `price_cents` (omitted when pricing is pending) |
| `carousel_interaction` | Drag, arrow, or selector finishes settling | `method` (`drag`, `arrow`, `selector`), `product_slug` |
| `carousel_product_opened` | Active vial link clicked | `product_slug` |
| `add_to_cart` | Successful add or quantity increase | `product_slug`, `variant`, `quantity` (actual delta), `price_cents` (unit price), `cart_value_cents` (after mutation) |
| `remove_from_cart` | Remove, clear, or quantity decrease | Same as add; removed delta uses the previous unit price |
| `cart_opened` | Drawer opens | `item_count`, `cart_value_cents` |
| `checkout_started` | Checkout mounts with hydrated items | `item_count`, `cart_value_cents`, `items`: `{slug, variant, qty}` |
| `checkout_submitted` | Validated order request sent | `payment_method` (`stripe` or `venmo`), `cart_value_cents` |
| `checkout_error` | API, native form validation, request validation, or storage failure | `stage`, `error_code` (fixed codes/HTTP status codes; never exception messages) |
| `order_result_viewed` | Result loads or its order status changes | `status`, `order_ref` (opaque SNP UUID; omitted if unavailable) |
| `research_search` | Library/compound search or filters settle for 400ms; also initial result state | `query_length`, `result_count`, `filters`: compound, type, year, sort, view, or evidence where applicable |
| `research_paper_opened` | Static `/science/[slug]/[pmid]` reader opens | `compound_slug`, `pmid` |
| `outbound_click` | Certificate PDF, PubMed, or PubMed Central link clicked | `type` (`certificate_pdf` or `pubmed`), `product_slug` or `pmid` when available |
| `order_completed` | Verified paid Stripe webhook or admin Venmo mark-paid | `order_ref`, `revenue_cents`, `item_count`, `items`: `{slug, variant, qty, price_cents}`, `payment_method`, `shipping_cents` |

Keyboard carousel arrows are counted as `arrow`; Home/End as `selector`. Retargeted/interrupted springs emit only the final completed settle. Cancelled drags do not count. Pageview effects are deduplicated for the same URL; different query strings still produce separate pageviews with the same sanitized `path`. Product views describe the initial variant; cart events carry the actual chosen size.

## Privacy and lifecycle

- The SDK imports only after current or saved entry acceptance. Gate and page events queue in memory (at most 100) until ready. Visitors who never accept send nothing, so gate abandonment before acceptance cannot be measured remotely.
- Unset/disabled analytics, missing browser key, or Do Not Track suppress all browser captures and anonymous checkout metadata. Paid-order capture is also suppressed for orders without valid browser metadata, including DNT and older orders. Dashboard revenue therefore measures tracked purchasers; the order database remains the financial record.
- A random anonymous `snp_` UUID is stored only after acceptance. It is reused as the browser PostHog `distinct_id`, passed in optional checkout metadata, and saved with the immutable order. Analytics metadata is excluded from checkout idempotency fingerprints, so changes cannot create another order on retry. No `identify` call associates it with a customer.
- Autocapture, recording, console recording, performance capture, surveys, feature flags, referrer/campaign collection, person profiles, and automatic page/pageleave capture are disabled. SDK persistence is memory only. The wrapper also removes SDK-added URLs, referrers, and person/device properties before sending. IP/geolocation enrichment is disabled; any network service still receives connection-level metadata.
- Events use a per-event property allowlist. Catalog strings/variants, numeric counts, fixed enum filters/error codes, PMIDs, and opaque order references are validated. Unknown keys and nested free text are dropped. No names, emails, phone numbers, addresses, institution/research-purpose text, access tokens, raw searches, or exception messages enter events. Query strings and fragments are discarded completely; unknown route paths become `/unknown`.
- Do not add direct vendor calls in components, free-form props, or unrestricted URLs. Extend the wrapper allowlist and tests when adding an event. Do not enable recording/autocapture remotely or add customer identity/profile enrichment.

## Paid delivery and retries

The API confirms and commits payment first, then starts a capture without awaiting it. Analytics errors, invalid host/key settings, and store/network failures never fail payment reconciliation. Venmo confirmation likewise commits and prints the paid order first; the short-lived admin CLI drains the bounded background delivery before closing SQLite. Each network attempt has a five-second timeout.

The `order_analytics` table stores a delivery claim, stable event UUID, and successful send timestamp. Concurrent captures skip a claimed order; acknowledged orders skip all future attempts, including after an API restart. A crashed claim expires after 30 seconds. Ambiguous/failing requests retry with the same UUID so PostHog can deduplicate ingestion. The stored event UUID is the opaque order UUID. Item prices and totals come exclusively from the saved server order; customer data is never copied to the payload.

Failed deliveries remain eligible for a subsequent webhook/confirmation or explicit recovery:

```powershell
npm run orders -- retry-analytics
```

Run this on the API host after an outage (wait 30 seconds for crashed claims), or schedule it in the existing operations environment if desired. It changes only analytics delivery state. There is no automatic external scheduling and no infinite retry loop. A successful delivery record is an ingestion acknowledgment, not proof that a dashboard has refreshed.

## Recommended PostHog dashboard

Use events from this project, with an ordered unique-browser funnel and a conversion window long enough for manual research review (start with 7 days):

1. `$pageview` → `product_viewed` → `add_to_cart` → `checkout_started` → `checkout_submitted` → `order_completed`. Break down by `viewport_bucket`; compare mobile, tablet, and desktop conversion. Add a separate accepted-gate funnel, remembering unaccepted visitors never send data.
2. Revenue by product: flatten `order_completed.items` in a HogQL insight, group by `items.slug` and sum `items.qty * items.price_cents`. This excludes shipping. Total paid revenue sums `revenue_cents`; report shipping separately. A multi-product order's full total must not be assigned to every product.
3. Top products by views: count `product_viewed`, grouped by `product_slug`, with unique-browser counts alongside total views.
4. Add-to-cart rate per product: a `product_viewed` → `add_to_cart` funnel requiring matching `product_slug`. Compare unique-browser conversion rather than dividing unrelated raw event totals.
5. Research library usage: counts/unique browsers for `research_search`, `research_paper_opened`, and PubMed `outbound_click`; break down by compound, filter, query length, and result count. Raw queries are intentionally unavailable.
6. Checkout errors by `stage`/`error_code`, plus paid revenue and order counts by `payment_method`. Use the anonymous ID to join the purchase funnel, not `order_ref` as a person identifier.

## Verification

`npm test` includes the existing checkout regressions plus client no-op/DNT, gate queue, sanitization, navigation deduplication, SDK failure isolation, durable/concurrent server deduplication, and retry/failure tests. Run `npm run lint` and `npm run build` as well. Confirm `out/` contains the static homepage, product, checkout, and paper-reader HTML routes. Use browser Network inspection on the exported site to verify zero PostHog requests in disabled mode; a configured test project is needed to verify the live dashboard end to end.
