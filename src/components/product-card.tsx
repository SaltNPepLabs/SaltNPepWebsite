import Link from "next/link";
import { formatPrice, type Product } from "@/lib/products";
import { catalogSlug } from "@/lib/catalog-naming";
import { formatDosage, getDefaultProductVariant, getStorefrontProductVariants } from "@/lib/product-variants";
import collection from "./collection-card.module.css";
import styles from "./product-card.module.css";
import { ProductVial } from "./product-vial";
export function ProductCard({ product, presentation }: { product: Product; index?: number; presentation?: "collection" }) {
  const css = presentation === "collection" ? collection : styles;
  const variants = getStorefrontProductVariants(product);
  const selected = getDefaultProductVariant(product);
  const price = selected.price === null ? "Pricing pending" : formatPrice(selected.price);
  const soldOut = variants.filter(variant => !variant.inStock);
  return <Link href={`/products/${catalogSlug(product.slug)}`} className={css.card} aria-label={`${product.name}, ${formatDosage(selected.dosage)} vial, ${price}${soldOut.length ? `, sold out: ${soldOut.map(variant => formatDosage(variant.dosage)).join(", ")}` : ""}`}>
    <div className={css.visual}><ProductVial product={product} isolated sizes={presentation === "collection" ? "(max-width: 760px) 44vw, (max-width: 1000px) 28vw, 22vw" : "(max-width: 600px) 88vw, (max-width: 1100px) 44vw, 22vw"} /></div>
    <div className={css.details}>
      <div className={css.identity}><h3>{product.shortName}</h3><strong>{price}</strong></div>
      <p className={css.category}>{formatDosage(selected.dosage)} vial <span aria-hidden="true">·</span> {product.category}</p>
      {soldOut.length > 0 && <p className={css.sizes}>Sold out: {soldOut.map(variant => formatDosage(variant.dosage)).join(" / ")}</p>}
      {selected.price === null && <p className={css.pending}>Ordering opens once pricing is confirmed</p>}
    </div>
  </Link>;
}
