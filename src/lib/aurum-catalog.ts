import catalog from "./aurum-catalog-data.json";

// Owner-requested snapshot of Aurum's live size selectors, October 11, 2026.
// Explicit USD per-vial prices; promotions and supplier inventory are separate.
// Sources, pricing precedence, and certificate scope: docs/PRODUCT_SIZES.md.
export const aurumCatalog = catalog;
export const aurumCertificateDirectory = "https://aurumpeptidelabs.com/coas";

export function getAurumProduct(slug: string) {
  return aurumCatalog.find(product => product.slug === slug);
}

export function aurumQuantityPricing(price: number) {
  return [1, 3, 5, 10].map(qty => ({ qty, price }));
}
