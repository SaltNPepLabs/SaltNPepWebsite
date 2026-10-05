# GLP-3 catalog naming

The owner requested GLP-3 in place of the former compound name throughout the public website. GLP-3 is a catalog label for LY-3437943; it is not presented as an official scientific name. Product, research, FAQ, customer-review, cart, and saved-order presentation use the catalog wording. Public routes are `/products/glp-3`, `/science/glp-3`, and `/science/glp-3/[pmid]`.

`src/lib/catalog-naming.ts` adapts the public copy. Existing internal compound IDs remain stable for variants, batch lookup, saved carts, and immutable orders. Canonical research snapshots, downloaded-source fingerprints, original review records, and exact PubMed search queries retain their original wording. Source refresh and relevance selection continue to use the scientific name and aliases rather than the catalog label.

Research collection and reader pages explain the naming adaptation. Changed abstract passages are labeled adapted excerpts and displayed without quotation marks or a blockquote; unmodified passages keep their exact-quotation presentation. Study selection, findings, limitations, publication identifiers, and original source links are preserved. External publications and reports retain their publishers' wording.

## Product photos

The built-in imagegen tool edited the two existing photos, using text-localization mode with each original as its reference. Visually checked replacement assets are:

- `public/images/GLP-3-10mg.png`: full studio product photo, opaque background.
- `public/images/vials/glp-3.png`: isolated vial with transparent background.

Both edits used this instruction, with the final background constraint matching the reference:

> Use case: text-localization. Edit target: supplied existing peptide product photo. Replace only printed compound name “Retatrutide” with exact “GLP-3”. Preserve black sans-serif font style, label design, “10 MG”, “FOR RESEARCH USE ONLY”, vial/cap/reflections/texture/lighting/composition/framing/aspect. Center readable same region. No other words/marks/objects. Preserve the transparent cutout background / preserve the opaque studio background and pedestal.

The superseded public photos were removed. Photos remain illustrative: the printed 10 MG is preserved from the reference, while the owner-selected current catalog size remains 30 mg with Pricing pending.

## Verification

Run the standard lint, checkout tests, production build, research export audit, and static preview tests. The naming package also checks every exported page for the former name in public text and links, and verifies GLP-3 catalog search, all customer-review pages, study readers, source links, return-state preservation, imagery, and 320px layouts. Local evidence is retained in ignored `data/glp3-*` and `data/check-glp3-naming.mjs`.
