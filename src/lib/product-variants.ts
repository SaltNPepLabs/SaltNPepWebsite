import type { Product } from "./products";
import { aurumQuantityPricing, getAurumProduct } from "./aurum-catalog";

export interface ProductVariant {
  id: string;
  dosage: string;
  inStock: boolean;
  price: number | null;
  bulkPricing: Product["bulkPricing"];
}

// Preserve existing stock only for compounds outside Aurum's catalog.
const retainedSizes: Record<string, readonly string[]> = {
  pinealon: ["5mg", "10mg", "20mg"], epitalon: ["10mg", "50mg"],
};

// Requests saved before size IDs existed must keep their original vial size.
const legacyDosages: Record<string, string> = {
  "bpc-157": "5mg", retatrutide: "5mg", "tb-500": "5mg", "mt-2": "10mg",
  "mots-c": "10mg", pinealon: "10mg", epitalon: "10mg", "ghk-cu": "50mg",
};

export function getProductVariants(product: Product): ProductVariant[] {
  const source = getAurumProduct(product.slug);
  if (source) return source.variants.map(variant => ({
    id: variant.dosage, dosage: variant.dosage, inStock: true,
    price: variant.price, bulkPricing: aurumQuantityPricing(variant.price),
  }));
  return (retainedSizes[product.slug] ?? [product.dosage]).map(dosage => ({
    id: dosage,
    dosage,
    inStock: dosage === product.dosage,
    price: dosage === product.dosage ? product.price : null,
    bulkPricing: dosage === product.dosage ? product.bulkPricing : [],
  }));
}

export function getAvailableProductVariants(product: Product): ProductVariant[] {
  return getProductVariants(product).filter(variant => variant.inStock);
}

export function getStorefrontProductVariants(product: Product): ProductVariant[] {
  return getProductVariants(product);
}

export function getDefaultProductVariant(product: Product): ProductVariant {
  const variants = getProductVariants(product);
  return variants.find(variant => variant.inStock && variant.id === product.dosage)
    ?? variants.find(variant => variant.inStock)
    ?? variants[0];
}

export function getProductVariant(product: Product, variantId?: string): ProductVariant | undefined {
  const dosage = variantId === undefined ? legacyDosages[product.slug] ?? product.dosage : variantId;
  return getProductVariants(product).find(variant => variant.id === dosage);
}

export function getVariantUnitPrice(variant: ProductVariant, quantity: number): number | null {
  if (!variant.inStock || variant.price === null || !Number.isInteger(quantity) || quantity < 1 || quantity > 100) return null;
  const tier = [...variant.bulkPricing].sort((a, b) => b.qty - a.qty).find(tier => quantity >= tier.qty);
  return tier?.price ?? variant.price;
}

export function formatDosage(dosage: string): string {
  return dosage.replace(/(mg|mL)$/, " $1");
}
