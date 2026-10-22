# Next Steps

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


- Preserve all original vial photos per the October 20 correction; do not implement the earlier image-replacement recommendation.

- Review the October 20 local-only cleanup at http://127.0.0.1:3015. Nothing is committed, pushed, or deployed.
- Confirm actual TB-500 sequence and KLOW/Wolverine per-component amounts before completing audit items 9–10. KLOW supplier descriptions conflict.
- Owner deferred audit items 6, 7, 8, 11, 13, 15, 16: broader COA wording/mapping, testing claims, sterility/storage/shelf life, publication naming, purchaser review operations, commercial promises, and policies. Keep those unchanged until authorized. Four Lumira/Peptaura link overrides are the approved exception.

- Reconnect existing hosting to the company homebase, `SaltNPepLabs/SaltNPepWebsite` on `main`, when ready to deploy from the new repository. Preserve the static site's `out/` publish directory and the separate checkout API's environment/persistent disk. Source migration alone does not change hosting connections.

- Create a PostHog project and configure the matching public build-time project key/host and separate API ingestion key/host using `docs/ANALYTICS.md`; analytics remains disabled until configured. Add an accurate analytics line to the privacy policy before launch and review any launch-region consent requirements. Verify the browser funnel and a provider test-mode paid-order event in the same project before relying on the conversion dashboard.

- Review the full Aurum catalog snapshot at http://127.0.0.1:3016/products: 26 source listings and 38 available sizes, with Pinealon/Epitalon retained. The October 11 owner request supplies replacement source prices and supersedes the former pending-price/limited-size instructions for Aurum products. Recheck the source before future price updates; this is a dated manual snapshot, not a live feed. Source prices, IDs, and certificate coverage are in `docs/PRODUCT_SIZES.md`.
- Homepage carousel UX is explicitly NOT APPROVED by the owner. Review the new springier iteration at http://127.0.0.1:3016/: vials follow horizontal drags directly, flicks snap with velocity-aware springs, and arrows/selectors respond immediately during animation. Desktop controls now fit within the hero, with larger mobile arrows. Continue iterating from owner feedback on bounce, responsiveness, and carousel behavior. Component libraries are owner-authorized when helpful; this iteration adds Motion. Technical verification does not imply UX approval.
- Owner review of the simplified collection at http://localhost:3015/products: compact heading, product photography, and concise product details on ivory replace the banner and dense dark card panels.
- Owner review of the relevance-selected research library at http://127.0.0.1:3016/science: 1,448 compound-focused entries from 2,606 raw PubMed search matches through October 4, 2026. Click any paper title or Read summary to open its reader: 124 provide detailed explanations, while other papers show a brief source excerpt or missing/review-required abstract notice and full-source link. Search, filters, page, and expanded-note return are preserved. Each publication shows why it was included; general peptide policy/commentary and unrelated alias matches are excluded. Direct safety, negative, and preparation-analysis findings remain. Future expansion should review relevant exclusions and check each original source before adding detailed explanations; short excerpts are not full study appraisals. Rebuild the static preview after edits. Refresh with `python scripts/refresh-research-catalog.py`; source corrections/retractions, excerpt checks, and the relevance gate apply on every refresh. Use `--from-cache` to re-screen saved sources without claiming a new source-check date.
- Customer reviews are no longer published. Preserve the archived source internally; do not restore personal-use testimonials.
- Review the 20 activated catalog additions at http://127.0.0.1:3016/products. They have source sizes, prices, checkout support, and original labeled vial illustrations. Matching product artwork is now added locally; review the new 20-product image sets and confirm specifications separately. Naming and source mappings are in `docs/UPCOMING_COLLECTION.md`.
- Match certificate reports to actual inventory batches before claiming stock verification. Aurum reports cover only their named samples and sizes; Melanotan I, SS-31, ARA-290, Wolverine, Cagrilintide, and Kisspeptin have no current published certificate. Pinealon/Epitalon retain Lumira examples; replace those only with confirmed inventory records. Review certificate sections on the product pages.
- Configure and deploy the separate checkout API following `docs/CHECKOUT.md`; supply the approved merchant account, Venmo business handle, support email, shipping states/charge, and tax policy. Complete provider test-mode end-to-end payment and desktop/mobile checkout review before enabling live payments. Real credentials and deployment remain pending.
- Before a sales launch, verify existing product/quality/shipping claims, actual inventory/batch reports, research eligibility review, and shipping/refund operations. Checkout does not automate email, stock, fulfillment, extra sales tax, or refunds.

The previous brass-theme review, reusable card extraction, and cart focus tasks are superseded or completed by the 2026-09-21 revamp; historical direction remains in DECISIONS.md and WORKLOG.md.


## October 20 — 11 a.m. delivery cutoff and policy preparation
Owner specifies Mountain Time cutoff: before 11 a.m., Utah County delivery next day; at/after 11 a.m., two days later. Free shipping elsewhere; nonlocal dispatch wording ambiguous (same-day before cutoff versus next-day), clarification requested. Weekend/holiday service, refund/cancellation/damage rules, guarantee remedy and legal entity/address also requested and unanswered. Do not activate guarantee or call policies final until resolved. Real timezone-aware countdown replaces the resetting sample timer, shows next cutoff after 11 and handles DST. No booked delivery date is shown while service days remain pending. Policy page expanded with confirmed terms and explicit remaining gaps. Checkout expressly deferred. Owner confirms TB-500 identity, blend compositions and business/product details are accurate; do not repeatedly characterize them as unconfirmed, and do not invent missing specifications. No push/deployment.


### Confirmed follow-up — seven-day schedule and delegated policy choices
Owner confirmed all seven days, holidays may vary, and nonlocal dispatch NEXT DAY before 11 a.m. or TWO DAYS LATER at/after cutoff (not same-day). Carrier transit additional. Owner delegated simple customer-convenient policy choices: free cancellation pre-dispatch; no change-of-mind returns post-dispatch; replacement/refund for confirmed damaged/incorrect/missing items, preferably reported within seven days (not a rights cutoff); seller-paid return if needed for seller error; refunds initiated within five business days. Local missed-date remedy is 10% affected-item refund or full refund for canceled undelivered order. Timing begins once paid/research-approved, date confirmed at acceptance. Incorrect customer address/access excluded; holidays disclosed before ordering. Checkout unchanged/deferred. Tailored policies on /policies; privacy provider/retention particulars and legal business mailing details still needed before actual service launch. Live Mountain Time countdown with 11:00 exact boundary/DST/year rollover tests. No publishing. Supersedes the immediately preceding pending-schedule notes.
