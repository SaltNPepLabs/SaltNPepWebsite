# Decisions

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


## 2026-10-20: Local research-only copy cleanup (not published)

Owner authorized audit items 1–5, 9, 10, 12, 14, and 17. Explicitly deferred 6, 7, 8, 11, 13, 15, and 16. The sole certificate exception is routing BPC-157, GLP-3, TB-500, and MOTS-c to the existing Lumira/Peptaura reports instead of Aurum. The owner states supplier COAs cover sold inventory; broad certificate wording, quality claims, and the recorded GLP-3 lot discrepancy remain deferred. Do not push or deploy without explicit approval.

Customer testimonials and ratings are removed from the application; the 200-record source is preserved unchanged in docs/archive/customer-reviews-data.json. Original eight products now use neutral identity/form descriptions, no outcome lists, promotional mechanism descriptions, or unused safety/steroid claims. FAQ steroid/legality assurances and product benefit summaries are removed. Research-library content, scientific-review panels, and GLP-3 publication naming remain unchanged.

TB-500's unsupported full-length equivalence and associated formula/mass/CAS fields are withheld pending an inventory-specific identity specification. KLOW/Wolverine composition still requires owner confirmation; Aurum's current KLOW page contradicts itself (opening lists GHK-Cu/KPV/TB-500/BPC-157, other sections list larazotide/orexin-A). Do not guess a formula.

Purchase-adjacent notices, cart/footer/home and entry gate now explicitly prohibit personal use or administration to humans/animals. Entry acceptance key is v2 so the revised statement is reconfirmed once. Checkout verification logic is unchanged. Fixed-size photographs are replaced in the UI with the existing size-neutral CSS vial illustration; original artwork remains preserved. No pricing, size availability, payment behavior, storage/reconstitution, quality, shipping or policy changes were authorized.


## 2026-10-12: Company repository homebase

The owner designated `https://github.com/SaltNPepLabs/SaltNPepWebsite` as the new homebase. Preserve the existing Git history and completed local work, use `main` with the company repository as `origin`, and retain the previous personal repository locally as `legacy`. Keep the existing Windows workspace path so local setup remains usable. Hosting reconnection is separate from this source migration; preserve the static export and separate checkout API deployment contracts.

## 2026-10-11: Remember entry confirmation across visits

The owner requested saving the entry agreement so visitors do not repeatedly confirm it. This supersedes the session-only policy below. Save acceptance in versioned local storage without automatic expiry, scoped to the browser profile and site origin. Carry existing session confirmations forward and synchronize acceptance across open tabs. Fall back to session storage, then memory, when storage is unavailable. Preserve the required first-visit checkboxes, static export, and accessible modal behavior. See `SITE_ENTRY.md` for persistence limits and verification.

## 2026-10-11: Aurum catalog, prices, availability, and certificates

The owner requests copying Aurum Peptide Labs' full catalog/prices, removing sold-out banners on its products, and linking its certificates. This supersedes earlier pending-price, stock-selection, and preview-only instructions for Aurum products. Import all 26 listings and 38 available sizes; activate the 20 previews. Preserve Pinealon/Epitalon, the original eight homepage features, stable checkout identities, and public GLP-3 naming.

Store explicit source selector prices in USD. Use those per-vial prices at all existing quantity choices without inventing bulk discounts or copying promotions. Preserve legacy size identities and immutable orders; reject removed sizes instead of substituting another. Retain original research-only copy and use original labeled vial illustrations for new entries; do not invent scientific specifications or copy competitor imagery.

Link 25 current Aurum PDF reports with publisher attribution and tested-sample labels, excluding six archives. Explicitly show missing reports for six products and link the source directory. Do not imply these reports verify local inventory or every offered size. Pinealon/Epitalon retain labeled Lumira examples. Sources checked October 11, 2026; details are in PRODUCT_SIZES.md and UPCOMING_COLLECTION.md.


## 2026-10-11: Springier homepage and library permission

The owner says the homepage needs to feel bouncier, springier, and more responsive, and explicitly states that the carousel UX is not approved yet. Continue iterating on the interaction and responsive layout; technical checks do not constitute UX acceptance. The owner authorizes adding component libraries when they make the work easier. This iteration uses the free Motion package for spring physics, direct dragging, and control feedback while preserving the current SALT N’ PEP design.

## 2026-10-04: GLP-3 public catalog naming

The owner requested removing the former compound name from public website copy and using GLP-3. Use GLP-3 as a disclosed catalog label for LY-3437943 across product/research pages, public routes, reviews, saved-order display, and vial photos. Preserve canonical publication records, exact scientific search queries, source fingerprints, and stable checkout identities. Label adapted study wording clearly and present changed source passages as adapted excerpts rather than exact quotations. External source publications retain their publishers' wording. Implementation and photo-edit prompts are in `CATALOG_NAMING.md`.

## 2026-10-04: Remove reviews mentioning demo

The owner requested removal of any review containing "demo." Remove the entire matching record, checking every text field case-insensitively, and recompute product totals. This removes 59 of the 259 imported records, leaving 200 unchanged reviews. This supersedes retaining the complete original import; original dates on retained reviews remain hidden pending owner corrections.

## 2026-10-04: Limited sold-out size alternatives

The owner's follow-up requests one or two additional sizes for every current compound, labeled Sold out. This supersedes the single-size-only public display below. Show two alternatives for BPC-157, retatrutide, TB-500, MOTS-c, and Pinealon, and one for MT-2, Epitalon, and GHK-Cu: 13 sold-out alternatives alongside eight current sizes. MT-2 5 mg is an unavailable display addition, not part of the earlier supplier snapshot or a claim of stock. Keep the other 11 reference sizes hidden. The shared storefront variant helper controls cards and selectors without changing checkout's full size definitions.

Preserve the owner's current stock selections and approved original pricing. BPC-157 10 mg, retatrutide 30 mg, TB-500 10 mg, and MOTS-c 20 mg remain Pricing pending until the owner confirms prices and tiers. Sold-out choices remain inspectable with purchase disabled and quantity prices hidden. Cart restoration and authoritative pricing reject every unavailable size without substitution.

## 2026-10-04: Current sizes only for the test run

The owner wants the test-run catalog to show only sizes currently carried, removing the extra sizes and empty-stock appearance. Show one size per compound: BPC-157 10 mg, retatrutide 30 mg, TB-500 10 mg, MOTS-c 20 mg, and the original catalog sizes for MT-2 (10 mg), Pinealon (10 mg), Epitalon (10 mg), and GHK-Cu (50 mg). This supersedes the earlier instruction to display the supplier's entire range and sold-out size lists. The separate Coming soon compound previews remain as requested.

Keep the 31 supplier reference definitions internally; offer only the eight current sizes and mark all 23 other sizes unavailable. Collection cards and product selectors hide those extras. Cart restoration and authoritative pricing continue to reject them without substituting a size. Keep original prices/bulk tiers for the four unchanged compounds; the four owner-selected sizes remain Pricing pending until prices are approved.

## 2026-10-04: Owner-selected stock sizes

The owner sells only BPC-157 10 mg, retatrutide 30 mg, TB-500 10 mg, and MOTS-c 20 mg among those four compounds' listed sizes. Mark their other 19 sizes Sold out. Keep stock separate from pricing: the previous instruction to await new-size prices still applies, and the four available sizes remain Pricing pending until the owner supplies prices or explicitly approves transferring existing prices and bulk tiers. The other four compounds retain existing availability/pricing. This supersedes the earlier pending-only status of these 19 sizes.

Default collection cards, carousel details, and selectors to an available size. Sold-out choices stay visible and selectable for inspection, with ordering disabled. Reject sold-out lines in browser cart creation, saved-cart restoration, the checkout demo, and authoritative API pricing. Legacy requests without size IDs still resolve to their original size; drop/reject a sold-out line rather than silently substituting a new vial size. Preserve immutable existing order snapshots.

## 2026-10-04: Required entry confirmation

The owner requested entry confirmation of being over 21 and understanding that these are research compounds. Require both unchecked statements before any storefront route becomes interactive. Remember acceptance for the current tab session, including navigation and reloads; ask again in a fresh session. When browser storage is unavailable, keep acceptance in memory during app navigation. Preserve static export by rendering the form and inert storefront in initial HTML, then using a native modal for keyboard and background interaction control. See `SITE_ENTRY.md` for behavior and verification.

## 2026-10-04: Peptaura size ranges with owner pricing

The owner requested the Peptaura size range for each of the eight currently sold compounds and will provide new-size prices later. Keep the original size prices and bulk tiers, and display all 23 additional sizes as Pricing pending. Pending sizes are selectable for inspection, with quantity prices hidden and purchase disabled. Never infer prices from milligrams or import marketplace prices. Source links and the October 4 snapshot of 31 sizes are in `PRODUCT_SIZES.md`; Peptaura's multi-vendor listing does not establish owner inventory or batch coverage.

Use compound-and-size identity in cart lines, storage, checkout requests, order snapshots, and payment descriptions. Omitted size IDs in old carts/requests resolve to the original catalog size; explicit invalid IDs never fall back to that price. Reject unpriced, unknown, and duplicate compound/size requests at the API with actionable client errors. Keep the 20 upcoming compound previews separate. Existing lab reports remain scoped to their tested samples rather than all sizes.

## 2026-10-04: Coming soon collection previews

The owner requested more collection options using Aurum Peptide Labs' catalog. Add the 20 missing entries as Coming soon previews with search/category/availability filtering. Keep upcoming records separate from the purchasable catalog so they do not enter the cart, checkout pricing, homepage carousel, or product routes. Show neutral placeholders until owner images are supplied; leave pricing and specifications unset. Source names, overlap mapping, and launch requirements are recorded in `UPCOMING_COLLECTION.md`.

## 2026-06-16: Dark Industrial Visual System

The site moved from a light clinical theme to a dark industrial-luxury direction. The design uses graphite/black surfaces, brass primary accents, condensed uppercase typography via Oswald, dark panel utilities, and desaturated product imagery.

Reason: the requested brand direction was darker, sexier, more masculine, and mobile-friendly. Shared CSS utilities (`dark-panel`, `metal-panel`, `product-card`, `btn-primary`, `btn-ghost`) keep route surfaces consistent and reduce scattered light styling.

## 2026-06-16: Local Dev Uses Webpack

Run the dev server with `npm run dev -- --webpack` on this Windows machine.

Reason: `next dev` defaults to Turbopack in this project and previously produced Windows worker panics while the HTTP server stopped responding. The webpack dev backend served the app reliably.

## 2026-06-16: Render Static Site Export

The project is configured for static export with `output: "export"` and unoptimized `next/image` output.

Reason: Render Static Site publishing needs a directory of static files. `next build` now emits `out/`, which should be used as the Render publish directory.

## 2026-09-21: SALT N’ PEP visual identity

The owner requested a full revamp using their black/ivory vial reference and explicitly confirmed SALT N’ PEP as the brand. This supersedes the graphite/brass direction. Use the supplied local hero image, neutral CSS packaging illustrations, warm ivory surfaces, charcoal controls, and editorial serif accents. Preserve static export and research-only product scope.

## 2026-10-03: Reviewed checkout with separate payment API

Preserve the Render static export and run payments in a separate Node 24 service with a persistent SQLite disk. Use hosted Stripe Checkout for approved research orders and authorized Venmo business payments with manual transaction verification. The server owns catalog pricing; provider verification owns paid status. Orders require institution/purpose review before payment. Browser access is stored per order, with audited staff recovery. Live checkout stays disabled until shipping, support, tax treatment, and merchant configuration are supplied. See CHECKOUT.md for operational limits.

## 2026-10-03: Lighter collection browsing

The owner approved removing the collection banner/photo and dense dark product panels. Use a compact heading followed by filters, preserve product photography, and place concise names, prices, dosage, and category on the ivory page. The whole card links to product details with visible hover/focus feedback; avoid duplicate arrows and View compound links. Shared homepage cards follow the same treatment.

## 2026-10-03: Research library first

The owner approved replacing the editorial research hero and reading-room panel with a compact Research library heading, search and compound/evidence filters, and immediately visible papers. Keep study limitations alongside findings; move the evidence-reading guide into a compact disclosure below results. Use the collection's ivory palette and restrained sans-serif hierarchy.

## 2026-10-03: Compound study pages

The owner requested clicking into studies for each compound. Library cards and product scientific-review links open a statically exported /science/[slug] page. Keep full findings, limitations, models, and original publication links together on that page; the index uses concise summaries. The existing curated list contains one selected primary paper per compound and does not imply comprehensive coverage.

## 2026-10-03: Expanded reading lists and built UX preview

The owner reported slow page loads and insufficient studies. Expand the curated list to 26 verified primary papers, with one index card per compound and newest-first reading lists with anchor navigation. Distinguish human observations from administration trials and related thymosin beta4 papers from TB-500 equivalence. Keep detailed notes on statically exported pages and send only search metadata to the client. Coverage remains explicitly curated rather than comprehensive.

First visits on the local development server were delayed by route compilation and static parameter generation. Use a loopback-only server for the built out/ export on port 3016 for UX review. Keep the development-only credential-free checkout demo on port 3015; do not enable demo behavior in production builds.


## 2026-10-04: Topic-led study cards

The owner rejected the narrow bibliography rows. Compound pages use a wider two-column desktop card grid, leading with a readable research topic, then model, year, evidence type, and original paper title. Native disclosures expand across the grid for findings, limitations, and source links already in static HTML; mobile uses one column. Extend coverage with verified primary papers without adding duplicate citations merely to equalize compound counts.

## 2026-10-04: Product carousel as the homepage hero

The owner wants to browse the peptides in the main homepage image, rather than a carousel below the hero, and supplied https://aurumpeptidelabs.com/ as a composition reference. Feature all eight compounds in a centered hero carousel with smaller neighboring product images, manual navigation, and a matching product link. Remove the lower repeated peptide section at the owner's request. Preserve SALT N’ PEP's ivory/charcoal identity, illustrative-photo labeling, and research-only positioning.

## 2026-10-04: Complete PubMed search index and explained studies

The owner requested both more papers beyond the 13–20 selected per compound and detailed explanations. Preserve the selected reading list and add a full date-bounded PubMed name/alias search index, with every result reachable through search, filters, sorting, and pagination. The current snapshot has 2,606 compound/publication matches (2,575 unique PMIDs); all 124 selected papers receive source-verified design, measurements, and results context. Distinguish indexed publications from editorial explanations, and never equate publication counts with independent trials or universal literature coverage.

Publish bibliographic/indexing metadata and original-source links, keeping downloaded abstracts in ignored local data. Disclose exact queries, cutoff, and collection date. Refresh all records so newly indexed corrections/retractions are included; fail instead of silently publishing incomplete searches. Retraction/correction notices take category priority, while mixed letter/case-report and letter/review records retain their substantive filter category. Preserve static export, native accessible disclosures, the current ivory design, and the parent thymosin beta4/TB-500 distinction.

## 2026-10-04: Owner-supplied static customer reviews

Import the owner's reviews JSON unchanged and match records to product slugs. Preserve author text, ratings, and verification status; use rating filters and six-record pagination within the existing ivory design. All 259 supplied reviews are unverified. The owner will provide corrected dates later, so retain original dates only in the source file and omit them from public page data and display. Keep customer accounts distinct from scientific evidence and preserve static export; new review submission remains a separate future workflow.

## 2026-10-04: Compound relevance before publication

The owner rejected broad unregulated-peptide articles as weak reasons to populate individual compound collections. This supersedes automatic publication of every PubMed name/alias match. Keep complete raw searches locally, then publish title-focused compound papers and explicitly source-reviewed exceptions. General peptide policy/commentary, incidental mentions, unrelated longer amino-acid sequences, and non-biomedical uses do not qualify automatically. Ambiguous preparations require review: free GHK is not GHK-Cu, and parent/engineered thymosin beta4 is not proof about a TB-500 fragment.

Use one shared screening module and a versioned inclusion/exclusion policy for both online and cached refreshes. Display a relevance reason per paper and the selected/raw counts, preserving broader search links and source-check dates. Apply the same criteria to benefit, negative, safety, and analytical findings; retain compound-specific case reports even when their titles mention unregulated use. Title relevance is not study quality, and unmatched broader titles may contain relevant research awaiting review. Never describe the selected collection as all literature or an evidence-quality assessment. Preserve the 124 detailed explanations and indexing notices.

## 2026-10-04: A reading page for every selected publication

The owner requested clicking any study to reach a conclusion or summary. Export a `/science/[slug]/[pmid]` reader for every relevance-selected entry, using the full existing explanation when one is available. Other readers provide a short exact abstract quotation and direct full-source link, rather than inferred medical conclusions. Cap quotes at 25 words, identify the source section and sentence position, and mark truncated sentences. Only explicit conclusion/interpretation headings qualify for the conclusion label. Missing abstracts and excerpts requiring source review remain transparent; withdrawal and retraction status must be prominent.

Generate quotations reproducibly from the privately cached sources during bibliography refresh, preserving the source-check date and full-abstract fingerprint. Source-reviewed passage exceptions must still match the original text or refresh fails. Keep browse state in the URL so search, filters, page, reading view, and expanded PMID/PMCID notes survive the reader round trip. Full abstracts remain outside the public snapshot, and the reader never bypasses the compound relevance selection.

## 2026-10-20: Restore original vial imagery

Owner explicitly requires keeping every original peptide photograph, including isolated homepage/collection vials and product photos on rocks. Restored all 16 original files to public/images and restored the original ProductVial component and styles byte-for-byte. Restored original illustrative-photo captions. This supersedes the earlier size-neutral illustration change; do not replace or edit vial artwork without a new explicit request. Approved text, testimonial removal, research notices, and four Lumira/Peptaura COA overrides remain unchanged. Local only; no push or deployment.

## 2026-10-20: Complete matching catalog artwork (local only)

Owner requested matching isolated vials and unique rock settings for all 20 additions. Added 47 imagegen PNGs in public/images/catalog: 20 transparent default-size vials, 20 distinct default-size rock scenes, and seven alternate-size rock images. All labels use catalog names/amounts, including water in mL. Product-image mapping now covers all 28 collection defaults and all 43 detail-page sizes. Original eight product artworks and previous size corrections are preserved. No pricing, stock, copy, checkout, Git publication or deployment changes. Full prompts and asset paths: CATALOG_IMAGE_PROMPTS.json.


## October 20 — 11 a.m. delivery cutoff and policy preparation
Owner specifies Mountain Time cutoff: before 11 a.m., Utah County delivery next day; at/after 11 a.m., two days later. Free shipping elsewhere; nonlocal dispatch wording ambiguous (same-day before cutoff versus next-day), clarification requested. Weekend/holiday service, refund/cancellation/damage rules, guarantee remedy and legal entity/address also requested and unanswered. Do not activate guarantee or call policies final until resolved. Real timezone-aware countdown replaces the resetting sample timer, shows next cutoff after 11 and handles DST. No booked delivery date is shown while service days remain pending. Policy page expanded with confirmed terms and explicit remaining gaps. Checkout expressly deferred. Owner confirms TB-500 identity, blend compositions and business/product details are accurate; do not repeatedly characterize them as unconfirmed, and do not invent missing specifications. No push/deployment.


### Confirmed follow-up — seven-day schedule and delegated policy choices
Owner confirmed all seven days, holidays may vary, and nonlocal dispatch NEXT DAY before 11 a.m. or TWO DAYS LATER at/after cutoff (not same-day). Carrier transit additional. Owner delegated simple customer-convenient policy choices: free cancellation pre-dispatch; no change-of-mind returns post-dispatch; replacement/refund for confirmed damaged/incorrect/missing items, preferably reported within seven days (not a rights cutoff); seller-paid return if needed for seller error; refunds initiated within five business days. Local missed-date remedy is 10% affected-item refund or full refund for canceled undelivered order. Timing begins once paid/research-approved, date confirmed at acceptance. Incorrect customer address/access excluded; holidays disclosed before ordering. Checkout unchanged/deferred. Tailored policies on /policies; privacy provider/retention particulars and legal business mailing details still needed before actual service launch. Live Mountain Time countdown with 11:00 exact boundary/DST/year rollover tests. No publishing. Supersedes the immediately preceding pending-schedule notes.


Owner rejects the Local Previews strip above page content. Do not restore a global demo navigation bar. Retain feature-specific demo disclosures.


## Chroma-inspired inner-page refinement
Owner wants clean feel of chromacoatingsutah.com with homepage unchanged. Visually inspected Chroma home/About: restrained typography, generous spacing, rounded cards and muted accents. Applied centered service-page introductions, calmer typography, softer borders/corners, more spacing, refined catalog cards, product controls and COA panels in existing ivory/charcoal palette. No Chroma copy/assets imported. Home page, home CSS and carousel hashes unchanged; global refinements scoped to non-home routes. Images, prices, policy terms and service functionality unchanged. Lint/build passed; desktop Contact and mobile product page visually checked, COA page has no horizontal overflow at 390px. Local only; no commit/push/deploy.


## Luxury revision after owner feedback
Owner found the first clean pass insufficiently luxurious. Inner pages now use charcoal/olive-black surfaces, warm ivory type, restrained brass accents and finer, squarer borders. Contact rebuilt as stone-vial photography beside a service desk with prominent email and simple link rows, plus a serif accent. Existing GHK-Cu photograph reused unchanged; no invented service claims. Global palette explicitly excludes homepage; home source and carousel preserved. Pricing/checkout/policies unchanged. Local only. Lint/build passed and desktop Contact visually verified.


## 2026-10-20 — Hero-led homepage expansion
The existing hero composition, assets, carousel code and animation timing are protected. New homepage content lives in HomeStory with scoped styling; the collection retains isolated vial imagery while homepage showcases use existing rock photos. Homepage documentation means COAs, not the retired research-publication library. Delivery continues to use the confirmed 11 a.m. Mountain cutoff.

## 2026-10-20 — Simple storefront supersedes editorial homepage
Owner rejected long editorial sections and decorative copy. Homepage order is protected hero, short shipping/documentation strip, one isolated-vial product section, concise why-choose-us, newsletter/footer. No rock photography below the homepage hero. Preserve original images elsewhere.

## 2026-10-20 — Salt-and-pepper brand palette
Owner requested a sitewide salt-and-pepper feel. Neutralized olive, beige and champagne UI colors to salt-white, charcoal and stone gray across homepage sections/footer, collection, service pages, product controls, cart, checkout and shared navigation. Preserved hero/carousel/vial component files and all image assets; no layout, product or fulfillment changes. Build and lint passed; protected file hashes verified and homepage/collection previews reviewed. Local only.

## 2026-10-20 — Hero image relighting approved
Owner approved relighting the vial artwork for the homepage hero after previous CSS lighting was too faint. Use public/images/hero-vials only in the hero; preserve original product/shop artwork. Side vials must remain opaque (blur handles depth) so background grains do not show through labels. Remove added foreground grains that overlap vials. Background and overall hero composition remain unchanged. This supersedes earlier requests to keep all hero vial pixels unchanged and to place particles in front of them.

- Hero airborne animation uses individual photographic sprites over cleaned background plates, replacing regional displacement. No particles overlay the vials; floor grains remain still. Original photographs remain fallback assets.

- Latest hero refinement permits only a handful of tiny near-plane grains away from labels (five desktop/three mobile), superseding the absolute no-foreground rule. Preserve existing background plates and vial assets; use faint shared airflow with individual depth variation rather than obvious independent bobbing. The floor and liquid remain stationary.

- Owner now requests ALL salt/pepper grains moving, including former wave/floor scatter. Use hero-clean desktop/mobile plates with no baked particles; animate scattering independently. This supersedes keeping floor grains static. Preserve original source assets for reversibility. Prompts and sources: HERO_FULLY_CLEAN_ASSETS.json.

## 2026-10-21 — Product certificate presentation
Owner requested a simpler report section inspired by Aurum. Use compact factual report summary and expandable metadata; avoid blanket claims that all supplier reports are examples or inventory is unverified, given owner's stated batch coverage. Do not extrapolate a tested size to other sizes or hide the recorded GLP-3 lot mismatch. Underlying source mapping remains unchanged.


## October 21 — owner sizes and Lumira document refresh (local only)
Confirmed GLP-3 30mg only, BPC-157/TB-500 10mg only. Filter storefront variants while preserving supplier snapshot; inherited existing size-specific prices. Removed sizes remain invalid for cart/checkout. Updated BPC10 and GLP3/30 supplier reports to August 10 BTLabs documents; preserve registry vs PDF lot distinctions and measured content (9.1mg; 25.2mg respectively). Do not claim inventory matching. Added MOTS40 supplier report as additional documentation; MOTS selling size remains 10/40 pending owner's uncertain 20mg statement. TB10/Pinealon10/Epitalon10 links retained as current size-specific reports found. GLP3 hero/gallery asset copied as glp-3-30mg.png; built-in imagegen prompt: change ONLY 10 MG to 30 MG, preserve vial, alpha, lighting, composition. Original preserved. No push/deployment.
