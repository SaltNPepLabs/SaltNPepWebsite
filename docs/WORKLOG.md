# Worklog

## Owner-approved removal: storage and shelf-life claims

Removed remaining storage temperatures, light/moisture handling claims and long-term stability assertions from the eight original product records. Removed storage and shelf-life FAQ entries, including the 24+ month assertion and COA expiration instruction, plus the comparative stability sentence. Product cards no longer display an empty Storage subsection. Laboratory preparation boundary remains. This supersedes the earlier storage/shelf-life deferral; other numbered recommendations remain unchanged. Local only; no push or deployment.


## 2026-10-20: Remaining personal-use instruction cleanup

Owner authorized removing remaining personal-use instructions/promises. Reviewed product copy, FAQ, homepage, purchase screens and scientific-review component. All 28 product descriptions are neutral; no personal dosing schedules found. Removed step-by-step bacteriostatic-water mixing directions and post-reconstitution 21/30-day use windows from the original eight product records and FAQ. Added a laboratory-assay preparation boundary and FAQ stating no personal-use mixing/dosing/administration instructions. Existing dry-storage/shelf-life, quality/COA claims, research summaries, TB-500 presentation, imagery, prices and checkout logic remain unchanged; these separate deferred topics are not validated by this cleanup. Local only, rebuild static preview on port 3015; no publication authorized.


## Owner correction: restore previous TB-500 research presentation

Reverted the latest TB-500-specific library headings, inventory-match warnings, and per-publication badges to their pre-audit wording and placement. Existing related-thymosin explanations remain as before. Other library improvements and earlier product-specification changes are unchanged. Local only; no publication authorized.

## Owner correction: GLP-3 naming restored locally

Owner reversed only the scientific-name restoration. Public research titles, descriptions and displayed search terms again use GLP-3, with explicit adapted-title disclosure; original source records and PubMed search URLs remain intact internally. Keep the other library improvements: upfront limitations, citation-only records and TB-500 related-literature labels. No push or deployment authorized.


## 2026-10-04 - GLP-3 catalog naming

- Replaced the former compound name with GLP-3 in public product/research copy, routes, metadata, customer-review text, FAQ, and saved-order presentation. Kept internal order/variant identities and canonical scientific records stable. Research pages disclose the catalog label and show changed source passages as adapted excerpts rather than exact quotations; original publication links and exact PubMed search queries are preserved.
- Edited both existing vial photos with the built-in imagegen tool so their printed labels read GLP-3, preserving the illustrative 10 MG labels and respective studio/transparent backgrounds. Removed superseded public assets. Asset paths, prompts, and naming policy are in `CATALOG_NAMING.md`; current stock remains 30 mg with Pricing pending.
- Validation: full lint, seven checkout regressions, production build (1,474 static routes), research audit of all 1,448 readers/124 explanations, and static-preview test passed. Six browser check groups verified all exported HTML public text/links (1,472 HTML files), catalog/library search, all 56 customer reviews, curated and adapted readers, primary sources, return-state preservation, imagery, FAQ/homepage links, and desktop/320px layouts without page errors or overflow. Product and mobile reader screenshots were visually inspected. Evidence is in ignored `data/glp3-*` and `data/check-glp3-naming.mjs`.
- Local review: http://127.0.0.1:3016/products/glp-3 and http://127.0.0.1:3016/science/glp-3. The first build hit disk exhaustion; a later read-only check showed available space and the successful rebuild required no cleanup. Friction was logged. Committed locally; no push or deployment for this package.

## 2026-10-10 - Five-vial mobile carousel

- Restored the larger mobile center vial and the previous adjacent-vial size and positions. Added the two small, blurred, faded outer vials at the edges and moved mobile arrows below the vial artwork without changing the stage height or product-details layout.
- Kept the desktop carousel rules, all eight products, image assets, swipe handling, navigation controls, and animated centering behavior unchanged.
- Validation: browser checks at 320, 375, 390, and 430 px confirmed all five positions are visible with no horizontal page overflow; 1280 px desktop computed styles remain on the original desktop rules.

## 2026-10-07 - Removed carousel shadow and spotlight experiment

- Removed the measured center-vial floor shadow, stage-level shadow layer, resize observer, and center-only spotlight treatment.
- Preserved the existing full-screen carousel geometry, vial artwork, navigation, transitions, and responsive behavior unchanged.
- Validation: ESLint and production build passed; all 1,474 static pages generated successfully, and the final source diff passed whitespace checks.

## 2026-10-07 - Realistic floor-projected carousel shadows

- Reworked the active, adjacent, and outer vial shadows into layered ground-plane ellipses with visible separation from the bottle, warm brown-gray lighting, subtle reflections, and natural fade edges.
- Preserved the existing carousel geometry, vial artwork, sizing, navigation, transitions, and responsive behavior while synchronizing each shadow stack with its corresponding vial.
- Validation: ESLint and production build passed; all 1,474 static pages generated successfully. The final source diff passed whitespace checks, and the floor layer is positioned behind the stage with exact shared horizontal offsets for all five visible shadow states.
- Final browser screenshot verification remains blocked by the site-entry gate in the local automation environment; the application-level consent flow and temporary automation probes did not expose the carousel.

## 2026-10-07 - Refined compact floor shadows

- Replaced the broad blurred shadow stack with compact, layered radial-gradient ellipses using a darker center and warm charcoal-brown ambient falloff.
- Anchored every shadow to the actual bottom floor plane, retained the existing shared horizontal offsets and carousel transforms, and kept the shadow layer behind the vial images and all foreground content.
- Preserved the center, immediate adjacent, and outer visual hierarchy while keeping the existing responsive layout and carousel behavior unchanged.
- Validation: lint, production build, and diff whitespace checks passed. The static preview rendered the desktop carousel and shadow layer, but automated mobile inspection remained blocked by the site-entry gate's inconsistent hydration behavior after reload; the gate is unrelated to this CSS change.

## 2026-10-05 - Full-screen peptide hero carousel

- Replaced the homepage hero's compact carousel shell with a full-viewport, edge-to-edge desktop/mobile background while preserving the existing header, navigation, Bag, product data, routes, Collection, Research, and footer.
- Reused all eight shared product records and existing vial assets. The active vial is largest and sharpest, neighboring vials fade and blur progressively, and non-active vials select into the center before their existing product route is opened.
- Added responsive desktop/mobile background sources, floating vial framing, soft contact shadows, smooth cover-flow motion, arrows, dots, keyboard navigation, horizontal drag/swipe, reduced-motion support, and existing product metadata beneath the carousel.
- Preserved the existing thin header divider and left the remainder of the site unchanged.
- Validation: lint and production build passed. All eight product routes and static pages generated successfully.

## 2026-10-06 - Isolated homepage vial artwork

- Updated the homepage carousel to use the standalone vial assets from `public/images/vials` for all eight products. The root-level product photography remains unchanged for Collection cards and product detail pages.
- Kept the standalone asset selection limited to the homepage carousel; no Collection image references or shared ProductVial behavior were changed.
- Validation: lint and production build pass; the live homepage returns HTTP 200 with all eight standalone vial image routes available.

## 2026-10-04 - Removed reviews mentioning demo

- Removed all 59 complete review records containing "demo" in any text field, case-insensitively, and recomputed product counts. The 200 retained records remain unchanged: BPC-157 51, retatrutide 56, TB-500 46, and MOTS-c 47. Original dates remain hidden pending owner corrections.
- Validation: lint and production build (1,474 static routes) passed. Six Chromium check groups verified all 200 retained reviews across every page, rating filters/totals, averages, absence of removed records from exported HTML and client payloads, and 390px/320px layouts without overflow or page errors. The 320px review layout was visually checked. Evidence is in ignored `data/demo-review-*` and `data/check-demo-review-removal.mjs`.
- Local preview: http://127.0.0.1:3016/products/bpc-157#customer-reviews. Concurrent limited-size changes were preserved and excluded from this commit; no push or deployment for this package.

## 2026-10-04 - Required age and research entry confirmation

- Added a sitewide entry form requiring both I am over the age of 21 and I understand that these are research compounds. Both start unchecked, and Enter site is disabled until both are checked. Confirmation is retained for the current tab session, with an in-memory fallback when storage is unavailable.
- Wrapped the shared storefront in `SiteEntryGate`, including direct route visits and pre-hydration static HTML. The native modal prevents Escape/backdrop dismissal, blocks background interaction and scrolling, starts focus on the first checkbox, and restores focus to main content after entry. Matched the ivory/charcoal palette and supported narrow and short screens.
- Validation: full lint, production build, scoped whitespace checks, and Chromium checks passed at 1440×900, 768×900, 390×844, 320×568, and 667×375. Verified required states, keyboard focus, dismissal prevention, viewport fit, persistence/reload, fresh direct routes, unavailable storage, reduced motion, static HTML, and cart controls. Desktop, small-phone, and short-screen layouts were visually inspected. Missing Next.js segment-prefetch files produced separately recorded local-preview 404s; navigation and reload checks passed. Evidence is in ignored `data/site-entry-gate-*` and `data/check-site-entry-gate.mjs`.
- Local preview: http://127.0.0.1:3016/. Policy and implementation notes are in `docs/SITE_ENTRY.md`. Concurrent size and research work was preserved; no push or deployment.

## 2026-10-04 - Peptaura size options with pending pricing

- Added 31 size options across the eight currently sold compounds using Peptaura's catalog dose filters; the 23 new sizes show Pricing pending. Preserved original prices and every bulk tier. Collection cards list ranges; product selectors separate milligrams per vial from vial quantity, reset quantity after size changes, and disable ordering for pending sizes. Lab-report copy scopes results to tested samples. Sources and future pricing instructions are in `docs/PRODUCT_SIZES.md`.
- Added compound-and-size cart identity, persisted size IDs, legacy-cart migration, checkout size labels, canonical server pricing, and size-bearing order/payment descriptions. Browser cart creation, restoration, demo checkout, and API pricing reject unpriced or invalid sizes. Independent review found new validation messages were returning HTTP 500; changed them to actionable HTTP 400 responses and covered all three cases with zero stored orders.
- Validation: seven checkout/pricing tests, full lint, production build, and Chromium checks passed. Verified all 31 options and 23 pending states, existing quantity prices, keyboard selection, quantity reset, cart updates/removal, checkout labels/totals, persistence, legacy-cart migration, tampered storage, and 1440px/768px/390px/320px layouts without overflow or page errors. Visually inspected desktop pending, mobile priced, and collection screenshots. All ten Retatrutide dose filters also had vial listings. Evidence is in ignored `data/product-size-checks.json`, `data/check-product-sizes.mjs`, `data/sizes-*`, and `data/peptaura-reta-formats.json`.
- Local preview: http://127.0.0.1:3016/products. No push or deployment. Concurrent research and site-entry work is preserved and excluded from this package; owner prices remain pending.

## 2026-10-04 - Persistent filled-bag highlight

- Highlighted the header Bag with a warm-gold pill and charcoal count whenever it contains items. The highlight follows the persisted cart across navigation and reloads, and clears when the last item is removed or the cart is cleared. Existing add-to-cart sparks and count pulses remain; reduced motion keeps the static highlight.
- Validation: full lint, production build (26 static routes), and Chromium checks at 1440px, 768px, 390px, and 320px passed. Verified empty/full states, navigation, reload, removal, clearing, keyboard focus, reduced motion, no layout shift or overflow, and repeat-add spark behavior. Screenshots and checks are in ignored `data/cart-highlight-*`, `data/check-cart-highlight.mjs`, and `data/check-cart-spark.mjs`.
- Local preview: http://127.0.0.1:3016/products/bpc-157. No push or deployment.

## 2026-10-04 - Coming soon collection additions

- Added 20 missing names from the owner's Aurum catalog reference, bringing the collection to eight current products and 20 Coming soon previews. Each preview has a charcoal banner and neutral image placeholder; prices, specifications, launch dates, links, and purchase controls are omitted. Added availability filtering alongside search and categories. Existing products remain first; upcoming data is excluded from cart/checkout lookup and the homepage carousel. Source names and overlap/naming decisions are in `docs/UPCOMING_COLLECTION.md`.
- Validation: full lint, production build (26 static routes), and Chromium checks at 1440px, 768px, 390px, and 320px passed. Verified all 20 names/banners, DAC variants, search/alias/category/availability filters, empty/reset states, keyboard navigation, current product links/images, unchanged homepage, no overflow or page errors, and exclusion from purchasable lookup. Screenshots and checks are in ignored `data/upcoming-collection-*` and `data/check-upcoming-collection.mjs`.
- Local preview: http://127.0.0.1:3016/products. Committed locally; no push or deployment. Concurrent research work preserved and excluded from this package.

## 2026-10-04 - Header cart spark feedback

- Added a brief warm-gold spark and count pulse to the top-right Bag after each Add to Cart click. A session-only addition counter replays the animation for repeated clicks; cart restoration, quantity edits, removal, and clearing do not trigger it. Decorative sparks ignore pointer events and assistive technology; reduced motion disables the animation.
- Validation: full lint, production build (26 static routes), and Chromium checks at 1440px, 768px, 390px, and 320px passed. Verified quick repeat clicks, bundle quantities, animation completion, no horizontal overflow or page errors, drawer focus/Escape return, persistence without false feedback, and reduced motion. Screenshots and checks are in ignored `data/cart-spark-*` and `data/check-cart-spark.mjs`.
- Local preview: http://127.0.0.1:3016/products/bpc-157. No push or deployment; concurrent customer-review work preserved.

## 2026-10-04 - Isolated peptide collection images

- Removed the rocks and studio backgrounds from all eight collection photos using transparent vial cutouts. Collection cards display the full vial on ivory; the homepage carousel and product detail photos retain their original imagery. Asset references and exact generation prompt are recorded in `docs/COLLECTION_IMAGES.md`.
- Validation: full lint, production build (26 static routes), and Chromium checks at 1440px, 768px, 390px, and 320px passed. All eight cutouts load with transparency and contain sizing; search, category filtering, keyboard product navigation, and no horizontal overflow passed. Desktop/mobile screenshots and the verification script are in ignored `data/collection-cutouts-*` and `data/check-collection-cutouts.mjs`.
- Local collection preview: http://127.0.0.1:3016/products. No push or deployment; concurrent research changes preserved and excluded from this package.

## 2026-10-03 - Clickable compound study pages

- Made each research-library card open its compound study page and linked product scientific-review sections directly to the matching page. Added all eight static routes with the existing model, findings, limitations, citation, original publication link, and library return navigation.
- Kept the library concise with topic/model/publication summaries and preserved search and evidence/compound filters. Each compound currently has one selected primary paper; no new scientific claims or papers were added.
- Validation: lint, production build (26 static routes), exported-content checks for all eight pages and library/product/source/return links, and diff whitespace checks passed. Browser connection became unavailable before visual QA; desktop/mobile review remains pending. No deployment.
## 2026-10-03 - Research library browsing cleanup

- Pulled master with fast-forward only; already up to date. Replaced the large editorial hero, reading-room panel, and repeated library heading with a compact heading and immediate search/compound/evidence filters. Simplified paper typography and ivory cards while preserving every finding, limitation, model, citation, and source link.
- Moved the evidence-reading guide into a keyboard-accessible disclosure below the papers and reduced the scope section to readable footer notes. Search also matches author, journal, and year; reset clears all three filters.
- Validation: lint, production build (18 static routes), and diff whitespace checks passed. Browser verified human (2), preclinical (6), compound (1), tendon search (1), empty/reset (0 then 8), and keyboard guide expansion. Desktop, 390px, and 320px layouts checked with no horizontal overflow. Screenshot: data/research-library.jpg. Preview remains open on /science; not deployed.

## 2026-10-03 - Lighter collection browsing

- Removed the catalog banner/photo in favor of a compact heading above existing search and category filters. Simplified shared catalog/homepage cards to product photography with concise name, price, dosage, and category on ivory; removed dark panels, duplicate arrows, and View compound links.
- Kept full-card product navigation, accessible names, visible focus/hover feedback, and reduced-motion handling. Updated current project/design docs to supersede the dense dark-card direction.
- Validation: lint, production build (18 routes), desktop/mobile visual checks, search (1 BPC result), category (2 Recovery & Repair results), and keyboard Enter navigation to BPC-157 passed. 320px and 390px viewport overrides showed no horizontal overflow. Screenshot: data/catalog-light.jpg. Local preview remains open; not deployed.

## 2026-10-03 - Compact collection intro

- Reduced the desktop collection banner from 360px to 190px, narrowed its brand photo, and tightened page/search spacing so products appear sooner.
- Kept a compact side-by-side heading/photo on mobile with a 132px minimum height and updated responsive image sizes.
- Validation: lint, production build (18 routes), and diff whitespace checks passed. Chrome desktop and 390px mobile visually checked; 320px and 390px overrides showed no horizontal overflow. Local screenshot: data/catalog-compact.jpg. Preview remains open on /products; not deployed.

## 2026-10-03 - Local checkout UX demo

- Pulled master with fast-forward only; already up to date. Added `checkout:preview` on loopback port 3015 with no credentials or payment API required.
- Added labeled demo submission, sample details, approval/rejection and successful/failed payment controls. Demo data uses separate browser storage and discards contact/address/research details; development and localhost guards prevent production activation.
- Validation: lint, production build (18 routes), five payment API tests, and demo card/Venmo state/retry/privacy/localhost checks passed. Chrome verified bag -> sample submission -> review -> approval -> payment failure -> confirmation; checkout screenshot saved locally and 390px layout showed no horizontal overflow. Next dev refreshed its generated AGENTS guidance. Provider test checkout remains deferred until owner supplies credentials after UX review.

## 2026-10-03 - Reviewed checkout and payment foundation

- Pulled master through 1ec2a6d. Added checkout/research review, persistent cart and per-order access, hosted Stripe payment, verified manual Venmo business payment, and private status/recovery pages in the existing ivory/charcoal design.
- Preserved static export; added a separate Node 24 SQLite API and local staff CLI with immutable catalog pricing, idempotent requests, hashed order tokens, audit records, matching signed webhook verification, and unique Venmo transaction tracking. Live checkout remains disabled by default. Setup, single-instance deployment, and operational limits are in CHECKOUT.md with example environments.
- Independent payment review identified duplicate Venmo confirmation, lost browser access, and proxy rate limiting; addressed all three with regression checks. Updated Next.js/ESLint config to 16.3.8 and applied compatible dependency fixes. Production dependency audit is clean; five high development-only findings remain in the ESLint glob dependency chain (audit proposes a breaking downgrade).
- Validation: lint, five pricing/access/review/payment/proxy tests, production build (18 static routes), staff CLI help, and diff whitespace checks passed. No connected browser was available for visual QA, no real provider test checkout was performed, and no live payment/deployment occurred.
- Pending owner setup: merchant approval/credentials, authorized Venmo handle, shipping price/states, support email and tax policy; pending launch checks include inventory-matched batch evidence, research verification, stock/shipping/refunds, provider test-mode payment and desktop/mobile visual review.

## 2026-09-28 - Resources image overlay containment

- Made `resources new.png` an absolute full-section image layer in a native-aspect-ratio container, with the CTA and research disclaimer overlaid inside it.
- Verified overlay containment and no horizontal overflow at desktop and mobile sizes; `npm run lint`, `npm run build`, and `git diff --check` pass.

## 2026-09-28 - Resources section disclaimer hierarchy

- Added the exact research-only disclaimer below the existing VIEW RESEARCH CTA on the Resources artwork and removed the separate Purpose/research-only section.
- Kept baked-in image copy untouched and retained the image's natural aspect ratio and existing CTA styling.
- Verified `npm run lint`, `npm run build`, and desktop/mobile section bounds.

## 2026-09-28 - Resources section image refresh

- Replaced the Resources section image with `resources new.png`; its native dimensions match the prior asset, so existing natural-ratio sizing and CTA placement remain unchanged.
- Retained the single “VIEW RESEARCH” link to `/science` and all baked-in image text.
- Verified `npm run lint` and `npm run build`.

## 2026-09-28 - Homepage research artwork section

- Replaced only the “Curiosity is in our nature” section with `studies.png` at its natural 1905:825 aspect ratio and one `/science` CTA positioned beneath the baked-in left copy.
- Verified responsive image/CTA bounds at 1440x900, 390x844, 375x667, and 430x932 with no overflow; `npm run lint` and `npm run build` pass.

## 2026-09-28 - Collection intro copy refinement

- Changed the Collection intro eyebrow to “THE COLLECTION” and headline to “Research Compounds”; reduced the headline size while preserving its existing layout and supporting copy.
- Verified `npm run lint` and `npm run build`.

## 2026-09-28 - Collection card numbering removed

- Removed the `SNP / 01`-style labels from shared product cards and kept dosage badges aligned at the upper-right.
- Verified `npm run lint`.

## 2026-09-28 - Mobile hero image refresh

- Swapped only the mobile hero source to the uploaded `salty mobile offical.png` asset; retained the existing 100svh cover behavior and left desktop/content unchanged.
- The asset filename is spelled “offical” in `public/images`.
- Verified `npm run lint` and `npm run build`.

## 2026-09-28 - Mobile hero artwork swap

- Switched the mobile-only hero source to `mobile official.png` and kept centered `cover` rendering in the full `100svh` hero; desktop source and layout are unchanged.
- Verified the mobile source/fit at 375x667, 390x844, 393x852, 414x896, 430x932, and 430x740; confirmed desktop still selects `header desk.png`.
- Verified `npm run lint` and `npm run build`.

## 2026-09-28 - Mobile hero poster fit

- Changed only the mobile hero image fit from `cover` to centered `contain` at both mobile breakpoints, preserving the full dedicated poster composition over the existing hero background color.
- Kept the desktop `cover` behavior, mobile asset, crop source, overlays, and CTA unchanged.
- Verified 375, 390, 393, 414, and 430px widths at standard and short heights; no horizontal overflow or CTA clipping. `npm run lint` and `npm run build` pass.

## 2026-09-28 - Collection vial caption removed

- Removed the “THE SALT N’ PEP STANDARD / BRAND PHOTOGRAPH” caption from the collection intro image; no image, crop, sizing, or surrounding layout changed.
- Confirmed no vial-caption component or matching caption text remains in source. Verified `npm run lint` and `git diff --check`.

## 2026-09-28 - Desktop hero CTA centered

- Moved the desktop collection CTA to the horizontal center at 68% hero height; preserved its styling and the mobile positioning override.
- Verified `npm run lint` and `npm run build`.

## 2026-09-28 - Desktop hero image and CTA position

- Switched only the desktop hero fallback image to `header desk.png`; retained the mobile source and `object-fit: cover` behavior.
- Moved the desktop CTA to the lower-left near the PEP artwork while keeping the existing CTA styling and mobile position unchanged.
- Verified `npm run lint`, `npm run build`, and generated responsive image sources.

## 2026-09-28 - Vial caption and CTA consistency

- Removed the product-detail vial caption and its unused CSS rule.
- Unified the hero collection CTA with the existing mobile outlined treatment across all breakpoints, including removing the short-height padding variant.
- Verified `npm run lint`, `npm run build`, and `git diff --check`.

## 2026-09-28 - Product bundle quantity selector

- Replaced the product-page bulk-pricing display and separate quantity stepper with one responsive 1/3/5/10-vial selector driven by each product's existing `bulkPricing` data.
- Selected tier controls its displayed total/per-vial amount and passes the matching vial quantity to the shared cart, whose existing tier pricing keeps line totals and subtotal synchronized.
- Kept a 2x2 layout through tablet widths and four columns at large desktop; verified four tiers and matching totals on all eight exported product pages. `npm run lint` and `npm run build` pass.

## 2026-09-28 - Site-wide link and purchase hierarchy cleanup

- Replaced text arrow glyphs across hero, cards, nav, footer, catalog, research, reviews, and lab-report links with a shared directional SVG icon; underlined the product-card “View compound” action.
- Removed the decorative asterisk from header/footer wordmarks.
- Reordered product details so bulk pricing and Add to Cart precede descriptions, technical details, and the lab-report section; restyled report/registry links as secondary text links.
- Verified `npm run lint` and `npm run build` (16 static routes).

## 2026-09-28 - Mobile status block moved into header row

- Moved the mobile delivery/research block into the header itself at the top-left; kept Bag and menu on the top-right and removed the mobile wordmark/icon.
- Kept the desktop hero banner visible and hid the mobile header instance outside the mobile breakpoint.
- Verified header alignment at 360–430px, no horizontal overflow, and confirmed desktop banner visibility. `npm run lint` and `npm run build` pass.

## 2026-09-28 - Fixed mobile utility placement

- Changed the mobile hero utility block to fixed 24px left padding and 88px safe-area-relative top padding; removed viewport-height-dependent utility spacing.
- Kept the mobile image, CTA, header controls, and desktop layout unchanged.
- Verified matching utility coordinates at 375x667, 375x812, 390x844, 393x852, 414x896, 430x932, and 390x700; `npm run lint` and `npm run build` pass.

## 2026-09-28 - Responsive mobile hero flow

- Moved the existing delivery/research banner into the homepage hero so mobile can lay it out in normal flow below the transparent navigation; the shared header retains it on other routes.
- Kept only Bag/menu controls at the mobile top-right, hid the duplicate wordmark, and let the CTA flow to the bottom with safe-area padding.
- Tested 375x667, 375x812, 390x844, 393x852, 414x896, 430x932, and 390x700 against the static export; no horizontal overflow, utility/header overlap, or CTA clipping. Verified `npm run lint` and `npm run build`.

## 2026-09-28 - Mobile hero header spacing

- Hid the standalone brand asterisk on mobile and changed the delivery/research notices from a cramped row to a left-aligned stacked block beneath navigation.
- Preserved the mobile hero image, crop, baked typography, and bottom safe-area CTA; desktop remains unchanged.
- Verified `npm run lint`.

## 2026-09-28 - Mobile hero UI restoration

- Restored the existing logo and transparent bag/menu navigation on mobile, plus the delivery/research utility labels beneath navigation.
- Restored the collection CTA as an outlined button above the mobile bottom safe area; kept the desktop hero unchanged and retained the unmodified mobile background image.
- Verified `npm run lint` and `npm run build`.

## 2026-09-28 - Mobile hero image swap

- Switched the hero source to `header mobile.png` at the requested 768px breakpoint, keeping the desktop asset unchanged and using centered `object-fit: cover` in an exact `100vw` by `100svh` mobile hero.
- On mobile, hid the image-duplicating CTA and delivery strip while retaining the transparent functional header controls with safe-area spacing.
- Verified `npm run lint` and `npm run build`.

## 2026-09-28 - Homepage hero hierarchy cleanup

- Removed the redundant homepage header wordmark, hero disclaimer under the CTA, and principles/tagline strip; retained the single top research notice.
- Lightened homepage navigation and aligned delivery-message contrast; changed the CTA to “Explore the Collection” and moved it upward without altering hero artwork or crop.
- Verified `npm run lint` and `npm run build`.

## 2026-09-28 - Responsive homepage hero artwork

- Switched the homepage hero to the supplied desktop and phone header images through responsive picture sources, preserving each image's proportions without stretching.
- Removed prior hero copy and overlays; added only the collection CTA and research-use disclaimer as live HTML.
- Verified warning-free `npm run lint` and `npm run build`.

## 2026-09-24 - Catalog product image mapping

- Mapped all eight product slugs to their uploaded local PNG assets through the shared `ProductVial` component, covering clickable catalog cards and product detail pages.
- Updated image surfaces to square, edge-to-edge containers using centered `object-fit: cover`; product copy, pricing, links, and cart behavior remain unchanged.
- Verified `npm run lint` and `npm run build`.

## 2026-09-23 - Locked vial asset reuse

- Added the existing `ProductVial` photographic asset to collection cards without recreating or modifying the vial silhouette, label, proportions, or branding.
- Limited styling changes to the surrounding card image area and neutral mineral-toned framing; product information remains unchanged.
- Verified `npm run lint` and `npm run build`.

## 2026-09-23 - Screenshot-matched hero content pass

- Refined the existing `header.png` full-screen hero to match the supplied reference: layered left atmospheric wash, `18vh` headline placement, single-line editorial headline treatment, shortened supporting copy, and mid-hero `01` block.
- Removed the homepage eyebrow and CTA from this hero as requested; preserved the photograph, transparent shell, navigation, and downstream sections.
- Verified `npm run lint` and `npm run build`; Playwright was not run.

## 2026-09-23 - Homepage hero restraint pass

- Refined the existing full-bleed `header.png` hero without changing its structure or copy: reduced image crop, slimmed the transparent overlay header, reduced headline and CTA scale, tightened supporting content, and padded bottom microcopy inside the viewport.
- Added narrow-screen sizing and positioning adjustments; no additional image or product layer introduced.
- Verified `npm run lint` and `npm run build`; Playwright was not run.

## 2026-09-23 - Final full-bleed homepage hero

- Replaced the prior salt-flat plus layered-vial hero treatment with `public/images/header.png` as the single full-screen homepage background; removed the extra vial layer and split composition.
- Positioned the existing announcement messaging and transparent navigation over the homepage image while preserving normal header behavior on other routes.
- Preserved all existing hero copy and interactions; verified `npm run lint` and `npm run build`.

## 2026-09-23 - Homepage hero editorial composition

- Reworked only the homepage hero into a full-bleed `hero-salt-flats.png` salt-flat scene with selectable HTML copy and the existing Salt N’ Pep vial layered as a large angled foreground product image.
- Preserved the announcement bar, navigation, existing hero wording, CTA, research index, and study caption; added responsive mobile positioning without changing downstream homepage sections.
- Verified `npm run lint` and `npm run build`; Playwright was not run per request.

## 2026-07-12 - Control Tower contracts

- Added repo-owned document-authority and bounded read-only health contracts; the declared lint check passed.

## 2026-07-12

- Wrapped the generated Next.js rule block in `AGENTS.md` with the standard project-memory startup, verification, product-scope, and maintenance contract. No product code changed.

## 2026-07-04

- Replaced the default create-next-app README with a project-specific Henry's Peptides README, added `docs/index.md`, and linked the standard memory docs. No product code changed.

## 2026-06-16

- Configured Next.js static export for Render Static Site deployment and ignored local Codex/Next dev log files.
- Assigned distinct product images for the newly added peptide cards so MOTS-c, Pinealon, Epitalon, and GHK-Cu no longer share the same fallback image.
- Added MOTS-c, Pinealon, Epitalon, and GHK-Cu to the product catalog with product pages, category styling, pricing tiers, and research-study summaries.
- Renamed the visible brand to Henry's Peptides, including metadata titles, logo marks, footer copy, FAQ/product disclaimers, and support email.
- Redesigned the site around a dark graphite/brass industrial-luxury visual system.
- Updated global tokens, typography, header, footer, cart drawer, skeleton/loading states, homepage, catalog, product detail, science, and FAQ surfaces.
- Added responsive mobile handling for the compact header, product detail image badges, dark cart drawer, and mobile route checks down to 320px.
- Added cart drawer dialog semantics, initial focus on close, and Escape-to-close behavior.
- Verified `npm run lint` and `npm run build` pass.
- Browser-verified home, product detail, FAQ, science, and cart drawer on mobile; captured desktop/mobile screenshots in the repo root for local review.

## 2026-09-21 - SALT N’ PEP full revamp

- Owner confirmed SALT N’ PEP identity and supplied the vial reference, now bundled locally as the homepage hero. Rebuilt home, catalog, shared header/footer, packaging illustrations, global styling, and branded icon; restyled product, science, FAQ, cart, and loading surfaces.
- Added reusable compound cards, live search/category filtering, singular/plural results, and cart keyboard focus trap/return. Preserved eight products, bulk pricing, static export, and existing research content. Removed the previous brand support email pending new contact details.
- Verified desktop homepage and mobile home/catalog/product/FAQ/science/cart at 390px and/or 320px. Search, empty/reset state, category filtering, FAQ expansion, mobile menu, add-to-cart, bulk repricing ($107.97 for 3 BPC-157 vials, $79.98 for 2), removal, keyboard wrap, Escape, and return focus passed. Corrected 320px scrollbar overflow, mobile badge overlap, and Next smooth-scroll attribute warning.
- Final npm run lint and npm run build passed; static export generated all 16 pages/routes. Local review server: http://localhost:3015 using webpack. Existing tracked/untracked work preserved; not deployed.
- Owner visual acceptance is pending. Checkout remains Coming Soon; existing research/business claims and COA availability need verification before a sales launch.

## 2026-09-21 - Research, Utah delivery, and product reviews

- Two owner-requested agents delivered the searchable research hub and site-wide Local Utah delivery banner. A separate review agent checked all eight primary citations, study models/limitations, UI logic, and the later product changes; no unresolved findings. Fixed its small empty-state search-help finding.
- Added customer-review and scientific-review sections to all eight product pages. Customer sections show zero published reviews; no fabricated ratings or submission capability. Scientific sections reuse the verified paper data and replace the legacy study/steroid panels. FAQ research teaser now matches the hub.
- Owner selected the supplied SALT N’ PEP photo across catalog and product pages. Replaced CSS illustrations, retained the full vial, added explicit product quantity/format and brand-photo labeling; product hero loads eagerly.
- Browser-verified desktop and 320px research/product/catalog layouts, human filter (2 papers), search (tendon: 1), empty/reset (0 then 8), same-page review anchors, mobile menu and cart. Simplified cross-page research navigation to the hub after the streaming dev route failed fragment scrolling. No horizontal overflow on tested 320px routes.
- Final npm run lint and npm run build passed (16 static routes). Export audit confirmed both review sections, supplied photo, source link, and Utah banner on all eight product pages. Not deployed; owner visual acceptance pending at http://localhost:3015/science.
- Real customer-review submission/publication requires a connected review service. Existing product/FAQ commercial and scientific claims outside the replaced sections still require validation before launch. All observed friction logged; existing dirty work preserved.

## 2026-09-21 - Catalog hierarchy and repetition correction

- Responded to owner rejection of repeated vial tiles and faint product links: replaced shared homepage/catalog cards with bold cream-white compound names, prominent quantity badges, clear prices and View compound links on dark neutral surfaces. Catalog has one shared photographic intro; individual product pages retain their full vial image.
- Strengthened header navigation and text links. Cards adapt from four columns to two, then one for small screens. Desktop catalog/home and 320px catalog inspected; no horizontal overflow, search returns the matching compound. Lint and production build passed with all 16 static routes.
- Owner visual acceptance pending at http://localhost:3015/products. Existing work preserved; no deployment. Friction logged.

## 2026-09-21 - Lumira batch evidence banners

- Added large high-contrast purity banners above the hero on all eight product pages, with actual measured sample percentages, named third-party labs, report dates, batch registry links, and direct COA PDFs. Owner authorized temporary Lumira selections; all are clearly labeled example reports with inventory matching pending.
- Read all eight selected reports. Explicitly display BPC-157/TB-500 dosage mismatches and retatrutide lot spelling discrepancy; Epitalon uses the lower of two vial results. Replaced the generic product purity badge with an example-report anchor.
- Lint and production build passed (16 static routes). Export audit confirmed the banner, pending label, PDF and batch links on all eight products. Desktop Pinealon and 320px Epitalon visually checked; long purity figure and links fit without horizontal overflow.
- Existing work preserved; not deployed. Owner visual review and actual inventory batch confirmation remain pending. Source data is centralized in src/lib/batches.ts.

## 2026-09-21 - Collection photo framing iteration

- Replaced the oversized landscape crop with a narrow portrait panel, showing the supplied vial cap, label, and base together. Mobile contains the full reference photo; heading and bold compound cards retain visual priority.
- Desktop and 320px mobile visually checked, with no horizontal overflow. Lint and production build passed (16 static routes). Owner visual acceptance pending at http://localhost:3015/products; not deployed.

## 2026-10-03 - Faster research preview and expanded study lists

- Pulled master with --ff-only; already up to date. Added 18 primary papers verified through PubMed metadata/abstracts and selected full texts, bringing the curated library to 26 across eight compound pages. Lists have newest-first paper navigation, findings, limitations, and source links; index and product links show actual counts. Human observations and related thymosin beta4 evidence remain explicitly labeled.
- Added npm run preview for the loopback-only built export on port 3016, avoiding first-route development compilation. Kept the credential-free checkout demo on port 3015 and its development-only guard intact.
- Full lint and production build passed. Export audit verified all 26 paper records across eight pages; preview-server test checked HTML/RSC/assets, HEAD, 404, malformed paths, traversal rejection, and method restrictions. Local HTML fetches took 3–78 ms (server response measurements, not full browser paint). Desktop Chrome verified search, human evidence filtering, compound navigation, and rendering without observed console errors. Mobile visual review remains pending.
- Built UX preview running at http://127.0.0.1:3016/science. Further curation is possible; this is not comprehensive coverage. No deployment, push, or live payment configuration.


## 2026-10-04 - Research library expanded to 106 papers

- Pulled master with --ff-only; already up to date. Added 80 primary papers (10 per compound), verified against PubMed metadata and abstracts, bringing the library to 106: 14 each for BPC-157 and retatrutide, 13 each for TB-500, MT-2, MOTS-c, Pinealon, Epitalon, and GHK-Cu. Included negative findings and adverse-event reports alongside positive results; summaries preserve model and study limitations.
- Replaced long duplicated jump lists and full notes with compact newest-first native disclosures. All findings, limitations, and source links are statically rendered, so opening a study needs no fetch. Distinct labels identify observational reports, case reports, trial analyses, laboratory studies, and related full-length thymosin beta4 evidence. Paper counts can include analyses of the same trial.
- Validation: lint, production build (26 routes), all 106 exported citations/notes/source links and eight library/product/return paths, static preview server tests, and diff whitespace checks passed. Desktop Chrome verified compound navigation and immediate disclosure expansion/collapse by mouse and keyboard; 320px and 390px notes and 320px library showed no horizontal overflow.
- Local built preview: http://127.0.0.1:3016/science. Coverage remains curated rather than comprehensive. No deployment, push, or payment configuration.


## 2026-10-04 - More papers and topic-led study cards

- Pulled master with --ff-only; already up to date. Added 18 verified PubMed primary papers: six BPC-157 and two each for retatrutide, TB-500-related thymosin beta4, MT-2, MOTS-c, Epitalon, and GHK-Cu. Total 124: BPC-157 20, retatrutide 16, Pinealon 13, and 15 each for the other compounds. Included case reports and laboratory research with explicit model and evidence labels.
- Replaced narrow bibliography rows with wider topic-led cards, two columns on desktop and one on mobile. Opening a card shows full-width findings and limitations with original sources immediately, using static native disclosures. Library eyebrows use a stable Selected research label.
- Validation: lint, production build (26 routes), exported research audit (124 citations across eight pages), preview server test, and diff whitespace check passed. Chrome verified mouse opening, Enter collapse, full-width notes, and 390px/320px mobile layouts without horizontal overflow. Desktop proof saved to ignored data/research-cards-desktop.png.
- Built review preview remains http://127.0.0.1:3016/science/bpc-157. No push or deployment. Concurrent homepage/header edits preserved and excluded from this package.

## 2026-10-04 - Clean product-photo homepage

- Replaced the rejected chrome-molecule sunset artwork with the existing owner-supplied branded vial, shown at its full portrait ratio. Added a live HTML tagline and collection CTA on ivory; restored the shared wordmark/navigation and one readable delivery banner across desktop and mobile. Owner selected clean product photography.
- Validation: full lint, production build (26 routes), and scoped diff whitespace check passed. Chromium verified 1440px, 390px and 320px layouts, image loading, no horizontal overflow or page errors, collection navigation, mobile research navigation, and cart open/Escape close. Screenshots are in ignored `.next/home-hero-{1440,390,320}.png`.
- Built homepage preview: http://127.0.0.1:3016/. Owner aesthetic review pending; no push or deployment. Concurrent research work preserved and excluded from this package.

## 2026-10-04 - Clearer study summaries and expanded reading notes

- Made the main finding visible on every one of the 124 study cards and moved publication titles into a dedicated source section. Expanded cards explain the evidence type, study model, and limitations while preserving native keyboard-accessible disclosures and the ivory design.
- Added primary-source-verified study setup, measurements, and results context for 16 papers, two per compound, in `src/lib/research-reading.ts`. Checked PubMed abstracts and the Pinealon PMC source; explained selected scientific terms and preserved the distinction between human observations, animal/cell experiments, trial analyses, and related thymosin beta4 evidence. No dosing guidance or new papers.
- Validation: lint, production build (26 static routes), export audit of all 124 citations and 16 expanded notes, and scoped diff whitespace check passed. Chromium checked visible findings, search/navigation, full-width desktop notes, Enter/Space controls, source links, and all eight study pages at 390px/320px with no horizontal overflow or page errors. Desktop and mobile screenshots are in ignored `data/research-reading-*.png`.
- Local review: http://127.0.0.1:3016/science. No push or deployment. Concurrent homepage/carousel changes preserved and excluded from this package.

## 2026-10-04 - Main homepage peptide carousel

- Replaced the single portrait hero with an eight-compound carousel in the main homepage image position, following the owner's Aurum reference composition. A large active product photo is flanked by smaller neighbors; names, catalog quantities/categories/prices, and product links update together. Kept ivory/charcoal styling, navigation, delivery banner, illustrative-photo labeling, and research-only copy. Removed the lower repeated peptide section at the owner's request.
- Added looping arrows, named slide selectors, keyboard arrows/Home/End, mouse drag and touch swipe. Hidden slides are excluded from assistive technology, manual changes announce the active compound, and reduced-motion preferences disable transitions. Server-rendered product content keeps catalog notes out of the carousel client module.
- Validation: lint and production build passed (26 static routes). Chromium checked all eight slides and matching links, wrapping, selectors, keyboard navigation, and drag at 1440px, 1024px, 760px, 600px, 390px, and 320px, with no page errors or horizontal overflow. Touch swipe, reduced motion, and product navigation passed. Screenshots and the verification script are in ignored `data/home-hero-carousel-*` and `data/check-home-hero-carousel.mjs`.
- Local homepage preview: http://127.0.0.1:3016/. Owner aesthetic review pending; no push or deployment. Concurrent research changes were committed separately and preserved.

## 2026-10-04 - Complete PubMed search collections and detailed explanations

- Expanded the library to every result in the eight documented PubMed compound/name/alias searches through October 4, 2026: 2,606 compound/publication matches and 2,575 unique PMIDs. Added separate indexed-publication and explained-study views, search, publication/year filters, sorting, and pagination that reaches every record. Search scope, dates, original sources, and correction/retraction notices remain visible; records include reviews and notices, and counts do not represent independent trials. Online-first papers can carry a later journal issue year.
- Added source-backed study setup, measurements, and results context for the remaining 108 selected papers, bringing detailed explanations to all 124 selected records. Independent source review verified the notes and catalog against primary abstracts and metadata; resolved mixed letter/case-report classifications and clarified the BPC-157 vascular finding. Added a reproducible full-search refresh script; raw abstracts stay in ignored local data rather than the published site.
- Validation: lint, production build (26 routes), export audit of all 2,606 matches and 124 explanations, and browser checks passed. Chromium verified search/query forwarding, filters, sorting, last-page records for all eight compounds, warnings, explanation links/deep links, Enter/Space disclosures, full-width desktop notes, and 390px/320px layouts without overflow or page errors. Screenshots and browser verification are in ignored `data/research-catalog-*` and `data/check-research-catalog.mjs`.
- Built preview: http://127.0.0.1:3016/science. No push or deployment. Concurrent product/vial changes preserved and excluded from this package.

## 2026-10-04 - Imported customer reviews

- Added all 259 owner-supplied reviews unchanged: BPC-157 68, retatrutide 71, TB-500 58, and MOTS-c 62. Product sections show average ratings, rating filters, six reviews per page, author/location, and the supplied unverified status. The other four products retain their empty state. Original dates stay in the import but are omitted from public data and display until the owner supplies corrections.
- Validation: full lint, production build (26 static routes), and Chromium checks passed. Every review matched its source record and product; all pagination, rating filters, keyboard controls, and 1440px/768px/390px/320px layouts passed without overflow or page errors. Evidence is in ignored `data/customer-reviews-checks.json` and `data/customer-reviews-*.png`.
- Local preview: http://127.0.0.1:3016/products/bpc-157#customer-reviews. No push or deployment. Existing collection-image worklog changes preserved and excluded from this package.

## 2026-10-04 - Compound relevance screening

- Replaced automatic publication of every PubMed match with a shared conservative relevance gate: compound-focused titles plus explicit source-reviewed exceptions. Removed broad unregulated-peptide/compounding commentary, incidental mentions, unrelated peptide sequences, free-GHK-only papers, and non-biomedical applications. Retained direct safety cases, negative findings, preparation analyses, focused reviews, and indexing notices under the same criteria as benefit findings.
- The selected snapshot contains 1,448 entries (1,444 unique PMIDs) from 2,606 raw matches, including 113 source-reviewed inclusions. All 124 detailed explanations remain. Every paper shows Why included; pages disclose selection scope, raw counts, original search dates, and broader PubMed links. Relevance selection is not study-quality assessment or exhaustive coverage. Cached refreshes preserve the source-check date, and online refreshes re-fetch notices and fail on incomplete searches.
- Independent relevance/source review corrected preparation/model wording, restored six genuine original research letters, and excluded an unrelated GHK-Cu chemical-sensing application. Metadata-only records retain restrained design descriptions and missing-abstract disclosures. Review finished with no remaining actionable findings.
- Validation: 10 screening regressions, full lint, production build (26 static routes), and export audit passed. Chromium verified excluded-source search, inclusion reasons, real safety/negative records, filters, sorting, every compound's final page, explanation deep links and keyboard controls, and 320px/390px layouts without overflow or page errors. Desktop/mobile and expanded-note screenshots visually checked; evidence is in ignored data/research-catalog-* and data/check-research-catalog.mjs.
- Local preview: http://127.0.0.1:3016/science. No push or deployment. Concurrent Coming soon collection package remains separately committed.

## 2026-10-04 - Individual study readers

- Added static reading pages for all 1,448 relevance-selected compound/publication entries. Every title and Read summary link opens a finding-first reader: all 124 curated papers retain detailed findings, methods, measurements, results context, and limitations; other papers show a labeled short source quotation or an honest missing/review-required abstract state. Full-source links, inclusion reasons, and correction/retraction notices remain visible.
- Added reproducible 25-word excerpt selection with source fingerprints, explicit conclusion-only labeling, shortened-sentence disclosure, and source-checked exceptions for malformed/generic endings and withdrawal status. Full abstracts stay in ignored local data. Readers cannot bypass the relevance gate. URL browse state preserves search, type, year, sort, page, view, and expanded PMID/PMCID note through reader links, return links, and browser Back.
- Independent review found and resolved bibliographic boilerplate excerpts, lost browse state, and a PMCID return anchor. Validation: 10 excerpt regressions, full lint, production build (1,474 static routes), and export audit of all 1,448 readers/124 explanations/1,404 unique short excerpts passed; excerpts exactly match cached abstracts and source fingerprints. Chromium passed six browser check groups, including keyboard navigation, source anchors, detailed/missing/retracted/safety readers, wrong-collection 404, preserved filters/pagination and PMID/PMCID disclosures, and all eight compounds at 320px/390px without overflow or page errors. Desktop/mobile screenshots visually checked. Browser evidence is in ignored `data/check-study-readers.mjs`, `data/study-reader-checks.json`, and `data/study-reader-*.png`; the existing library browser regression also passed.
- Local preview: http://127.0.0.1:3016/science. No push or deployment. Concurrent bag, size-option, and entry-confirmation packages were preserved in their separate commits.

## 2026-10-04 - Owner-selected stock sizes

- Limited BPC-157 to 10 mg, retatrutide to 30 mg, TB-500 to 10 mg, and MOTS-c to 20 mg; their other 19 sizes now show Sold out. Collection, carousel, and selectors default to the available sizes. Sold-out choices remain inspectable with quantity prices hidden and purchase disabled. Browser cart, saved-cart restoration, demo, and authoritative HTTP checkout reject sold-out sizes without substituting a different size; existing order snapshots remain unchanged.
- Stock is independent of pricing. The four selected sizes remain Pricing pending under the prior owner instruction to supply new-size prices later. Asked whether existing product prices and bulk tiers should transfer; answer is pending. The other four compounds retain their original priced/orderable sizes.
- Validation: lint, seven checkout regressions, production build (1,474 static routes), and 13 browser check groups passed. Browser checks covered all 31 options/19 sold-out sizes, original bulk tiers, keyboard selection, cart/checkout totals, saved-line removal, collection/home defaults, and 1440px/768px/390px/320px layouts without overflow or page errors. Desktop collection and 320px selector screenshots visually checked. Existing static-preview segment-prefetch 404s were recorded separately. Evidence is in ignored `data/product-stock-checks.json`, `data/check-product-stock.mjs`, `data/stock-*.log`, and `data/stock-*.png`.
- Local preview: http://127.0.0.1:3016/products. Owner authorized committing and pushing all completed site changes to GitHub; production deployment was not separately verified.

## 2026-10-04 - Homepage photo links and hover highlight

- Linked every visible homepage carousel photo to its matching peptide product page. Added subtle brightening, a pointer cursor, clearer neighboring-photo hover feedback, and keyboard focus on the active image. Ordinary clicks/taps navigate; horizontal drags/swipes retain carousel navigation and suppress accidental link activation.
- Validation: full lint and production build (1,474 static routes) passed. Twenty Chromium check groups covered all eight product links, all four neighboring photos, hover, keyboard navigation, mouse drags, native mobile taps/swipes, reduced motion, and 1440px/768px/390px/320px layouts without overflow or page errors. Desktop hover and 320px screenshots visually checked. Evidence is in ignored `data/home-image-links-*` and `data/check-home-image-links.mjs`; mobile gestures use realistic pacing to avoid synthetic-input click suppression.
- Local preview: http://127.0.0.1:3016/. Committed locally; no push or deployment for this package.

## 2026-10-04 - Current sizes only for the test run

- Simplified the eight current peptides to one carried size each and removed extra size choices and sold-out lists from the collection and purchase pages. BPC-157 10 mg, retatrutide 30 mg, TB-500 10 mg, and MOTS-c 20 mg remain Pricing pending; MT-2 10 mg, Pinealon 10 mg, Epitalon 10 mg, and GHK-Cu 50 mg retain their original prices and bulk tiers. The 20 Coming soon compound previews remain. All 23 hidden sizes are unavailable to cart restoration and authoritative checkout; their reference definitions remain for future stock updates.
- Validation: lint, seven checkout regressions, and production build (1,474 static routes) passed. Thirteen Chromium check groups covered all eight single-size selectors, pricing controls, keyboard selection, cart/checkout totals, removal of stale hidden/pending lines, collection/home agreement, preserved photo links, and 1440px/768px/390px/320px layouts without overflow or page errors. Desktop collection and 320px purchase screenshots visually checked. Existing static-preview segment-prefetch 404s were recorded separately. Evidence is in ignored `data/check-test-run-sizes.mjs`, `data/test-run-sizes-checks.json`, and `data/test-run-sizes-*.log`/`*.png`.
- Local preview: http://127.0.0.1:3016/products. Committed locally; no push or deployment for this package.

## 2026-10-04 - Limited sold-out size alternatives

- Added one or two visible Sold out sizes for all eight current compounds, totaling 13 alternatives alongside the eight current sizes. Cards list the alternatives; product selectors allow inspection with quantity prices hidden and ordering disabled. MT-2 gains an unavailable 5 mg display option; other hidden supplier references remain unavailable. Current stock selections, approved prices, and bulk tiers are preserved; the four owner-selected sizes still await pricing approval.
- Validation: full lint, seven checkout regressions, production build (1,474 static routes), and 13 Chromium check groups passed. Checked all 21 public sizes/13 sold-out choices, current defaults, original bulk tiers, keyboard selection, $68.97 MT-2 cart/checkout total, removal of all 28 unavailable or unpriced saved lines, and 1440px/768px/390px/320px layouts without overflow or page errors. Desktop collection and 320px sold-out selector screenshots visually checked. Existing static-preview segment-prefetch 404s were recorded separately. Evidence is in ignored `data/check-limited-sizes.mjs`, `data/limited-sizes-checks.json`, and `data/limited-sizes-*.log`/`*.png`.
- Local preview: http://127.0.0.1:3016/products. GitHub push remains owner-authorized; production deployment is not separately verified. Concurrent customer-review and homepage work is preserved.

## 2026-10-04 - Responsive homepage research feature

- Rebuilt the rejected Resources section with live HTML typography, supporting copy, a clear ivory research button, and a readable research-only notice in normal document flow. Preserved the existing dark texture as a cropped decorative layer; its baked-in text is excluded. Retained the site's sans-serif/serif styling and research-library destination.
- Validation: full lint, production build (1,474 static routes), and eight Chromium check groups passed. Checked seven widths from 320px to 2048px, text/action spacing, image loading and crop, readable notice and touch target, keyboard focus and research navigation, with no horizontal overflow or page errors. Desktop, wide desktop, and 320px screenshots visually inspected. Evidence is in ignored `data/check-research-feature.mjs`, `data/research-feature-checks.json`, and `data/research-feature-*.png`/`*.log`.
- Local preview: http://127.0.0.1:3016/#research-heading. Committed locally; no push or deployment for this package. Concurrent catalog and customer-review work preserved.

## 2026-10-11 - Latest homepage changes merged

- Merged origin/master through 054cd56, bringing in the desktop/mobile salt-flat hero, five-vial carousel layout, and arrow updates. Resolved homepage and worklog conflicts while preserving the two local commits for GLP-3 naming and the responsive research feature; retained both branches' worklog entries.
- Validation: lint, production build, diff whitespace checks, and Chromium checks at 1440px, 390px, and 320px passed. Verified all eight product routes, GLP-3 links and vial asset, carousel selection/arrows/neighbor clicks, the research link, and no horizontal overflow or page errors. Desktop/mobile screenshots visually inspected; evidence is in ignored data/pull-latest-* and data/check-pull-latest.mjs.
- Built preview: http://127.0.0.1:3016/. Merged locally; no push or deployment.

## 2026-10-11 - Springier homepage carousel iteration

- Added Motion springs, direct finger/mouse tracking, flick settling, and immediate retargeting for rapid arrow and selector input. Preserved product links, keyboard navigation, native vertical scrolling, and reduced-motion behavior; corrected touch capture transfer so swipes continue tracking. Added 44px mobile arrow targets and fitted the desktop carousel and selectors into the hero viewport, including shorter screens.
- Recorded the owner's permission to add component libraries and that carousel UX remains unapproved. Motion is included for this iteration; technical validation does not constitute owner acceptance.
- Validation: full lint, production build (1,474 static routes), diff whitespace checks, and 11 Chromium check groups passed. Verified spring response/overshoot, rapid input, drag/cancellation, native touch and scrolling, keyboard/product links, reduced motion, and seven layouts from 320px to 1920px without horizontal overflow or page errors. All seven layout screenshots visually inspected. Evidence is in ignored `data/check-spring-carousel.mjs`, `data/spring-carousel-checks.json`, and `data/spring-carousel-*.png`/`*.log`.
- Local review: http://127.0.0.1:3016/. Committed locally; owner carousel UX review remains pending. No push or deployment.

## 2026-10-11 - Aurum catalog, prices, and certificate links

- Imported all 26 Aurum listings and 38 source-size prices from the live catalog selector, checked October 11. Activated all 20 former previews, removed sold-out/pending states for source products, and preserved Pinealon/Epitalon stock and prices. Added original labeled vial illustrations for new products and kept the original eight homepage features. Cart and authoritative checkout share explicit USD prices without invented bulk discounts; legacy size identities and immutable orders remain intact.
- Linked 25 current Aurum certificate PDFs with publisher attribution and tested-sample size labels; all returned HTTP 200 with valid PDF signatures. Six products explicitly show that no current certificate is published. Archived reports are excluded, and reference reports do not imply local inventory verification. Updated source, ordering, collection, and project documentation.
- Validation: eight checkout/catalog regressions, app/server lint (`npx eslint src server`), production build (1,494 static routes), static-preview regression, and diff whitespace checks passed. Full lint also scans ignored research/source exports and audit scripts and reports errors there; details are in ignored `data/aurum/lint.log`. Browser verified catalog prices/availability, BPC-157 30 mg × 3 at $419.97, Tesamorelin 20 mg at $166.66, certificate URLs, missing-report state, and 320px water units/illustration/layout without overflow or console errors. Evidence is in ignored `data/aurum/`.
- Local review: http://127.0.0.1:3016/products. Committed locally; no push or deployment. Concurrent responsive design changes are preserved and excluded from this catalog package.

## 2026-10-11 - Complete storefront responsive sweep

- Coordinated three workers across products/catalog, research, and shared shell/checkout; integrated homepage, carousel, footer, FAQ, and dense browser checks. Fixed narrow headings, price tiers, wrapping, mobile controls, validation focus, and short-screen menu/cart/hero scrolling while preserving the site's visual system and catalog changes.
- Checked all 1,491 public exported pages from top to footer across phone, tablet, desktop, ultrawide, and short landscape matrices. Product verification covers 377 full-page checks, 7,084 fluid layouts, 12,000 dense quantity layouts, all 43 sizes, and every published review. Research verification covers 18,108 full-page checks and every reader's content. Integration adds 19,503 layout measurements; final audits found no layout failures. Exact coverage, interactions, manual visual review, and browser limits are recorded in `docs/RESPONSIVE_QA.md`.
- Validation: final production build, source lint excluding ignored `data/`, eight tests, and diff whitespace checks passed. Default lint's unrelated ignored-data failures and static-preview prefetch/cancellation behavior are documented in the QA record; settled WebKit follow-up passed without runtime errors or failed requests.
- Local review: http://127.0.0.1:3016/. Committed locally; no push or deployment. Owner carousel UX review remains pending.

## 2026-10-11 - Remember entry agreement across visits

- Replaced session-only entry acceptance with versioned local storage, migrated existing session confirmations, and synchronized acceptance across open tabs. Retained session/memory fallbacks and the required first-visit checkboxes.
- Validation: component lint, production build (1,494 static routes), and browser checks passed for checkbox requirements, cross-tab dismissal, reload persistence, and a new direct-product visit after closing both test tabs. Return-visit proof is in ignored `data/entry-persistence/return-visit.jpg`.
- Local built preview updated; committed locally with no push or deployment. Concurrent carousel work is preserved.

## 2026-10-11 - Carousel release snap-back correction

- Kept the nearest image once a drag crosses its midpoint, so a reversed final pointer sample cannot send it back and a fast release cannot skip an extra image. Short flicks still advance. Limited initial spring speed to point toward the destination and taper near its center, retaining the existing spring and direct dragging.
- Validation: five release/spring regression tests, source and test lint, production build (1,494 static routes), and diff whitespace checks passed. Browser checks passed for 20 repeated drags at desktop, 390px, and 320px widths, both directions and the loop boundary, five rapid arrow presses, and keyboard reversal; no console errors. Default lint still reports unrelated errors in ignored research exports and audit scripts. Logs are in ignored `data/carousel-catch-*.log`.
- Local built preview updated; committed locally with no push or deployment. Owner carousel UX review remains pending.

## 2026-10-11 - Optional analytics and conversion metrics

- Implemented every event type in `.codex-tracking-prompt.md`: App Router pageviews, queued entry-gate events, product views, carousel settles/opens, cart changes/opens, checkout submission/errors/results, debounced research filters/search, paper readers, certificate PDFs, and PubMed links. All client vendor calls go through `src/lib/analytics.ts`. PostHog loads only after saved/current entry acceptance, remains disabled by default, respects DNT, disables autocapture/recording/profile enrichment, and sends only allowlisted catalog/count/enum properties with sanitized paths and site-version/viewport super properties.
- Added optional anonymous checkout metadata and linked verified Stripe-webhook/admin-Venmo `order_completed` capture through plain HTTP fetch. The order is committed first; analytics failures never fail it. SQLite delivery claims, stable UUIDs, acknowledged-send records, bounded timeouts, and `npm run orders -- retry-analytics` provide durable deduplication and outage recovery. Analytics metadata is excluded from checkout retry fingerprints; pricing, review/payment guards, and static-export settings are preserved.
- Added env examples and `docs/ANALYTICS.md` with activation, event dictionary, privacy limits, recovery, and the recommended dashboard. Owner project keys and a privacy-policy disclosure remain pending. All requested event types are wired. Visitors who do not accept or use DNT send nothing; paid orders without anonymous metadata are also omitted, so analytics revenue represents tracked purchasers. No live PostHog project/dashboard verification was possible without owner keys.
- Validation: `npm test` passed all 17 checkout/client/server tests; `npx eslint src server`, `git diff --check`, and `npm run build` passed. Build generated 1,494 entries and `out/` contains 1,492 HTML files, including homepage, product, checkout/result, and paper-reader routes. `npm run lint` still fails on existing ignored `data/` source exports/audit scripts (107 errors, 2,126 warnings); its log is `data/analytics/lint.log`. Chromium exercised entry acceptance, product/cart, checkout/result, library searches/filters, and a paper reader on the static export with analytics disabled: zero PostHog requests before/after acceptance, no anonymous analytics ID, and no runtime errors. Evidence: `data/analytics/disabled-network.json`; harness: `data/analytics-browser-check.mjs` (both ignored).
- Changed-file inventory (29 source/config/documentation files):
  - Client wrapper/contracts: `src/lib/analytics.ts`, `src/lib/cart-context.tsx`, `src/lib/checkout-client.ts`, `src/lib/checkout-contract.ts`.
  - Shared components: `src/components/analytics-navigation.tsx`, `src/components/site-entry-gate.tsx`, `src/components/product-carousel.tsx`, `src/components/cart-drawer.tsx`.
  - Pages: `src/app/layout.tsx`, `src/app/products/[slug]/add-to-cart.tsx`, `src/app/checkout/checkout-form.tsx`, `src/app/checkout/result/order-status.tsx`, `src/app/science/research-browser.tsx`, `src/app/science/research-library.tsx`.
  - Server and tests: `server/analytics.ts`, `server/api.ts`, `server/admin.ts`, `server/config.ts`, `server/store.ts`, `server/analytics.test.ts`, `server/client-analytics.test.ts`.
  - Configuration/dependencies: `.env.local.example`, `.env.checkout.example`, `package.json`, `package-lock.json`.
  - Documentation: `docs/ANALYTICS.md`, `docs/PROJECT_CONTEXT.md`, `docs/NEXT_STEPS.md`, `docs/WORKLOG.md`.
- No push, deployment, or external tracking activation. The user-supplied tracking prompt and its log files are preserved.

## 2026-10-12 - Company repository homebase

- Prepared the complete site and existing Git history for `SaltNPepLabs/SaltNPepWebsite` on `main`, including the completed local analytics work above. Set the company repository as `origin`, the default push destination, and the GitHub CLI default; retained the previous personal repository as `legacy`. Kept `C:\Users\kalec\peptide-store` as the local workspace.
- Documented the company repository, fresh-clone setup, and hosting follow-up in README and project memory. Ignored local tracking-task prompts/logs; environment secrets, databases, research caches, dependencies, and generated exports remain local.
- Validation: all 17 tests, application/server ESLint, and the production static export passed. Gitleaks found no secrets in all 61 existing commits. Full-project lint still reports 107 errors and 2,126 warnings in ignored audit/source data; every error is confined to `data/`. Evidence is in ignored `data/homebase-migration/`. Hosting reconnection remains pending.

## 2026-10-12: Local GitHub sync and Codex preview

- At the owner's request, fast-forwarded local master from 054cd56 to 93e448d, incorporating eight GitHub commits without deploying the live site.
- Verified SHA-256 checksums for all 48 untracked local images before and after the pull; every image is unchanged.
- Installed the incoming motion dependency and restarted the webpack development preview at http://127.0.0.1:3000. Confirmed the homepage loads its entry form in the Codex browser.

## 2026-10-12: Connect this Mac workspace to company GitHub

- Set origin to SaltNPepLabs/SaltNPepWebsite, renamed the local branch to main, and configured origin/main tracking and origin as the default push remote. Retained kaleckh/ranch-peptides as legacy.
- Fast-forwarded to the company analytics/migration commit; preserved the existing local worklog and all 48 untracked images.
- Squarespace website DNS records were updated to Vercel recommendations; Vercel confirmed valid configuration for the apex and www domains. The existing Vercel project Git connection remains pending.

## 2026-10-12: Company GitHub connected and deployed to Vercel

- With owner approval, replaced the personal Vercel account's Sparkison23 GitHub login connection with SaltNPepLabs; Google sign-in remains available. Sparkison23 was already a company repository collaborator; no new invitation was needed.
- Connected existing Vercel project ranch-peptides (salt-1dfa) to SaltNPepLabs/SaltNPepWebsite with main as the production branch.
- Deployed Git commit f8e0423078a5dad77a02ae364a3effe0e4e3d823 directly from GitHub. Deployment dpl_BuJ2YcxMCXd8FcPM6siT4zxKtJfN reached Ready.
- Verified apex and www domains remain verified on the existing project. Live www.saltnpeplabs.com/products now contains GLP-3 and no Pricing pending text. No local image uploads or code edits were part of this deployment.


## 2026-10-20: Local research-only copy cleanup (not published)

Owner authorized audit items 1–5, 9, 10, 12, 14, and 17. Explicitly deferred 6, 7, 8, 11, 13, 15, and 16. The sole certificate exception is routing BPC-157, GLP-3, TB-500, and MOTS-c to the existing Lumira/Peptaura reports instead of Aurum. The owner states supplier COAs cover sold inventory; broad certificate wording, quality claims, and the recorded GLP-3 lot discrepancy remain deferred. Do not push or deploy without explicit approval.

Customer testimonials and ratings are removed from the application; the 200-record source is preserved unchanged in docs/archive/customer-reviews-data.json. Original eight products now use neutral identity/form descriptions, no outcome lists, promotional mechanism descriptions, or unused safety/steroid claims. FAQ steroid/legality assurances and product benefit summaries are removed. Research-library content, scientific-review panels, and GLP-3 publication naming remain unchanged.

TB-500's unsupported full-length equivalence and associated formula/mass/CAS fields are withheld pending an inventory-specific identity specification. KLOW/Wolverine composition still requires owner confirmation; Aurum's current KLOW page contradicts itself (opening lists GHK-Cu/KPV/TB-500/BPC-157, other sections list larazotide/orexin-A). Do not guess a formula.

Purchase-adjacent notices, cart/footer/home and entry gate now explicitly prohibit personal use or administration to humans/animals. Entry acceptance key is v2 so the revised statement is reconfirmed once. Checkout verification logic is unchanged. Fixed-size photographs are replaced in the UI with the existing size-neutral CSS vial illustration; original artwork remains preserved. No pricing, size availability, payment behavior, storage/reconstitution, quality, shipping or policy changes were authorized.

Validation: npm run lint and production build passed (1,494 routes); all 17 existing checkout/analytics tests passed. Export audit checked all 28 product pages for removed reviews/claims and prominent restrictions, all four Peptaura PDF links, retained GHK-Cu Aurum source, unchanged deferred fields and byte-identical review archive. Existing research audit passed for 124 explained studies and 1,448 publication reading pages.

Retired 16 fixed-size product photographs from public assets to docs/archive/vial-images (preserved, not destroyed). Static product-layout fixture visually checked; revised real entry gate verified with both boxes unchecked.

## 2026-10-20: Restore original vial imagery

Owner explicitly requires keeping every original peptide photograph, including isolated homepage/collection vials and product photos on rocks. Restored all 16 original files to public/images and restored the original ProductVial component and styles byte-for-byte. Restored original illustrative-photo captions. This supersedes the earlier size-neutral illustration change; do not replace or edit vial artwork without a new explicit request. Approved text, testimonial removal, research notices, and four Lumira/Peptaura COA overrides remain unchanged. Local only; no push or deployment.

## 2026-10-20 — Match vial images to selected amounts (local only)

Preserved original source photography and rock compositions; added 11 quantity-corrected PNGs using built-in imagegen edit mode. Corrected BPC-157 and Pinealon default photos and supplied alternate-size photos for BPC-157, GLP-3, TB-500, MOTS-c, Pinealon, Epitalon, and GHK-Cu. Shared product selection now updates the photo with the purchasing size; existing CSS illustrations display that same amount. Homepage/cards use the catalog default. Prices, inventory, cart and checkout data remain unchanged. Prompt manifest: VIAL_IMAGE_EDITS.json.

Validation: all 43 catalog sizes checked for photographic coverage where applicable; corrected assets visually inspected; GLP-3 10/30 mg selection verified in browser; lint, production export and all 17 tests passed. Subsequent browser navigation encountered the entry gate, which was not accepted on the user’s behalf. Nothing committed, pushed or deployed.

## 2026-10-20: Complete matching catalog artwork (local only)

Owner requested matching isolated vials and unique rock settings for all 20 additions. Added 47 imagegen PNGs in public/images/catalog: 20 transparent default-size vials, 20 distinct default-size rock scenes, and seven alternate-size rock images. All labels use catalog names/amounts, including water in mL. Product-image mapping now covers all 28 collection defaults and all 43 detail-page sizes. Original eight product artworks and previous size corrections are preserved. No pricing, stock, copy, checkout, Git publication or deployment changes. Full prompts and asset paths: CATALOG_IMAGE_PROMPTS.json.

Validation: visually reviewed all 47 new images; all 20 isolated PNGs have true transparency and framing within 0.48% of the reference canvas. Full 28-product/43-size image coverage verified. Lint and production static export passed. Browser confirmed all 28 collection images, visually checked the new Melanotan I/Selank cards alongside originals, and verified that selecting Tesamorelin 20 mg loads its 20 mg rock photograph. The saved entry acceptance restored normally after initialization; no entry agreement was accepted by the agent. Existing selector implementation is unchanged.

## 2026-10-20: Local research-library audit changes

Applied owner-approved audit: original scientific wording restored, upfront limitations, citation-only records for papers without detailed explanations, direct original-source links, and explicit TB-500 related-literature/inventory identity distinction. Preserved source records, routes, all 124 explanations, notices, and storefront imagery. No commit, push, or deployment. Validation recorded after checks below.

Validation: lint, TypeScript/static build (1,494 routes), and research export audit passed. The audit checks all 1,448 publication records, 124 explanations, unchanged source titles, citation-only records, and limitations within collapsed-card summaries. Local server restarted on port 3015. Browser reached the correct Epitalon citation route; visual review beyond the entry confirmation remains for the owner.

## Local entry preview recovery

The webpack development preview served the entry screen without initializing its controls. Restarting and rebuilding its dev cache did not resolve the browser symptom. Switched port 3015 to the existing verified static export using scripts/preview-static.mjs (imported server with port override). Browser confirmed the saved entry acceptance was honored and the full Epitalon page became accessible. No entry requirements or application code changed. Future edits require rebuilding out/ while using this preview. Development cache preserved at /tmp/peptide-dev-cache-1792536. Nothing published.


## 2026-10-20 — Local service pages and commerce refinements

Added searchable COA library, factual About, email Contact, policy draft, account/reward/delivery entry pages, EN/ES controls for new surfaces/navigation, catalog recommendations and offline support/newsletter integration entry points. Owner confirmed hello@saltnpeplabs.com, Utah County delivery, free shipping outside county, no existing providers, and no quantity discounts. Replaced tier cards with quantity stepper, normalized flat pricing for all variants, and zeroed configured/preview shipping for supported destinations. Delivery countdown engine remains inactive pending cutoff/days; real login/shipment tracking, newsletter, chat and referral operations not implemented/connected. No fake signup, authentication, chat responses, reward credits or shipping guarantee. Original photos preserved. See STOREFRONT_SERVICES.md. Validation: lint passed; all 19 checkout/analytics/delivery/pricing tests passed; static build and browser verification recorded below. Local only.

Verification completed: lint passed, 19 tests passed, build exported 1,501 pages. Browser confirmed COA search narrows BPC to one record, ES switches translated surfaces, quantity increment shows 2 vials/$99.98 at unchanged $49.99 each, and Contact has the exact email. Mobile 390px viewport showed no horizontal document overflow. No account signup, outbound message, payment, Git push or deployment performed.


## Interactive local previews (owner requested)

Unconnected account/tracking, rewards, delivery timer, newsletter and support chat now render interactive demonstration UIs on loopback hosts only. Sample account opens a dashboard with stage selector/profile/rewards; referrals show an explicitly illustrative $20 balance; delivery shows a sample countdown and local/shipping switch; newsletter previews a confirmation; chat renders labeled canned replies. No authentication, messages, subscriptions, credits, clipboard sharing or external service requests occur. Demo state stays in component memory. Local preview navigation exposes each feature. Existing real-service configuration and checkout remain unchanged. EN/ES supported for these previews; existing catalog/research translation remains incomplete.

## October 20: Research publication content retired by owner

Owner explicitly removed the entire research library to avoid literature upkeep. Removed /science and every compound/paper route, product scientific-review panels, homepage research feature, and navigation/About/FAQ links. COAs, product specifications, artwork, and research-use-only notices remain. Retired route/component source is preserved in docs/archive/research-retired-2026-10-20.tar.gz; unreferenced internal research data/scripts remain historical, not published and not maintained. This supersedes all earlier instructions to retain/update the library. No deployment or Git push authorized.

Validation: lint and static build passed (44 generated pages). Scanned all 42 exported HTML files: no /science links or scientific-review panels remain; no science route artifacts remain; COA page retained. Removed stale generated development route types to resolve references to retired pages. Rebuilt local port-3015 static preview; nothing published.


## October 20 — 11 a.m. delivery cutoff and policy preparation
Owner specifies Mountain Time cutoff: before 11 a.m., Utah County delivery next day; at/after 11 a.m., two days later. Free shipping elsewhere; nonlocal dispatch wording ambiguous (same-day before cutoff versus next-day), clarification requested. Weekend/holiday service, refund/cancellation/damage rules, guarantee remedy and legal entity/address also requested and unanswered. Do not activate guarantee or call policies final until resolved. Real timezone-aware countdown replaces the resetting sample timer, shows next cutoff after 11 and handles DST. No booked delivery date is shown while service days remain pending. Policy page expanded with confirmed terms and explicit remaining gaps. Checkout expressly deferred. Owner confirms TB-500 identity, blend compositions and business/product details are accurate; do not repeatedly characterize them as unconfirmed, and do not invent missing specifications. No push/deployment.


### Confirmed follow-up — seven-day schedule and delegated policy choices
Owner confirmed all seven days, holidays may vary, and nonlocal dispatch NEXT DAY before 11 a.m. or TWO DAYS LATER at/after cutoff (not same-day). Carrier transit additional. Owner delegated simple customer-convenient policy choices: free cancellation pre-dispatch; no change-of-mind returns post-dispatch; replacement/refund for confirmed damaged/incorrect/missing items, preferably reported within seven days (not a rights cutoff); seller-paid return if needed for seller error; refunds initiated within five business days. Local missed-date remedy is 10% affected-item refund or full refund for canceled undelivered order. Timing begins once paid/research-approved, date confirmed at acceptance. Incorrect customer address/access excluded; holidays disclosed before ordering. Checkout unchanged/deferred. Tailored policies on /policies; privacy provider/retention particulars and legal business mailing details still needed before actual service launch. Live Mountain Time countdown with 11:00 exact boundary/DST/year rollover tests. No publishing. Supersedes the immediately preceding pending-schedule notes.


Removed the global Local Previews navigation bar at the owner’s request. Preview features remain reachable from normal account/footer links. Local only; no publication.


## Chroma-inspired inner-page refinement
Owner wants clean feel of chromacoatingsutah.com with homepage unchanged. Visually inspected Chroma home/About: restrained typography, generous spacing, rounded cards and muted accents. Applied centered service-page introductions, calmer typography, softer borders/corners, more spacing, refined catalog cards, product controls and COA panels in existing ivory/charcoal palette. No Chroma copy/assets imported. Home page, home CSS and carousel hashes unchanged; global refinements scoped to non-home routes. Images, prices, policy terms and service functionality unchanged. Lint/build passed; desktop Contact and mobile product page visually checked, COA page has no horizontal overflow at 390px. Local only; no commit/push/deploy.


## Luxury revision after owner feedback
Owner found the first clean pass insufficiently luxurious. Inner pages now use charcoal/olive-black surfaces, warm ivory type, restrained brass accents and finer, squarer borders. Contact rebuilt as stone-vial photography beside a service desk with prominent email and simple link rows, plus a serif accent. Existing GHK-Cu photograph reused unchanged; no invented service claims. Global palette explicitly excludes homepage; home source and carousel preserved. Pricing/checkout/policies unchanged. Local only. Lint/build passed and desktop Contact visually verified.


## 2026-10-20 — Collection and homepage footer editorial redesign
- Limited visual changes to collection presentation and homepage-only footer. Existing shared card appearance elsewhere retained via optional collection presentation.
- Collection now uses dark framed vial displays, compact editorial heading, responsive three/two/one-column layout, integrated filters and new alphabetical/price sorting. Product data and image assets unchanged.
- Homepage footer now uses charcoal, prominent wordmark, grouped navigation and integrated newsletter. Local signup remains explicitly a no-data preview; configured external newsletter link and unconfigured coming-soon state preserved. Inner-page footers and homepage hero untouched.
- Verified build and lint, desktop/mobile screenshots, 390px layout without horizontal overflow, search, alphabetical sort and newsletter preview response. Local only; no push or deployment.


## 2026-10-20 — Complete homepage continuation below protected hero
- Inspected hero and Chroma visually; reviewed Aurum homepage content organization. Added seven original sections: featured compounds using existing rock photographs and live catalog values, brand introduction, category discovery, COA documentation, delivery, accessible native FAQ accordions, and final collection CTA. Retained the newly redesigned charcoal homepage footer and framed collection treatment.
- New CSS is module-scoped. Scroll reveals use IntersectionObserver and Web Animations without hiding SSR content, respect reduced motion, and add no dependency.
- Category links now open the corresponding catalog filter through query parameters; existing search, sort and reset controls retained.
- Used established 11 a.m. Mountain Time next-day/two-day fulfillment rules, rather than contradictory same-day/noon wording in the brief. No new purity, sales ranking or certification claims. Newsletter remains an honest local preview; checkout unchanged.
- Verified exact protected hero JSX, CSS, carousel and vial component hashes. Build and lint passed; all 20 storefront tests and 5 carousel tests passed (HTTP tests required local network permission). Browser-checked desktop/tablet and 390px mobile, carousel next actions, FAQ expansion, category filtering, and no horizontal overflow or failed images. All 47 homepage internal links/assets resolved in the static export. No push or deployment.

## 2026-10-20 — Owner-requested homepage simplification
Replaced the long editorial homepage continuation with a compact service strip, four isolated-vial product links and three short why-choose-us points. Removed homepage rock photography, category wall, separate documentation/delivery/FAQ sections and closing slogan. Simplified newsletter/contact copy while preserving honest preview behavior, required notices and footer navigation. Hero and other pages unchanged. No unsupported free-water promotion added. Lint/build passed; desktop and 390px mobile reviewed without overflow. Local only.

## 2026-10-20 — Benefits and newsletter screenshot refinement
Replaced homepage why-choose-us text columns with six concise linked cards, original line icons, charcoal backgrounds and champagne accents. Added a full-width newsletter panel before footer branding/navigation with a clear input and button. Retained local-only signup behavior and disclosures, no competitor discount/purity promises copied. Hero, product imagery and other pages unchanged. Build/lint passed; desktop and 390px mobile checked with no overflow; preview button response verified. Local only.

## 2026-10-20 — Salt-and-pepper brand palette
Owner requested a sitewide salt-and-pepper feel. Neutralized olive, beige and champagne UI colors to salt-white, charcoal and stone gray across homepage sections/footer, collection, service pages, product controls, cart, checkout and shared navigation. Preserved hero/carousel/vial component files and all image assets; no layout, product or fulfillment changes. Build and lint passed; protected file hashes verified and homepage/collection previews reviewed. Local only.

## 2026-10-20 — Homepage bridge simplified
Replaced duplicate shipping/delivery/COA strip with a short “Research peptides. Without the wait.” introduction, qualified local next-day copy, batch-report reference and in-page shop link. Preserved hero and why-choose-us content. Build/lint passed; local layout visually verified. Nothing published.

## 2026-10-20 — Compounds terminology
Changed storefront headings, shopping links, metadata, FAQs, carousel accessibility labels and displayed categories to compounds terminology. Preserved laboratory proper names and source documents. No carousel behavior or image edits. Lint passed. Initial build ran out of disk; removed disposable .next/cache and rebuilt. Local only.

## 2026-10-20 — Reference-led homepage-only refinement
Changed only home-story.module.css and home-footer.module.css: warm ivory product surfaces, serif intro accent, subtle procedural mineral grain, compact dark six-benefit grid with thin dividers, cream newsletter band and compact charcoal footer. Existing copy, original four vial images, prices, links and preview behavior preserved. No hero/header/shared styles/other routes modified. Build/lint passed; desktop and 390px mobile reviewed, no horizontal overflow; newsletter preview response verified. Mobile newsletter order corrected to precede branding. Local only.

## 2026-10-20 — Newsletter-only luxury refinement
Scoped changes to homepage newsletter styles and headline emphasis: warm ambient gradient, existing fine grain, tracked eyebrow and hairline, larger sans/italic-serif heading, thin-border input and compact charcoal button. Preserved exact EN/ES text and signup behavior/disclaimer. No hero, other homepage sections or other routes changed. Lint/build passed; desktop and 390px mobile screenshots checked, no overflow, preview response verified. Local only.

## 2026-10-20 — Compact five-item benefits section
Removed the why-choose-us subtitle and Research use only card per owner. Remaining five items use a single desktop row, balanced tablet layout and compact mobile list. Reduced heading, padding and icon spacing. Other research-use notices retained. Build/lint passed and local layout checked. No deployment.

## 2026-10-20 — Owner-directed hero background replacement
Replaced only desktop/mobile hero background references with optimized WebP adaptations of the supplied salt/pepper image. Iterations returned to recognizable salt crystals and peppercorns rather than fine dust, preserving original fluid waves and floor. Mobile uses a separate portrait composition. Added localized top/bottom background shading for existing white text on the lighter photograph. Vial assets, positions, carousel code and interactions unchanged. Original background files retained. Local build passed; desktop/mobile visually reviewed. No deployment.

## 2026-10-20 — Approved desktop background and matching mobile
Owner selected clipboard-1c9781be desktop image. Installed that exact composition as optimized WebP and generated separate portrait with narrower edge scatter, lower waves, quiet center for all three visible vials. Retained current hero text/layout/carousel. Build passed and 390px phone preview visually checked. Local only.

## 2026-10-20 — Phone header cleanup
Removed header language selector per owner. Mobile delivery strip is a single short line without duplicate research-use line/icon; existing notices remain below hero and footer. Simplified mobile logo/bag/menu sizing, spacing and dropdown contrast, added room above hero headline and stronger text shading on mobile. Desktop composition and carousel mechanics preserved. Build/lint passed; 390px header and menu visually checked. Local only.

## 2026-10-20 — Homepage Shop compounds card refinement
Changed only homepage gallery CSS: warm off-white section, unified stone product cards with thin subtle borders and modest corner radius, aligned name/price/dosage, restrained card hover and reduced-motion support. Four columns desktop and two on phones. Existing whole-card links, product data, vial assets and all other sections/pages remain unchanged. Lint and static build passed; visually checked 1440px desktop and 390px phone and confirmed all four product links. Local preview rebuilt; nothing pushed or deployed.

## 2026-10-20 — Subtle hero environmental integration
Added a restrained warm color treatment and subpixel alpha-following edge reflections to carousel vial images only; original assets, background, layout, typography, depth-of-field calculations and spring/gesture logic unchanged. Added eight tiny noninteractive foreground salt/pepper grains (four on mobile) with slow transform/opacity drift outside the central label corridor; hidden under reduced-motion preferences. No floor shadows, platforms or glow overlays. Lint, build and all five carousel-motion tests pass. Desktop 1440px and mobile 390px visually checked; next-arrow and product-selector responses verified. Local only, no publication.

## 2026-10-20 — Hero reflection masks and two particle depth planes
Replaced the previous whole-vial filter/drop-shadows with warm/cool soft-light reflection overlays masked by the original transparent vial assets. Protected central label band; original images and background unchanged. Added rear and front particle planes, staggered 29–53-second paths, and bounded 3px/7px opposite parallax driven by the existing carousel MotionValue. Smaller particle count on mobile; reduced-motion hides particle layers and disables parallax. No changes to vial positioning, blur, controls, spring/gesture logic, navigation or other sections. Lint, 44-route static build and five motion tests pass; desktop/mobile appearance and arrow/selector responses checked. Local only.

## 2026-10-20 — Reference-guided restrained hero depth
Inspected hero/carousel architecture and confirmed transparent 1254px original vial assets. Refined existing particle planes to irregular polygonal salt/pepper fragments (no round-ball treatment), with 12 rear/8 front elements desktop and 6 rear/4 front mobile, independently staggered slow drift, occasional small soft-focus grains and existing bounded parallax. Rear plane now extends through the space behind the active vial; foreground retains central exclusion. Reflection overlays now protect the label band on both passes. Background files, vial art, layout and carousel blur/spring behavior unchanged. CSS cannot reproduce physical glass refraction from these 2D assets; retained understated masked light matching. Build/lint and five motion tests pass. Desktop and phone screenshots compared with owner references; drag/swipe on both, desktop arrows, and a product-link navigation verified. No publication.

## 2026-10-20 — Hero-only relit image set and opaque side vials
Owner explicitly authorized hero vial artwork relighting after subtle CSS alone proved insufficient, and rejected particles appearing across/through outer vials. Generated eight lighting edits using built-in image_gen, retaining names, amounts, frontal composition and genuine alpha. Saved optimized 1254px WebP assets in public/images/hero-vials; prompts and generated sources in docs/HERO_RELIGHT_ASSETS.json. ProductVial accepts optional heroImage only passed from homepage hero; original shop/detail imagery preserved. Removed faux reflection overlays and the foreground particle plane. Changed visible side-slide opacity from .2/.62 to 1 so background particles do not show through opaque labels/caps; existing scale, placement, blur and spring/gesture logic retained. Background-only sparse particles retained. All eight assets loaded in browser; visible slides confirmed opacity 1. Desktop 1440 and phone 390 screenshots reviewed and drag/swipe confirmed on both. Lint, static build and five motion tests passed. No push/deploy.

## 2026-10-20 — Position-aware material reflection pass
Added hero-only materialShell layers masked with each existing relit alpha asset. Square materialWindow is aligned to object-fit:contain, excludes paper label region (37–88% of source square) and restricts changes to cap/shoulder/base. Reflection uses existing background image, mirrored and softened, plus negative fill and champagne highlight; all strengths/texture position are derived from the same carousel offset MotionValue with bounded values. Corrected initially washed cap appearance by blending the entire masked shell in soft-light against the photograph. No new assets/libraries, no foreground particles, no change to positions, blur, springs, prices or other sections. Reduced-motion pins reflection texture; mobile removes small reflection blur. Confirmed left/center/right values change in DOM, desktop/mobile screenshots and swipe checks pass, desktop arrow navigation works. Lint, build and 5 carousel-motion tests passed. This is 2D material compositing, not a physically simulated 3D glass renderer. Local only.

## 2026-10-20 — Living hero background
Owner requested the airborne grains already baked into the background to float gently in place. Added LivingHeroBackdrop: a small dependency-free WebGL photo-displacement renderer using the unchanged desktop/mobile assets and matching object-fit cover. Smooth spatially varying, low-amplitude drift is masked to outer airborne areas; center/floor/wave boundary excluded, tighter mobile boundary and amplitude. It animates regions of the source photo rather than individually segmented grains. 30fps cap, capped device resolution, intersection/document visibility pause, reduced-motion static fallback and context-loss/static-image fallback. Canvas ignores input and remains beneath shading/vials/UI; original image sources remain as fallback. Build and lint passed; desktop/mobile rendering, active canvas visibility and mobile swipe verified. No publication.

## Independent airborne grains — 2026-10-20
Replaced regional photo-warp animation with clean desktop/mobile scene plates and a transparent photographic grain atlas. Every airborne sprite has an independent phase, horizontal/vertical speed, drift amplitude and gentle rotation. Floor and liquid remain static. Removed the redundant CSS atmospheric layer. Canvas remains behind the solid carousel and ignores pointer events; pauses offscreen/hidden and draws a still scene for reduced motion. Original backgrounds remain load-failure fallbacks. New assets and exact generation prompts: HERO_INDIVIDUAL_GRAINS.json. Desktop arrow and mobile layout inspected; lint, static build and five carousel tests passed. Local only; no deployment.

## 2026-10-20 — Restrained atmospheric cohesion
Inspected the active cleaned hero plates, individual sprite renderer, carousel and lighting layers. Baked grains remaining in the current plate sit on the floor/liquid; original airborne photograph is only a fallback. Kept every image asset unchanged. Reduced airborne sprites from 620/240 to 310/130 desktop/mobile; replaced large independent bobbing with a shared very slow current plus small per-grain variation and depth attenuation. A quarter of grains are nearly still. Added a single transparent canvas with five desktop/three phone tiny near-plane sprites outside label rows, with less than one pixel of carousel-driven parallax. No changes to carousel geometry, navigation, typography, images, or lower sections. Both canvases ignore pointer events, pause offscreen/hidden, and render a static frame under reduced motion. Verified desktop and 390px phone screenshots, desktop arrow, phone swipe, and product-link navigation. Lint, 44-route build and five carousel tests passed. Local only.

## 2026-10-20 — Restore visible weightless drift
Owner found the last motion pass effectively still. Increased each grain's bounded drift to 9–18px horizontal / 7–15px vertical, with independent long periods, gentle rotation and depth factors .45–1.0; removed the near-frozen quarter of grains. Shared flow remains subtle. Near-plane grains retain much smaller 2–2.5px paths to protect labels. No image, layout or carousel edits. Reduced-motion preference remains respected. Lint passed; build initially hit ENOSPC, then succeeded after clearing only regenerable .next/cache. Local preview refreshed and visually checked. No push/deploy.

### Slightly stronger drift
Owner requested a little more movement. Increased airborne drift range approximately 20% and frequency approximately 17–20%, retaining the tiny foreground paths, particle count, imagery, composition and reduced-motion handling. Lint/build passed; local preview refreshed. No publishing.

## 2026-10-20 — Fully clean plates, all grains animated
Owner explicitly requested removing every remaining baked-in grain, including waves and foreground. Imagegen cleaned desktop/mobile plates into hero-clean-desktop.webp and hero-clean-mobile.webp; originals retained. Exact sources/prompts in HERO_FULLY_CLEAN_ASSETS.json. Rebuilt wave/floor scattering with individual sprites using the existing photographic grain atlas and shared weightless drift; all scene grains now live in animated layers. Exact extraction of every original grain was not possible from flattened photography; appearance/distribution are approximated, and cleaned metallic reflections are reconstructed. Updated fallback images and glass reflection source to clean plates so frozen particles cannot show through on load. No carousel/layout/product changes. Lint and 44-route build passed; desktop/mobile inspected and phone swipe verified. Local only.

## 2026-10-20 — Richer lower particle clusters
Owner requested denser bottom scattering and more salt/pepper variety. Reused all 16 photographic sprite variants, added overlapping lower-corner pockets with a fine/coarse size mix, increased near-floor grain sizes and opacity, and shifted broad surface scatter toward the base/edges. All grains continue independent slow drift; center stays open. Lint passed and static build completed (cache persistence warning due to disk pressure after clearing regenerable cache). Desktop preview checked. Local only.

## 2026-10-20 — Remove rejected oversized clusters
Owner rejected the coarse bottom-corner pockets as artificial. Removed those added clusters entirely, reduced the remaining surface grains to small sizes and softened their opacity. Preserved airborne drift, clean plates, vials and layout. Lint/build passed after removing regenerable cache to avoid disk pressure. Local preview refreshed; no publishing. This removes the preceding richer-cluster treatment.

## 2026-10-20 — Restrained whirlwind distribution
Owner requested a middle ground between sparse even sprinkling and fake oversized clusters. Redistributed airborne grains into three loose, asymmetrical overlapping curved streams per side, with variable-width pockets, gaps and sparse outliers; increased moderate-density fine grains while keeping size below the rejected coarse treatment. Lower scatter is slightly more visible without adding large chunks. Preserved slow individual movement, center clearance, background/vials and carousel. Lint/build passed. Local only.

## 2026-10-20 — Phone-first hero proportions
Owner prioritizes mobile polish. Added phone-only overrides: smaller responsive vial stage with more surrounding scene, balanced side-vial spacing, cleaner arrow treatment, clearer product metadata, aligned 48px primary CTA and secondary collection link, improved notice spacing and compact pagination. Mobile particle currents extend slightly inward to frame the products. Desktop style/particle values unchanged. Checked 390x844 and 360x780 and verified swipe BPC→GLP. Lint passed; build passed after clearing regenerable cache/dev/export output due to disk pressure. Local only.

### Mobile grain readability
Owner found phone grains too microscopic. Increased mobile-only sprite delivery scale (minimum .95 instead of roughly .73 at 390px), preserving density, distribution, motion, foreground label-safe grains and desktop rendering. Lint and build passed; mobile preview refreshed.

### Mobile clusters instead of sprinkles
Phone-only refinement: reduced airborne count 240→180 and surface count 330→220; grouped airborne positions into staggered loose pockets along the curved side paths, reduced diffuse outliers and drift amplitude so pockets remain legible, and raised minimum airborne size to 4px with a gentler size distribution. Desktop parameters unchanged. Lint/build passed; mobile screenshot inspected. Local only.

### Desktop-inspired phone scatter
Owner approves desktop and rejects phone vertical strings. Removed phone-only height pockets, reused desktop continuous vertical distribution/sweep, widened lateral spread and curve on narrow screens, and restored diffuse outliers. Kept readable phone grain sizes and desktop values unchanged. Lint/build passed; local only.

### Mobile floating movement refinement
- Increased mobile-only airborne drift distance and gently increased its pace so movement reads at phone size; surface grains also have slightly wider drift. Desktop parameters, particle artwork/distribution, layout and carousel remain unchanged. Reduced-motion handling preserved.

### 2026-10-21: Fuller mobile atmosphere
Added phone-only pockets of photographic grains along the existing curling ribbons, weighted toward the lower waves. Preserved gaps, the clear central product zone, existing slow drift, desktop generation and all page layout. No new assets or foreground clutter.

### 2026-10-21: Homepage content simplification
Reordered Why choose reasons: Utah County delivery, straightforward pricing, COA library, free U.S. shipping, direct support. Updated shipping card to free shipping throughout the U.S. per owner. Removed the supporting delivery/report sentence and Shop compounds CTA from the Without the wait intro only; product gallery retained.

### 2026-10-21: Editorial Why Salt N’ Pep section
Replaced icon/description cards with five numbered typographic links, fine desktop dividers and spacious mobile rows. Retained destination links and existing benefit order. Charcoal/cream palette, italic serif heading accent, static edge-only fine grain, restrained hover and reduced-motion support. Other homepage sections unchanged.

### 2026-10-21: Why section supplied background and concise links
Used owner background on desktop and generated matching portrait mobile variant. Removed numbering. Added one brief linked description per benefit with existing destinations. Centered mobile content keeps text away from corner imagery. Other homepage sections untouched.

Owner clarified mobile background must fit the existing compact section, not become a portrait panel. Switched mobile to the supplied landscape image rendered at its outer edges without stretching; restored left alignment and compact rows. Generated portrait is unused.

### 2026-10-21: Minimal edges and horizontal mobile benefits
Softened supplied background to 34% opacity over charcoal. Removed description arrow glyphs. Mobile now uses one horizontal, natively swipeable row with readable type, subtle vertical dividers and keyboard-focusable overflow. Desktop remains five columns.

### 2026-10-21: Three-and-two mobile correction
Replaced horizontal scrolling with three benefits in the first row and two centered below. Removed overflow focus target. Edited original background to reduce actual salt/pepper quantity; restored full brightness instead of fading it. Mobile uses landscape asset edges at natural proportions.

### 2026-10-21: Fine-grain-only Why background
Removed all large/medium salt and pepper pieces from the background asset, leaving only sparse tiny edge flecks at original lighting. Applied on desktop and mobile; three-and-two mobile grid, copy and links unchanged.

### 2026-10-21: Restore full scatter with smaller pieces
Owner clarified density should match the original; only large pieces should be removed. Replaced overly sparse background with a full small-grain edge scatter at original brightness. No layout, copy or link changes.

### 2026-10-21: Organic benefit background
Refined small-grain edge scatter with uneven pockets/gaps while maintaining fullness and clean text area. Shipping description now reads See shipping details. Layout and destinations unchanged.

### 2026-10-21: Slightly reduced organic scatter
Edited current background targeting roughly 30% fewer small grains while preserving brightness and organic edge placement. Applied same asset to both responsive treatments; no layout or copy changes.

### 2026-10-21: Trim left scatter near delivery benefit
Moved only the left background layer outward 32px on desktop and 22px on mobile, softly blending at center. Right image placement/brightness and all content retained.

### 2026-10-21: Collection matches homepage gallery
Restyled collection-only product cards with homepage warm stone surfaces, thin borders, rounded corners, matching vial presentation and typography. Four desktop columns, three tablet, two mobile. Scoped page/toolbar palette to collection; all catalog search/filter/sort, product details/availability and links retained. Homepage unchanged.

## 2026-10-21 — Easier mobile carousel swipes
- Touch swipes commit at 18% of a vial step instead of requiring a midpoint crossing or fast flick.
- Smoothed release velocity and relaxed diagonal gesture recognition while retaining vertical scrolling, click suppression, reduced motion, and the existing spring.
- Added touch release regression cases including loop boundaries and paused releases. Local preview only.

## 2026-10-21 — Successive swipes and restrained settling bounce
- A new swipe retains the prior intended destination while tracking the current visual position, so rapid successive swipes advance reliably even before the previous spring crosses its midpoint. Tiny interrupted gestures retain the pending destination.
- Swipe releases use a slightly firmer spring with a small controlled overshoot; arrows, visuals, reduced-motion behavior and layout remain unchanged.
- Added regression coverage for successive swipes, reversal, small nudges and loop boundaries.

## 2026-10-21 — Right-edge thumb swipe dead zone
- Found that all pointer starts on arrow buttons were ignored, creating a swipe dead zone where right-to-left thumb gestures commonly begin.
- Allow touch/pen swipes to start on either arrow. Existing click suppression prevents a swipe from also activating the arrow; simple taps and mouse button behavior remain unchanged.

## 2026-10-21 — Strong swipe snap-back
- Removed the cancellation path that unconditionally returned to the original destination. Capture loss / browser cancellation now settles from actual travelled distance with no added momentum.
- Normal releases include the final pointer-up position so a fast swipe does not settle from an outdated move sample.
- Added interruption-distance regression coverage in both directions and across loop boundaries.

## 2026-10-21 — Hero copy cleanup and contact logo
- Removed the illustrative-photo sentence and visible carousel count/instructions; retained laboratory-research notice, accessible slide status, arrows, and pagination controls.
- Replaced contact GHK-Cu photo and overlaid slogan with supplied original logo, contained against black for desktop/mobile.

## 2026-10-21 — Brevo email capture connected
- Created Brevo list #3, Salt N Pep Website Subscribers, and its signup form in the owner's account.
- Replaced sample newsletter forms on homepage and shared footer with one reusable real signup component. Sends directly to the public Brevo form endpoint over HTTPS; no API secrets or subscriber database exposed in the site.
- Added required email validation, honeypot, pending state, confirmed-success/error feedback and hosted-form fallback; preserved existing styling. Updated privacy disclosure to identify Brevo.
- Verified a real signup using the business email and confirmed list count plus successful inline response. No newsletter campaign or confirmation email sent; transactional confirmation emails are currently unavailable in this account.
- Lint/build passed. Local preview only; no production publication.
- Opened Twilio signup for chat-to-native-text routing. Owner must finish password, terms and verification; no paid service activated and no phone numbers placed in frontend code. Chat remains a demonstration until account configuration and end-to-end routing tests are complete.

## 2026-10-21 — Free shared support chat connected and verified
- Replaced demo chat with on-demand tawk.to widget; preserved custom chat button, added connection-error email fallback, and updated privacy disclosure. No private phone numbers or API credentials in the frontend.
- Configured charcoal widget, order/documentation greeting, direct-to-chat view, disabled unused knowledge base, hidden estimated wait time, and offline mode when all agents are offline.
- Partner accepted the invitation and is now Active as an Agent; owner remains Admin. No paid add-ons or Twilio purchase activated.
- Verified website-to-dashboard test messages and a dashboard reply appearing in the visitor widget. Newsletter capture already verified with Brevo. Lint/static build passed for integration.
- Phone push notifications still require each owner to install/sign into tawk.to and enable notifications on their own phone. Website changes remain local only; no production publication.

## 2026-10-21 — Compact product COA presentation
- Simplified the shared product certificate section: Certificate of Analysis heading, reported purity beside tested size where available, direct PDF and batch verification links, expandable lab/date/source details.
- Removed blanket example/inventory-pending assertions in this section in light of owner's stated supplier batch coverage. No new independent inventory-verification claim; results remain scoped to reported sample size. GLP-3 lot discrepancy stays visible; missing certificates remain explicitly unavailable. Report data and URLs unchanged.
- Kept scope/sterility clarification accessible in details. Other page sections unchanged. Lint/build passed and desktop/mobile BPC-157 presentation and details interaction checked. Local only.


## October 21 — owner sizes and Lumira document refresh (local only)
Confirmed GLP-3 30mg only, BPC-157/TB-500 10mg only. Filter storefront variants while preserving supplier snapshot; inherited existing size-specific prices. Removed sizes remain invalid for cart/checkout. Updated BPC10 and GLP3/30 supplier reports to August 10 BTLabs documents; preserve registry vs PDF lot distinctions and measured content (9.1mg; 25.2mg respectively). Do not claim inventory matching. Added MOTS40 supplier report as additional documentation; MOTS selling size remains 10/40 pending owner's uncertain 20mg statement. TB10/Pinealon10/Epitalon10 links retained as current size-specific reports found. GLP3 hero/gallery asset copied as glp-3-30mg.png; built-in imagegen prompt: change ONLY 10 MG to 30 MG, preserve vial, alpha, lighting, composition. Original preserved. No push/deployment.


## October 21 — neutral GLP-3 gallery and removal of MOTS40 selling option
Owner correction: remove MOTS-C 40mg selling option; retain existing 10mg pending confirmation of suggested 20mg. Keep the 40mg supplier document clearly labeled by tested size, not a selling option. Collection/home shop GLP-3 now uses neutral silver/black 30mg isolated asset, separate from warm hero asset. Built-in imagegen prompt: change only original neutral GLP3 10 MG text to 30 MG, preserve alpha, lighting and composition. Asset public/images/vials/glp-3-30mg-neutral.png. No publishing.


## October 21 — simplify Lumira COA presentation
Owner confirms MOTS-C 10mg. Removed additional MOTS40 PDF from product panel and central COA library. Primary 10mg PCB report unchanged. Lumira panels now label size explicitly on View lab report link, use Batch record, and keep registry/lab-lot explanations in Report details. Removed unsupported blanket inventory-pending wording; do not assert independently verified stock. GLP3 measured-content shortfall remains visible, with complete report link. No deployment.


## October 21 — correction to incomplete Aurum audit
Fresh hydrated Aurum COA directory exposes new storage-backed documents missed by earlier check. Added missing ARA290, Cagrilintide, MelanotanI, SS31, Wolverine reports; added Selank10, Semax10, KPV30; refreshed CJCnoDAC5, Ipamorelin5, KLOW80, KPV10, NAD500 links. All 13 new URLs return HTTP200 with PDF signatures. Kisspeptin remains Coming Soon in directory. Existing Lumira source overrides preserved. Owner requested restoring MOTS40 additional supplier report alongside MOTS10, not restoring purchase size. COA library/product panel share mapping. Local only.


## October 21 — refined product COA panels
Preserved wide desktop section, introduced champagne typography/actions, restrained green document-availability badge (not a testing-pass claim), visible Lumira report metadata and distinct View/Download actions. Mobile stacks with paired 44px actions. Download uses byte-unaltered locally bundled public PDFs mapped by URL in coa-downloads.json; View retains supplier URL. Existing report scope and GLP3 content issue remain. Only product COA component styling/presentation and download assets changed. Local only.


## October 21 — COA green/charcoal refinement
Refined only product COA styles: deep green-charcoal, soft sage View action, brighter report figures, subtle column/rule structure and more readable metadata. Preserved report text, scope, downloads, and existing responsive stacking. No added quality claims. Local only.


## October 21 — purity-number-only green correction
Owner clarified green belongs only on purity numbers. Restored neutral charcoal panel, champagne rules/badge, ivory primary button and warm neutral copy/focus states. Purity figure now bright green #65dba5. No content or functionality changes; local only.


COA palette follow-up: neutral #222222 surface with neutral white hairlines replaces warm-tinted background/borders. Green purity figure retained. Local only.


## October 22 — homepage delivery countdown
Added compact, ivory/champagne countdown beside Research compounds / Without the wait. Reuses Mountain Time cutoff logic; before 11 a.m. distinguishes Utah County next-day delivery from next-day nonlocal dispatch. After cutoff clearly states two-day delivery/dispatch and counts to tomorrow’s cutoff. Carrier transit and holiday note plus delivery details link retained. Mobile stacks within existing intro; hero and other sections unchanged. Local only.


## October 22 — independent COA viewing
Product View report and central COA library PDF links now use the existing unchanged PDFs hosted under /coas, alongside existing local downloads. Supplier attribution, report details, and optional external batch-registry links remain. This removes supplier uptime dependency for all currently linked documents. Local only; no publication.


## October 22 — browser-independent COA viewer
In-app browser showed blank native PDF viewer despite HTTP200 PDF response. Added static report pages rendering every original PDF page, extracted accessible text, and original PDF download. Product/library View links use these pages. Original PDF bytes untouched. Reproducible rendering script scripts/build-coa-previews.py. Local only.


## October 22 — quieter supplier attribution
Moved supplier attribution from product COA headline area into Report details & scope, and library card attribution into Report source disclosure. Original reports and source filtering unchanged. Kept GLP3 content discrepancy notice while the same report remains linked; no factual report modifications. Local only.


## October 22 — concise GLP-3 content disclosure
Owner approved smaller always-visible measured-content line directly beneath report actions. Replaced large notice with Measured content: 25.2mg · Labeled amount: 30mg; readable 13px neutral text, no expandable gate. Library shares concise wording. Report files and results unchanged. Local only.


## October 22 — owner stock-only catalog
Keep owner BPC15710, GLP330, TB50010 and MOTSC10. Live hydrated Aurum compounds directory shows CJC1295 with DAC out of stock, Kisspeptin coming soon; remove both, and BAC water explicitly excluded. Pinealon/Epitalon not listed at Aurum and not among owner four, so removed. Other supplier listings available; all multi-size selections checked. 23 products / 31 sizes remain; prices unchanged. Hero retains six existing active original compounds. Removed products disappear from catalog, generated routes, recommendations and COA library and are rejected by cart/checkout. Snapshot only, no automatic stock sync; local only.


## October 22 — asset preservation and policy preparation
Recorded hashes for public imagery and COA assets in PUBLISH_ASSETS.json; check-publish-assets.mjs verifies original and exported bytes. Staged public assets locally to prevent omission; no commit or push. Policy intro now states checkout not open; clarified shipping-delay choice and no substitutions without agreement; removed obsolete configuration prose while preserving actual service disclosures. Account integration/reward amount and legal identity/public mailing address/supplier dispatch feasibility requested from owner; pending.


## October 22 — legal business name and COA purity figures
Owner confirms Salt N' Pep Labs LLC; recorded in settings and policies. Extracted documented purity results from original saved Aurum PDFs into URL-keyed coa-purity.json. Product COA panels display first report purity explicitly labeled by report size, and each Aurum report row displays its own percentage; no universal 99% claim. Existing Lumira numbers and discrepancy disclosure retained. Local only.


## October 22 — remove duplicate purity display
Primary report purity appears once in the main result. Additional report rows retain their own size-specific figures. Local only.


## October 22 — consistent COA metadata layout
All active supplier report rows now use the same Laboratory / Report issued / Report lot fields as Lumira rows, sourced from saved original PDFs. Report lot preserves original descriptors (including cap descriptions where that is what the lab lists), without inventing lot IDs. Lumira registry links moved into existing source disclosure; actual lab lot shown when distinct. Main percentage appears only once; additional sizes keep distinct results. Local only.


## October 22 — visible remember-device choice
Entry gate now includes optional Remember this device (selected by default, preserving prior behavior). Selected persists acceptance in localStorage; deselected stores only current-tab acceptance in sessionStorage. Removed unconditional session-to-local promotion. Existing remembered users remain accepted. Required age/research confirmations remain unchecked. Private browsing/cleared or blocked storage may require re-entry. Local only.


## October 22 — seamless add-to-cart and readable drawer
Adding a product now opens cart automatically through existing addition counter; closing remembers latest addition and later adds reopen it. Restoring saved cart does not force drawer open. Explicit charcoal/ivory cart palette fixes pale text on pale item panels, with clear subtotal, checkout action and continue-shopping option. Quantity upper-limit disables at 100. Existing checkout field text contrast corrected; payments/configuration remain deferred. Local only.

## 2026-10-22 — Mobile arrow and copy cleanup
Replaced storefront text arrows with consistent SVG icons, removed newsletter fine print (privacy policy retained), and removed the product Laboratory Handling panel at owner request. Publish requested.

## 2026-10-22 — Compact multi-size documentation
Replaced stacked COA reports with size-selection buttons and one active report. Purity, lab details and view/download links change together; additional-report scope and content notices retained. Lint/build passed; verified Tesamorelin 5mg to 20mg updates correct purity and document links. Local preview only.

## 2026-10-22 — Recommendation copy
Removed the explanatory sentence under More from the collection at owner request; heading and product links retained. Local only.

## 2026-10-22 — Link preview branding
Set explicit Open Graph and Twitter metadata to the existing black-and-white logo and SALT N’ PEP | Research Compounds title. Visible homepage headline unchanged.

## 2026-10-22 — Compact charcoal share artwork
Added separate landscape logo image for link previews, charcoal exterior and black vial interiors. Updated social metadata dimensions; existing on-site logo unchanged. Owner requested publication.
