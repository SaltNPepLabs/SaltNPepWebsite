# Site entry confirmation

Visitors without a saved confirmation must complete the entry form before interacting with any storefront route. Both checkboxes are required and start unchecked:

- I am over the age of 21
- I understand that these are research compounds

The Enter site button becomes available only after both statements are checked. Confirmation is saved in local storage under `snp-entry-confirmation-v1`, with no automatic expiry. Acceptance survives navigation, reloads, closing tabs, and future visits in the same browser profile and site origin. Other open tabs also dismiss the form when acceptance is saved. Clearing the site's browser storage or using a different profile/origin requires confirmation again; private browsing storage lasts only as long as the browser permits.

Existing session-storage confirmations are carried into local storage without asking again. If local storage is unavailable, session storage preserves acceptance for the current tab; if both are unavailable, memory preserves acceptance during app navigation and a reload asks again. A future change to the agreement can use a new versioned storage key to require renewed confirmation.

The root layout includes `SiteEntryGate` around the header, main content, and footer. The static export renders the form with the storefront inert before hydration. JavaScript promotes the form to a native modal, locks background scrolling, focuses the first checkbox, and prevents dismissal through Escape or the backdrop. Entry restores scrolling and focuses the main content. The form uses the existing ivory and charcoal palette and supports narrow and short screens.

## Validation on October 11, 2026

Component lint and the production static build passed (1,494 routes). Browser checks on the built preview confirmed that a fresh origin requires both checkboxes, a single checkbox keeps entry disabled, and acceptance dismisses the form in another open tab. Reloading preserved acceptance. After closing both test tabs, a new tab opened directly to a product without asking again. The existing preview tab also retained its earlier confirmation after reload. Return-visit proof is in ignored `data/entry-persistence/return-visit.jpg`.

## Validation on October 4, 2026

Lint and production build passed. Chromium checks passed at 1440×900, 768×900, 390×844, 320×568, and 667×375, covering required checkbox states, keyboard focus, dismissal prevention, viewport fit, confirmation persistence, and cart behavior. Fresh direct visits to collection, product, science, FAQ, and checkout routes require confirmation. Storage-unavailable navigation/reload, reduced motion, and the pre-hydration static gate also passed. Desktop, small-phone, and short-screen layouts were visually inspected.

Evidence is in ignored `data/site-entry-gate-checks.json`, `data/check-site-entry-gate.mjs`, and `data/site-entry-gate-*.png`. Local static-preview requests for missing Next.js segment-prefetch files returned 404; these were recorded separately from gate checks. Normal navigation and reload checks passed. The built preview is http://127.0.0.1:3016/.
