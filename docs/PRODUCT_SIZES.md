# Product sizes and Aurum catalog snapshot

The owner's October 11, 2026 request to copy Aurum Peptide Labs' catalog and prices and remove sold-out banners supersedes the earlier Peptaura references, limited size display, and pending-price instructions for Aurum products. All 26 Aurum listings (25 compounds/blends plus bacteriostatic water), with 38 size options, are now available in the local catalog. Pinealon and Epitalon are outside Aurum's catalog and retain their existing availability and prices. The full store has 28 products, 43 sizes, 40 available sizes, and three sold-out Pinealon/Epitalon alternatives.

## Source and prices

Checked October 11, 2026: [Aurum catalog](https://aurumpeptidelabs.com/compounds) and [certificate directory](https://aurumpeptidelabs.com/coas). Aurum's hydrated size selector is the price authority; some initial HTML prices differ. Explicit selector overrides take priority, otherwise the source's selector calculation supplies the displayed price. The local snapshot stores each resulting USD price explicitly in `src/lib/aurum-catalog-data.json`; it does not infer prices from milligrams or run a live supplier feed. Ignored extraction and verification evidence is under `data/aurum/`.

| Product | Size and USD price per vial | Source listing |
| --- | --- | --- |
| BPC-157 | 10mg: $49.99; 30mg: $139.99 | [bpc-157](https://aurumpeptidelabs.com/compounds/bpc-157) |
| TB-500 | 10mg: $64.99; 30mg: $184.99 | [tb-500](https://aurumpeptidelabs.com/compounds/tb-500) |
| GHK-Cu | 50mg: $39.99; 100mg: $49.99 | [ghk-cu](https://aurumpeptidelabs.com/compounds/ghk-cu) |
| Melanotan II | 10mg: $39.99 | [melanotan-ii](https://aurumpeptidelabs.com/compounds/melanotan-ii) |
| Melanotan I | 10mg: $39.99 | [melanotan-i](https://aurumpeptidelabs.com/compounds/melanotan-i) |
| Selank | 5mg: $44.99; 10mg: $64.99 | [selank](https://aurumpeptidelabs.com/compounds/selank) |
| Semax | 5mg: $44.99; 10mg: $64.99 | [semax](https://aurumpeptidelabs.com/compounds/semax) |
| CJC-1295 (with DAC) | 5mg: $59.99 | [cjc-1295](https://aurumpeptidelabs.com/compounds/cjc-1295) |
| CJC-1295 No DAC | 5mg: $54.99 | [cjc-1295-no-dac](https://aurumpeptidelabs.com/compounds/cjc-1295-no-dac) |
| Ipamorelin | 5mg: $49.99 | [ipamorelin](https://aurumpeptidelabs.com/compounds/ipamorelin) |
| IGF-1 LR3 | 1mg: $89.99 | [igf-1-lr3](https://aurumpeptidelabs.com/compounds/igf-1-lr3) |
| Tesamorelin | 5mg: $64.99; 10mg: $119.99; 20mg: $166.66 | [tesamorelin](https://aurumpeptidelabs.com/compounds/tesamorelin) |
| GLP-2 (TZ) | 10mg: $49.99; 30mg: $127.77 | [tirzepatide](https://aurumpeptidelabs.com/compounds/tirzepatide) |
| GLP-1 (SM) | 10mg: $59.99; 30mg: $169.99 | [semaglutide](https://aurumpeptidelabs.com/compounds/semaglutide) |
| GLP-3 (RT) | 10mg: $69.99; 30mg: $166.66 | [glp-3](https://aurumpeptidelabs.com/compounds/glp-3) |
| KPV | 10mg: $54.99; 30mg: $129.99 | [kpv](https://aurumpeptidelabs.com/compounds/kpv) |
| MOTS-c | 10mg: $69.99; 40mg: $149.99 | [mots-c](https://aurumpeptidelabs.com/compounds/mots-c) |
| Bacteriostatic Water | 10mL: $9.99 | [bac](https://aurumpeptidelabs.com/compounds/bac) |
| NAD+ | 500mg: $59.99 | [nad-plus](https://aurumpeptidelabs.com/compounds/nad-plus) |
| Glutathione | 1500mg: $74.99 | [glutathione](https://aurumpeptidelabs.com/compounds/glutathione) |
| KLOW | 80mg: $119.99 | [klow](https://aurumpeptidelabs.com/compounds/klow) |
| SS-31 | 10mg: $65.99 | [ss-31](https://aurumpeptidelabs.com/compounds/ss-31) |
| ARA-290 | 10mg: $74.99 | [ara-290](https://aurumpeptidelabs.com/compounds/ara-290) |
| Wolverine | 20mg: $89.99 | [wolverine](https://aurumpeptidelabs.com/compounds/wolverine) |
| Cagrilintide | 10mg: $89.99 | [cagrilintide](https://aurumpeptidelabs.com/compounds/cagrilintide) |
| Kisspeptin | 10mg: $49.99 | [kisspeptin-10](https://aurumpeptidelabs.com/compounds/kisspeptin-10) |

The existing public GLP-3 label and stable internal checkout identity are preserved. Source aliases are mapped explicitly in the snapshot. Imported sizes use the same per-vial price at quantities 1, 3, 5, and 10; no supplier promotions or unverified quantity discounts were copied.

## Retained products

Pinealon 10 mg remains $44.99 per vial, with existing quantity prices of $39.99 at 3, $35.99 at 5, and $31.99 at 10. Its 5 mg and 20 mg alternatives remain sold out. Epitalon 10 mg remains $29.99, with $26.99 at 3, $23.99 at 5, and $20.99 at 10; its 50 mg alternative remains sold out. These products are not sold by Aurum in the checked catalog, so the request does not supply replacement prices or stock instructions for them.

## Ordering and compatibility

`src/lib/product-variants.ts` exposes all source sizes and defaults each imported product to its first source size. Cards, selectors, browser cart, checkout demo, and authoritative server share that catalog. Size labels distinguish mg from mL. Legacy size identities remain stable; old BPC-157, GLP-3, and TB-500 5 mg requests are rejected because those original sizes are absent from this source. No unavailable or removed size is silently replaced. Server totals ignore client-supplied prices, reject unknown/unavailable sizes, and preserve immutable existing order snapshots.

`npm test` independently checks all 38 source sizes at each offered quantity, legacy identity handling, retained stock restrictions, cart/server totals, and hosted card-payment line pricing.

## Certificates of analysis

Twenty-five current PDF certificates cover 20 Aurum products. Every linked document returned HTTP 200 with a PDF signature when checked October 11, 2026. Six archived entries are excluded. No current certificate is published for Melanotan I, SS-31, ARA-290, Wolverine, Cagrilintide, or Kisspeptin; those pages say so and link the directory.

Reports retain Aurum attribution and the sample-size labels in its directory. For example, BPC-157's report is for 10 mg and MOTS-c's report is for 40 mg; neither is relabeled to cover an unlisted size. The reports do not verify SALT N’ PEP inventory. Pinealon and Epitalon retain the labeled Lumira example reports. Match actual inventory batches before claiming stock verification.
