# Storefront services — local implementation, October 20, 2026

Nothing published. No provider accounts created or messages sent.

## Working locally
- `/coas`: central searchable report directory for all 28 compounds. Exact existing report-source precedence retained, including Lumira overrides. Missing reports and sample-scope limitations remain explicit. No new inventory-match claim.
- `/about`: factual positioning; no invented founding history, credentials, laboratory ownership or staff biographies.
- `/contact`: hello@saltnpeplabs.com mail link, documentation and order links.
- `/policies`: clearly marked local draft, not a completed legal policy package. Final entity/address, retention, returns/cancellation and provider disclosures required before launch.
- Catalog recommendations: four other catalog entries, excluding current product; no combination/use recommendations.
- Quantity controls: compact stepper and total, no discount claims; all variants now flat per-vial including Pinealon/Epitalon. Saved order snapshots stay immutable.
- Shipping: API configuration and checkout preview now zero shipping for supported destinations. Existing destination allowlist and checkout disable/approval guards retained. This applies only to new orders; old snapshots are not rewritten.
- Owner specified Utah County local next-day service; shipped orders outside county do not inherit next-day promise. US-only scope retained from existing site until owner confirms otherwise.
- EN/ES: persisted language preference, header/footer, new service pages and central COA interface translated. Existing homepage/catalog/product/checkout/FAQ/research text is NOT fully translated; Spanish rollout remains incomplete. Original certificates remain source language.

## Prepared, not functioning as live services
- `/account`: future customer portal entry plus existing browser-saved checkout status link. No customer authentication, password reset, account-based order history or shipment tracking is implemented. Hosted portal URL alone does not provide those integrations.
- Support disclosure widget: honest offline state and contact link; optional HTTPS hosted chat URL. No SMS forwarding or live operator connection currently.
- Footer newsletter: no addresses collected before provider is connected. Optional hosted signup URL.
- `/rewards`: inactive pending owner reward rules, provider and paid-order/refund integration. No reward balance or credit issuance.
- `/delivery`: cutoff engine with America/Denver daylight-saving support; inactive schedule until owner supplies cutoff and working days. No customer address coverage check yet. Countdown must remain inactive until inventory/approval and delivery fulfillment can meet advertised service.

## Provider choices and setup
Chat candidate: tawk.to, two operator accounts and mobile push apps; personal phone numbers need not be displayed. Owner must create/authorize service account and add both operators. Use provider hosted chat URL first, later optional consent-aware widget.
- https://www.tawk.to/mobile-apps/
- https://help.tawk.to/article/how-to-test-push-notifications-on-the-tawkto-app
Newsletter candidate: Brevo hosted signup with double opt-in and unsubscribe controls; owner must configure sender/domain and privacy disclosure. No test or marketing messages sent.
- https://help.brevo.com/hc/en-us/articles/208771869-Create-a-sign-up-form-in-Brevo
Accounts require a selected authentication provider plus backend ownership checks, verified-email linking, session revocation, password recovery and fulfillment tracking integration. Do not substitute localStorage identity for authentication or expose orders by email alone.

Public build variables (URLs validated as HTTPS, credentials rejected):
NEXT_PUBLIC_SUPPORT_EMAIL (defaults hello@saltnpeplabs.com)
NEXT_PUBLIC_CUSTOMER_PORTAL_URL
NEXT_PUBLIC_SUPPORT_CHAT_URL
NEXT_PUBLIC_NEWSLETTER_SIGNUP_URL
NEXT_PUBLIC_REFERRAL_PORTAL_URL
No secret keys or personal phone numbers belong in these variables.

## Remaining owner input
- Daily Mountain Time cutoff, accepted-order days, delivery days/holiday exceptions.
- Confirm US-only free shipping; current checkout is US-only with configured state allowlist.
- Referral eligibility, credit values, expiry/refunds policy.
- Business legal identity/address, return/cancellation rules, privacy retention and provider choices.

## Validation
Run npm run lint, npm test, node --import tsx --test server/storefront.test.ts, npm run build. Added regressions for summer/winter cutoff, closing boundary, unsupported days, flat pricing across every variant and zero shipping despite stale shipping env.


## Interactive local previews (owner requested)

Unconnected account/tracking, rewards, delivery timer, newsletter and support chat now render interactive demonstration UIs on loopback hosts only. Sample account opens a dashboard with stage selector/profile/rewards; referrals show an explicitly illustrative $20 balance; delivery shows a sample countdown and local/shipping switch; newsletter previews a confirmation; chat renders labeled canned replies. No authentication, messages, subscriptions, credits, clipboard sharing or external service requests occur. Demo state stays in component memory. Local preview navigation exposes each feature. Existing real-service configuration and checkout remain unchanged. EN/ES supported for these previews; existing catalog/research translation remains incomplete.
