"use client";

import Image from "next/image";
import type { Product } from "@/lib/products";
import { getProductImage } from "@/lib/product-images";
import { formatDosage, getDefaultProductVariant, getProductVariant } from "@/lib/product-variants";
import { useProductSelection } from "./product-selection";
import styles from "./product-vial.module.css";

export function ProductVial({ product, featured = false, isolated = false, sizes, heroImage }: { product: Product; featured?: boolean; isolated?: boolean; sizes?: string; heroImage?: string }) {
  const selection = useProductSelection();
  const variant = selection?.slug === product.slug
    ? getProductVariant(product, selection.variantId) ?? getDefaultProductVariant(product)
    : getDefaultProductVariant(product);
  const quantity = formatDosage(variant.dosage);
  const src = heroImage ?? getProductImage(product.slug, variant.dosage, isolated);
  if (!src) return (
    <div className={`${styles.photo} ${styles.illustration}${isolated ? ` ${styles.isolated}` : ""}`} role="img" aria-label={`Illustration of a SALT N’ PEP ${product.shortName} ${quantity} vial`} data-vial-size={variant.dosage}>
      <div className={styles.vial} aria-hidden="true">
        <div className={styles.cap} />
        <div className={styles.glass}>
          <div className={styles.vialLabel}>
            <span className={styles.wordmark}>SALT N’ PEP</span>
            <strong>{product.shortName}</strong>
            <span className={styles.amount}>{quantity}</span>
            <span className={styles.research}>Laboratory research only</span>
          </div>
        </div>
      </div>
      <span className={styles.caption} aria-hidden="true">Product illustration</span>
    </div>
  );
  return <div className={`${styles.photo}${isolated ? ` ${styles.isolated}` : ""}`} data-vial-size={variant.dosage}>
    <Image key={src} src={src} alt={`SALT N’ PEP ${product.shortName} ${quantity} vial`} fill loading={featured ? "eager" : "lazy"} sizes={sizes ?? (featured ? "(max-width: 1024px) 100vw, 600px" : "(max-width: 760px) 50vw, 25vw")} className={styles.image} />
  </div>;
}
