import catalog from "./aurum-catalog-data.json";

// Owner-requested snapshot of Aurum's live size selectors, October 11, 2026.
// Explicit USD per-vial prices; promotions and supplier inventory are separate.
// Sources, pricing precedence, and certificate scope: docs/PRODUCT_SIZES.md.
// Owner-confirmed selling sizes, October 21, 2026. Keep the supplier snapshot intact.
const sellingSizes: Record<string, string> = {
  "bpc-157": "10mg", "tb-500": "10mg", retatrutide: "30mg", "mots-c": "10mg",
};
// Live supplier check October 22, 2026; manual snapshot, not live inventory sync.
const excluded = new Set(["kisspeptin", "bacteriostatic-water", "cjc-1295-dac"]);
export const aurumCatalog = catalog.filter(product => !excluded.has(product.slug)).map(product => ({
  ...product,
  variants: sellingSizes[product.slug]
    ? product.variants.filter(variant => variant.dosage === sellingSizes[product.slug])
    : product.variants,
}));
export const aurumCertificateDirectory = "https://aurumpeptidelabs.com/coas";

export function getAurumProduct(slug: string) {
  return aurumCatalog.find(product => product.slug === slug);
}

export function aurumQuantityPricing(price: number) {
  return [1, 3, 5, 10].map(qty => ({ qty, price }));
}
