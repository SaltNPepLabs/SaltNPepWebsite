import Image from "next/image";
import type { Product } from "@/lib/products";
import { catalogSlug } from "@/lib/catalog-naming";
import styles from "./product-vial.module.css";

const productImages: Record<string, string> = {
  "bpc-157": "/images/BPC-157-5mg.png",
  retatrutide: "/images/GLP-3-10mg.png",
  "tb-500": "/images/TB-500-10mg.png",
  "mt-2": "/images/MT-2-10mg.png",
  "mots-c": "/images/MOTS-c-10mg.png",
  pinealon: "/images/Pinealon-20mg.png",
  epitalon: "/images/Epitalon-10mg.png",
  "ghk-cu": "/images/GHK-Cu-50mg.png",
};

export function ProductVial({ product, featured = false, isolated = false, sizes }: { product: Product; featured?: boolean; isolated?: boolean; sizes?: string }) {
  if (!productImages[product.slug]) return (
    <div className={`${styles.photo} ${styles.illustration}${isolated ? ` ${styles.isolated}` : ""}`} role="img" aria-label={`Illustration of a SALT N’ PEP ${product.shortName} vial`}>
      <div className={styles.vial} aria-hidden="true">
        <div className={styles.cap} />
        <div className={styles.glass}>
          <div className={styles.vialLabel}>
            <span className={styles.wordmark}>SALT N’ PEP</span>
            <strong>{product.shortName}</strong>
            <span className={styles.research}>Laboratory research only</span>
          </div>
        </div>
      </div>
      <span className={styles.caption} aria-hidden="true">Product illustration</span>
    </div>
  );
  return <div className={`${styles.photo}${isolated ? ` ${styles.isolated}` : ""}`}>
    <Image src={isolated ? `/images/vials/${catalogSlug(product.slug)}.png` : productImages[product.slug]} alt={`SALT N’ PEP ${product.shortName} vial`} fill loading={featured ? "eager" : "lazy"} sizes={sizes ?? (featured ? "(max-width: 1024px) 100vw, 600px" : "(max-width: 760px) 50vw, 25vw")} className={styles.image} />
  </div>;
}
