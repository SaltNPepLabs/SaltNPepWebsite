# Project Context

## October 20: Research publication content retired by owner

Owner explicitly removed the entire research library to avoid literature upkeep. Removed /science and every compound/paper route, product scientific-review panels, homepage research feature, and navigation/About/FAQ links. COAs, product specifications, artwork, and research-use-only notices remain. Retired route/component source is preserved in docs/archive/research-retired-2026-10-20.tar.gz; unreferenced internal research data/scripts remain historical, not published and not maintained. This supersedes all earlier instructions to retain/update the library. No deployment or Git push authorized.

## October 20: Local storefront service expansion

Owner requested COA library, support/about/policy pages, accounts/tracking/chat/newsletter/rewards, EN/ES, recommendations and delivery. Working directory/search/support pages and no-discount quantity controls implemented. Free shipping set to zero for supported destinations. Utah County next-day cutoff/days still pending. Accounts/tracking, chat/newsletter/rewards remain unconnected; EN/ES covers new surfaces only. No invented company credentials. See STOREFRONT_SERVICES.md for exact status and launch blockers. Nothing pushed or deployed.

## Owner-approved removal: storage and shelf-life claims

Removed remaining storage temperatures, light/moisture handling claims and long-term stability assertions from the eight original product records. Removed storage and shelf-life FAQ entries, including the 24+ month assertion and COA expiration instruction, plus the comparative stability sentence. Product cards no longer display an empty Storage subsection. Laboratory preparation boundary remains. This supersedes the earlier storage/shelf-life deferral; other numbered recommendations remain unchanged. Local only; no push or deployment.


## 2026-10-20: Remaining personal-use instruction cleanup

Owner authorized removing remaining personal-use instructions/promises. Reviewed product copy, FAQ, homepage, purchase screens and scientific-review component. All 28 product descriptions are neutral; no personal dosing schedules found. Removed step-by-step bacteriostatic-water mixing directions and post-reconstitution 21/30-day use windows from the original eight product records and FAQ. Added a laboratory-assay preparation boundary and FAQ stating no personal-use mixing/dosing/administration instructions. Existing dry-storage/shelf-life, quality/COA claims, research summaries, TB-500 presentation, imagery, prices and checkout logic remain unchanged; these separate deferred topics are not validated by this cleanup. Local only, rebuild static preview on port 3015; no publication authorized.


## Owner correction: restore previous TB-500 research presentation

Reverted the latest TB-500-specific library headings, inventory-match warnings, and per-publication badges to their pre-audit wording and placement. Existing related-thymosin explanations remain as before. Other library improvements and earlier product-specification changes are unchanged. Local only; no publication authorized.

## Owner correction: GLP-3 naming restored locally

Owner reversed only the scientific-name restoration. Public research titles, descriptions and displayed search terms again use GLP-3, with explicit adapted-title disclosure; original source records and PubMed search URLs remain intact internally. Keep the other library improvements: upfront limitations, citation-only records and TB-500 related-literature labels. No push or deployment authorized.


## 2026-10-20: Authorized local research-library revision

This supersedes the earlier deferral of publication naming and the earlier abstract-reader descriptions. Preserve scientific source names and original titles; GLP-3 remains the catalog label and route. Keep the 124 detailed explanations, with model and limitation beside the finding. Other publication routes remain as citation records, with direct PubMed links instead of short excerpts. Label TB-500 literature as related research with inventory molecule identity unverified; do not imply equivalence. All bibliography entries and correction/retraction notices remain. Local review only; no push or deployment authorized.


SALT N’ PEP is a Next.js 16 App Router storefront-style site for research peptides. Its 28-product catalog includes all 26 Aurum Peptide Labs listings and 38 available source sizes, plus the existing Pinealon and Epitalon products. It includes product detail pages, science/FAQ content, and a client-side cart drawer.

## Repository

- Company homebase: https://github.com/SaltNPepLabs/SaltNPepWebsite
- Working branch: `main`; default remote: `origin`
- Existing local workspace: `C:\Users\kalec\peptide-store`
- Previous personal repository is retained locally as remote `legacy`; company Git history includes the existing work.

## Stack

- Next.js 16.3.8 with React 19; Node 24 for the separate checkout API
- TypeScript
- Motion for homepage carousel springs and gesture feedback
- Tailwind CSS v4
- `next/image` with locally bundled product/brand photography for all 28 products and all 43 catalog sizes
- Client-side cart state in `src/lib/cart-context.tsx`

## Current Design Direction

The active visual system follows the owner-provided SALT N’ PEP vial reference: warm ivory, charcoal, stone neutrals, restrained sans-serif typography with editorial serif italics, textured surfaces, and locally bundled brand imagery. Responsive layouts are checked from 280px phones through 3840px desktop widths, including short landscape screens. Route coverage, interaction checks, browser coverage, and limits are recorded in `docs/RESPONSIVE_QA.md`.

## Common Commands

- Development: `npm run dev -- --webpack`
- Lint: `npm run lint`
- Checkout and size-pricing regressions: `npm test`
- Build: `npm run build`
- Fast built UX preview: `npm run preview` at http://127.0.0.1:3016 (rebuild after edits)
- Research export audit, after building: `node --import tsx scripts/check-research.mjs`
- Refresh the date-bounded PubMed searches and relevance-selected bibliography: `python scripts/refresh-research-catalog.py` (optional `--through YYYY-MM-DD`; rejects incomplete searches, re-fetches indexing notices, and applies the shared relevance gate). `--from-cache` re-screens ignored raw searches/records without changing their original source-check date.
- Research relevance regressions: `python -m unittest discover -s scripts -p test_research_catalog_screening.py`
- Source-excerpt regressions: `python -m unittest discover -s scripts -p test_research_source_excerpts.py`

Use `--webpack` for local development because the default Turbopack dev server has previously panicked on this Windows machine while serving the site.

## Current functionality

**Latest owner artwork direction:** Preserve the original eight vial designs, with authorized quantity corrections. All 20 additional products now have matching transparent vials and unique rock photographs, covering every catalog size. See CATALOG_IMAGE_PROMPTS.json. All work remains local only.

The October 20 local changes below supersede the older review/photo/category/gate descriptions. Publication is not authorized.

## 2026-10-20: Local research-only copy cleanup (not published)

Owner authorized audit items 1–5, 9, 10, 12, 14, and 17. Explicitly deferred 6, 7, 8, 11, 13, 15, and 16. The sole certificate exception is routing BPC-157, GLP-3, TB-500, and MOTS-c to the existing Lumira/Peptaura reports instead of Aurum. The owner states supplier COAs cover sold inventory; broad certificate wording, quality claims, and the recorded GLP-3 lot discrepancy remain deferred. Do not push or deploy without explicit approval.

Customer testimonials and ratings are removed from the application; the 200-record source is preserved unchanged in docs/archive/customer-reviews-data.json. Original eight products now use neutral identity/form descriptions, no outcome lists, promotional mechanism descriptions, or unused safety/steroid claims. FAQ steroid/legality assurances and product benefit summaries are removed. Research-library content, scientific-review panels, and GLP-3 publication naming remain unchanged.

TB-500's unsupported full-length equivalence and associated formula/mass/CAS fields are withheld pending an inventory-specific identity specification. KLOW/Wolverine composition still requires owner confirmation; Aurum's current KLOW page contradicts itself (opening lists GHK-Cu/KPV/TB-500/BPC-157, other sections list larazotide/orexin-A). Do not guess a formula.

Purchase-adjacent notices, cart/footer/home and entry gate now explicitly prohibit personal use or administration to humans/animals. Entry acceptance key is v2 so the revised statement is reconfirmed once. Checkout verification logic is unchanged. Fixed-size photographs are replaced in the UI with the existing size-neutral CSS vial illustration; original artwork remains preserved. No pricing, size availability, payment behavior, storage/reconstitution, quality, shipping or policy changes were authorized.

### Earlier implementation context

- Optional PostHog analytics is disabled by default and loads only after saved/current site entry acceptance. `src/lib/analytics.ts` owns pageviews and the complete product/cart/checkout/research funnel with allowlisted props, DNT, no free text/PII, and scrubbed URLs. The separate API captures verified Stripe/Venmo paid orders using anonymous checkout metadata and persistent delivery deduplication; analytics failures never fail payments. Server recovery: `npm run orders -- retry-analytics`. Event dictionary, privacy limits, activation, and dashboard guidance: `docs/ANALYTICS.md`. Static export and payment guards are unchanged; owner project keys and privacy disclosure remain pending.

- GLP-3 is the owner's public catalog label for LY-3437943. Product/research routes use `glp-3`; names, summaries, customer reviews, and saved-order presentation use the same label. Research pages disclose adapted publication wording; changed source passages are labeled adapted excerpts rather than exact quotations. Canonical sources, exact PubMed queries, and stable checkout IDs remain unchanged. Both product photos now print GLP-3. Naming policy and image-edit prompts: `docs/CATALOG_NAMING.md`.
- Every selected publication opens a static `/science/[slug]/[pmid]` reader from its title or Read summary link. The 124 curated papers lead with their detailed finding, methods, results context, and limitations. Other readers show an attributed excerpt of at most 25 exact words, with the original section and shortened-sentence disclosure, or an honest missing/review-required abstract state. Only explicitly labeled source conclusions are called conclusions; retracted records retain prominent notices. Full-abstract and original-publication links stay visible. Search, type, year, sort, page, reading view, and expanded PMID/PMCID note survive reader return and browser Back. `scripts/research_source_excerpts.py` generates `src/lib/research-source-excerpts.json` during both refresh modes, preserving source fingerprints and cached-check dates; full abstracts remain private in ignored data. Reader selection uses the same compound relevance gate as the library.
- Site entry requires two unchecked confirmations: I am over the age of 21 and I understand that these are research compounds. Visitors without saved acceptance must complete the form on any route, including direct links. Confirmation persists in versioned local storage across reloads, closed tabs, and future visits; acceptance also dismisses the form in other open tabs. Existing session confirmations migrate automatically. Unavailable local storage falls back to session storage, then memory during app navigation. The static export includes the form and inert storefront before hydration. Interaction, persistence policy, and verification are documented in `docs/SITE_ENTRY.md`.
- Homepage's full-screen hero uses separate desktop/mobile salt-flat backgrounds and a centered carousel of the original eight featured peptides, with a large isolated active vial and four smaller neighboring vials. Clicking a neighboring vial centers it; clicking the active vial opens its product page. Motion drives a shared continuous position: horizontal drags follow the pointer, release velocity influences snapping, and springs settle with bounce. Arrows/selectors retarget immediately during motion; keyboard arrows/Home/End also loop through the collection. Cancelled gestures restore the selected vial, vertical touch scrolling remains available, and drags suppress photo-link navigation. Mobile arrows are 44px. Desktop hero content uses normal grid flow with a minimum 820px height, so short screens scroll while the heading, vial, product details, caption, and selectors stay separate and reachable. The active name, catalog quantity/category/price, and product link update together, including the public GLP-3 route. Photos remain illustrative; the transparent navigation, delivery banner, live tagline, and research-only notice stay visible. Reduced-motion preferences disable springs and movement feedback. The responsive research feature follows the hero with live HTML text and a research-library link; there is no second peptide section. Carousel UX remains explicitly unapproved pending owner review; component libraries are authorized when helpful.
- Collection search and category filters cover 28 active products. All 20 former Coming soon previews now have priced product pages and purchase controls. The availability filter is hidden while the preview list is empty. Original eight photos remain; additions use labeled SALT N’ PEP vial illustrations. Source mappings and naming caveats are in `docs/UPCOMING_COLLECTION.md`.
- The October 11, 2026 Aurum snapshot supplies all 26 source listings and 38 available sizes with explicit USD prices. Imported sizes use a flat per-vial price at quantities 1, 3, 5, and 10; Pinealon and Epitalon retain their original prices/bulk tiers and three sold-out alternatives. There are 43 public sizes in total. Cards and selectors share defaults; cart restoration and authoritative checkout reject unavailable, removed, or unknown sizes without substitution. Stable legacy size identities and immutable order snapshots are preserved. Source prices, sample coverage, IDs, and checks are in `docs/PRODUCT_SIZES.md`.
- Cart supports quantity pricing, removal, focus trapping, Escape, focus return, and browser persistence. The header Bag stays highlighted with a warm-gold pill and filled charcoal count while it contains items, including after reload; emptying the cart clears the highlight. Each Add to Cart action briefly pulses the count and sparks around it; repeated additions replay the feedback, with animation disabled for reduced motion. Checkout submits orders for staff research review; approved requests offer hosted Stripe card checkout or manual Venmo business payment. A separate Node API prices from the catalog and stores immutable order snapshots in SQLite. Signed matching webhooks confirm cards; staff verify unique Venmo transactions. Live checkout is disabled by default. Setup and limitations: `docs/CHECKOUT.md`.
- Research library has compound-publication and explained-study views. The October 4, 2026 snapshot contains 1,448 relevance-selected entries (1,444 unique PMIDs) from 2,606 raw PubMed name/alias matches. Automatic inclusion requires a compound-focused title; broader titles and ambiguous preparation identities need explicit source-reviewed reasons in `scripts/research-catalog-selections.json`. The shared gate in `scripts/research_catalog_screening.py` excludes general policy/commentary, unrelated sequence matches, free GHK-only papers, and known non-biomedical applications. Direct safety cases, analytical preparations, negative findings, focused reviews, and correction/retraction records remain discoverable under the same rules as benefit findings. Each publication displays its inclusion reason. This is a selected bibliography, not exhaustive coverage or a quality assessment; broader PubMed searches remain linked and abstracts needing review are not auto-published. Compound pages provide 30-record pagination, title/topic/author/PMID search, publication-type/year filters, oldest/newest sorting, source links, and correction/retraction warnings. All 124 selected explanations remain, with source-verified study setup, measurements, results context, evidence explanations, and limitations in native static disclosures. Notes live in `src/lib/research-reading.ts` and `src/lib/research-reading-additions.ts`; public metadata lives in `src/lib/research-catalog-data.json`. Raw abstracts and exclusion reports remain in ignored `data/`. Counts do not imply independent trials. Human observations are distinguished from administration trials; parent thymosin beta4 and engineered preparations are distinguished from TB-500. Product scientific-review links retain selected-paper counts. An expandable evidence-reading guide follows the results.
- Product pages display 200 owner-supplied customer reviews from `src/lib/customer-reviews-data.json`: BPC-157 51, GLP-3 56, TB-500 46, and MOTS-c 47. At the owner's request, all 59 records containing "demo" (case-insensitive, in any review field) were removed in full; retained records are unchanged. Each populated section has an average rating, rating filters, and six reviews per page; the other 24 products retain their zero-review empty state. All imported records are unverified and labeled accordingly. Original dates remain in the source file but are omitted from the public display and payload pending owner corrections. Customer review submission and moderation are not connected.
- Site-wide Local Utah delivery banner is owner-authorized; no delivery pricing or timing is asserted.
- Twenty-five current Aurum certificate PDFs are linked on 20 products, with publisher attribution and tested-sample size labels. Six products have no published current certificate and explicitly link the directory. Results do not verify SALT N’ PEP inventory or unlisted sizes. Pinealon and Epitalon retain labeled Lumira example reports; inventory matching remains pending. The source snapshot is `src/lib/aurum-catalog-data.json`.
- Shared brand photo is illustrative of the brand vial; each product explicitly displays its own quantity and format. Other legacy product/FAQ scientific and commercial claims still require verification before launch.


## Interactive local previews (owner requested)

Unconnected account/tracking, rewards, delivery timer, newsletter and support chat now render interactive demonstration UIs on loopback hosts only. Sample account opens a dashboard with stage selector/profile/rewards; referrals show an explicitly illustrative $20 balance; delivery shows a sample countdown and local/shipping switch; newsletter previews a confirmation; chat renders labeled canned replies. No authentication, messages, subscriptions, credits, clipboard sharing or external service requests occur. Demo state stays in component memory. Local preview navigation exposes each feature. Existing real-service configuration and checkout remain unchanged. EN/ES supported for these previews; existing catalog/research translation remains incomplete.


## October 20 — 11 a.m. delivery cutoff and policy preparation
Owner specifies Mountain Time cutoff: before 11 a.m., Utah County delivery next day; at/after 11 a.m., two days later. Free shipping elsewhere; nonlocal dispatch wording ambiguous (same-day before cutoff versus next-day), clarification requested. Weekend/holiday service, refund/cancellation/damage rules, guarantee remedy and legal entity/address also requested and unanswered. Do not activate guarantee or call policies final until resolved. Real timezone-aware countdown replaces the resetting sample timer, shows next cutoff after 11 and handles DST. No booked delivery date is shown while service days remain pending. Policy page expanded with confirmed terms and explicit remaining gaps. Checkout expressly deferred. Owner confirms TB-500 identity, blend compositions and business/product details are accurate; do not repeatedly characterize them as unconfirmed, and do not invent missing specifications. No push/deployment.


### Confirmed follow-up — seven-day schedule and delegated policy choices
Owner confirmed all seven days, holidays may vary, and nonlocal dispatch NEXT DAY before 11 a.m. or TWO DAYS LATER at/after cutoff (not same-day). Carrier transit additional. Owner delegated simple customer-convenient policy choices: free cancellation pre-dispatch; no change-of-mind returns post-dispatch; replacement/refund for confirmed damaged/incorrect/missing items, preferably reported within seven days (not a rights cutoff); seller-paid return if needed for seller error; refunds initiated within five business days. Local missed-date remedy is 10% affected-item refund or full refund for canceled undelivered order. Timing begins once paid/research-approved, date confirmed at acceptance. Incorrect customer address/access excluded; holidays disclosed before ordering. Checkout unchanged/deferred. Tailored policies on /policies; privacy provider/retention particulars and legal business mailing details still needed before actual service launch. Live Mountain Time countdown with 11:00 exact boundary/DST/year rollover tests. No publishing. Supersedes the immediately preceding pending-schedule notes.


## Chroma-inspired inner-page refinement
Owner wants clean feel of chromacoatingsutah.com with homepage unchanged. Visually inspected Chroma home/About: restrained typography, generous spacing, rounded cards and muted accents. Applied centered service-page introductions, calmer typography, softer borders/corners, more spacing, refined catalog cards, product controls and COA panels in existing ivory/charcoal palette. No Chroma copy/assets imported. Home page, home CSS and carousel hashes unchanged; global refinements scoped to non-home routes. Images, prices, policy terms and service functionality unchanged. Lint/build passed; desktop Contact and mobile product page visually checked, COA page has no horizontal overflow at 390px. Local only; no commit/push/deploy.


## Luxury revision after owner feedback
Owner found the first clean pass insufficiently luxurious. Inner pages now use charcoal/olive-black surfaces, warm ivory type, restrained brass accents and finer, squarer borders. Contact rebuilt as stone-vial photography beside a service desk with prominent email and simple link rows, plus a serif accent. Existing GHK-Cu photograph reused unchanged; no invented service claims. Global palette explicitly excludes homepage; home source and carousel preserved. Pricing/checkout/policies unchanged. Local only. Lint/build passed and desktop Contact visually verified.


## October 22 — owner stock-only catalog
Keep owner BPC15710, GLP330, TB50010 and MOTSC10. Live hydrated Aurum compounds directory shows CJC1295 with DAC out of stock, Kisspeptin coming soon; remove both, and BAC water explicitly excluded. Pinealon/Epitalon not listed at Aurum and not among owner four, so removed. Other supplier listings available; all multi-size selections checked. 23 products / 31 sizes remain; prices unchanged. Hero retains six existing active original compounds. Removed products disappear from catalog, generated routes, recommendations and COA library and are rejected by cart/checkout. Snapshot only, no automatic stock sync; local only.
