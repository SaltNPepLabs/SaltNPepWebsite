# Responsive QA

Checked October 11, 2026 against the compiled production export at `http://127.0.0.1:3016`. Three workers covered product/catalog pages, research pages, and the shared shell/checkout; the coordinating pass covered the homepage, FAQ, dense viewport resizing, and integration. The export includes the Aurum catalog from commit `cce27e1`.

## Complete route inventory

Every public exported page received full-page layout checks, including content below the initial viewport and the footer.

| Page family | Public paths |
| --- | ---: |
| Homepage | 1 |
| Product collection | 1 |
| Product details | 28 |
| Research library | 1 |
| Compound research collections | 8 |
| Publication readers | 1,448 |
| FAQ | 1 |
| Checkout | 1 |
| Checkout result | 1 |
| Public 404 | 1 |
| **Total** | **1,491** |

The export contains 1,492 HTML files. The additional `/_not-found.html` is the framework duplicate of the public 404 page, rather than an additional content page. Build route counts also include framework routes and should not be substituted for this HTML inventory.

## Changes

- The header fits narrow phones, its menu scrolls on short screens, and menu Escape/focus behavior remains available. Bag and menu controls have usable touch targets.
- The homepage hero and carousel use normal grid flow, with separate space for the heading, vial, product details, caption, and selectors. Short desktop screens scroll through the hero. Mobile arrows and calls to action remain reachable.
- Product headings fit their actual column width. Quantity tiers use two columns until the purchase panel has room for four, including the highest catalog price. Collection controls, product identities, reviews, and certificate sections wrap without forcing horizontal overflow.
- Research filters, bibliography metadata, long reader titles, expanded studies, pagination, and lower policy sections wrap within the viewport. Controls retain readable mobile text and usable targets.
- The cart drawer scrolls on short screens while keeping removal, quantity, and checkout controls reachable. Checkout fields stack on phones; validation and status recovery focus the relevant content.
- Footer links and legal text wrap through narrow widths.

## Layout coverage

All measurements use CSS pixels. Full-page checks scroll through the content and inspect document width, visible element bounds, internal overflow, and text-line bounds. Product checks also check broken images. Research checks verify the expected publication content and lower boundary, rather than merely checking that a route rendered.

| Coverage | Result |
| --- | --- |
| Product collection and all 28 details at 13 viewports | 377 full-page checks; zero layout failures or page errors |
| All 43 public product sizes plus collection at 161 fluid widths | 7,084 layouts; zero failures |
| All 40 purchasable sizes at every integer width from 1,101 through 1,400 | 12,000 layouts; zero failures |
| All 1,457 research paths, including paginated/expanded collection states, at 12 viewports | 18,108 full-page checks; zero layout or content failures |
| Eleven representative templates through dense resizing and three browser engines | 19,503 layout measurements; zero layout failures |
| Homepage at 19 viewports | No heading/vial/detail/control overlap, overflow, broken images, or page errors |
| Shared shell and checkout, including demo order states | 259 demo checks and 215 production checks at 11 sizes; zero browser errors |
| Checkout and FAQ narrow-width follow-up in Chromium and Firefox | 504 measurements; zero overflow |
| Settled WebKit follow-up: 11 templates at six viewports | 66 layout checks; zero layout failures, runtime errors, or failed requests |

Product viewports: `280x653`, `320x568`, `360x640`, `390x844`, `600x900`, `768x1024`, `1024x768`, `1440x900`, `1920x1080`, `2560x1440`, `3840x2160`, `844x390`, and `568x320`. The fluid sweep spans 280–1,921 pixels and includes each relevant breakpoint and its immediate neighbors. Exact text bounds at the four-column quantity threshold were checked separately to retain clearance for fractional pixel rounding. The highest-price tier also passed exact text-bound checks in Firefox and WebKit at 280, 642, and 1,280 pixels.

Research viewports: `280x844`, `320x844`, `360x844`, `390x844`, `768x1000`, `1024x1000`, `1440x1000`, `1920x1000`, `2560x1000`, `3840x1000`, `568x320`, and `844x390`. The sweep inspected 1,331,076 visible element bounds and 1,462,168 text-line bounds. All 1,448 reader contents were verified. A collapsed whitespace difference in a source author field was reconciled against rendered HTML and rechecked without failure.

Dense integration coverage uses the homepage, collection, MT-2, BPC-157, research library, BPC-157 research collection, a publication reader, FAQ, checkout, checkout result, and 404. Chromium checks every integer width from 280 through 1,920 and then every 16 pixels from 1,936 through 3,840: 1,761 widths per template, totaling 19,371 measurements. Firefox and WebKit add 132 measurements at `280x568`, `320x568`, `390x844`, `768x1024`, `1440x900`, and `667x375`.

Homepage coverage additionally includes widths around the 760, 1,100, and 1,101 pixel transitions, a 1,440 by 500 short desktop, and 568 by 320 landscape. Full-page screenshots at 280, 320, 390, 568, 768, 1,101, 1,440, 1,920, and 3,840 pixels were visually inspected.

## Interaction and visual checks

- Product/catalog checks exercised 195 collection states, 559 size selections, 2,080 quantity-tier selections, 520 add-to-cart confirmations, 312 review rating filters, and 1,040 review-page states. All 200 unique published review records were covered; unavailable sizes remain unorderable. Every product detail and the collection were visually inspected from top to footer at 280 pixels, with additional desktop, ultrawide, landscape, highest-price, and final-review-page examples.
- Research checks exercised 1,782 interactions across 99 route/viewport cases: search, type/year filters, sorting, reset, empty results, pagination, expanded studies, and reader return state. Visual review used 24 full-page screenshots and 50 viewport tiles, including longest-title, curated, retracted, and citation-only readers, library/collection pages, and lower policy/footer sections.
- Homepage and FAQ checks covered 475 states: all eight carousel selections and all 17 FAQ answers across 19 viewports. Keyboard Enter/Space, opening/closing answers, and primary destinations passed. The existing 11-group spring-carousel regression also passed, including rapid input, drag cancellation, native mobile touch, vertical scrolling, product links, keyboard navigation, and reduced motion.
- Shared-shell checks exercised entry confirmation, menu open/close/Escape/focus, empty and populated bag, all-catalog cart totals, quantity changes, removal, clearing, reload persistence, checkout validation, invalid-order recovery, and long/short-screen scrolling. Local demo states covered staff approval/rejection, failed and paid card states, and paid Venmo status.

## Build and source checks

- `npm run build`: passed with the final responsive source.
- `npm run lint -- --ignore-pattern 'data/**'`: passed for tracked application, server, and tooling source.
- `npm test`: eight tests passed, including catalog pricing, immutable order snapshots, review/payment invariants, and checkout HTTP behavior.
- `git diff --check`: passed.

The default `npm run lint` was also run once. It recursively scans ignored research downloads and local audit scripts under `data/`, where it reported 76 errors and 2,125 warnings. The source-only command above passes; these ignored artifacts were not folded into the responsive package.

## Browser observations and limits

Chromium supplies the complete route matrix. Firefox and WebKit cover the representative templates and narrow checkout/FAQ follow-up, rather than all 1,491 routes in every engine.

The rapid WebKit navigation harness recorded cancelled Next.js prefetch requests while leaving the previous route. A separate settled run passed all 66 checks without runtime errors or failed requests; a rapid control reproduced the cancellation behavior. The simple static preview also returns 404 for some flattened Next.js segment-prefetch URLs although the nested export files exist. The diagnostic logged 55 such HTTP responses separately. Page rendering and interactive checks passed; preview-server routing was not changed in this package.

These checks cover the listed route/state matrices, dense ranges, browser engines, and representative manual visual review. They do not claim a physical-device test of every device or an exhaustive check of every possible viewport on every page. Publication readers all received automated full-page/content inspection; manual visual inspection used representative readers. Live payment-provider credentials and real charges were unnecessary for responsive verification; payment-state checks used the local demo.

The completed package is local. Production deployment and the owner's pending carousel UX review are separate follow-ups.

## Local evidence

Verbose reports, scripts, logs, and screenshots remain in ignored `data/` rather than inflating Git history:

- Products: `products-responsive-final/audit.json`, `products-responsive-final/quantity-margin.json`, `products-responsive-final/cross-engine-margin.json`, `products-responsive-final-run.log`, and `products-responsive-final/` screenshots.
- Research: `research-responsive-summary.json`, `research-responsive-all.json`, `research-responsive-all-280.json`, `research-responsive-content-recheck.json`, `research-responsive-interactions.json`, and `research-responsive-final-visual/`.
- Integration: `responsive-dense-results.json`, `home-responsive-results.json`, `responsive-interactions-results.json`, and `spring-carousel-checks.json`.
- Shell/checkout: `shell-responsive-demo-audit.json`, `shell-responsive-static-audit.json`, `shell-responsive-overflow-dense.json`, `shell-responsive-webkit-settled.json`, and `shell-responsive-webkit-rapid.json`.
- Final commands: `responsive-build-final.log`, `responsive-source-lint-final.log`, and `responsive-tests-final.log`.
