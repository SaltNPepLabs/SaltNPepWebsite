import { LivingHeroBackdrop } from "@/components/living-hero-backdrop";
import { HomeStory } from "@/components/home-story";
import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/arrow-icon";
import { formatPrice, products } from "@/lib/products";
import { catalogSlug } from "@/lib/catalog-naming";
import { formatDosage, getDefaultProductVariant } from "@/lib/product-variants";
import { ProductCarousel } from "@/components/product-carousel";
import { ProductVial } from "@/components/product-vial";
import styles from "./home.module.css";

export default function Home() {
  return <>
    <section className={`${styles.hero} home-hero`} aria-labelledby="home-heading">
      <Image className={styles.desktopBackdrop} src="/images/hero-clean-desktop.webp" alt="" fill priority sizes="100vw" />
      <Image className={styles.mobileBackdrop} src="/images/hero-clean-mobile.webp" alt="" fill priority sizes="100vw" />
      <LivingHeroBackdrop className={styles.livingBackdrop} />
      <div className={styles.heroShade} aria-hidden="true" />
      <div className={styles.heroIntro}>
        <h1 id="home-heading" className={styles.heroHeading}>Small compounds. <em>Big curiosity.</em></h1>
      </div>
      <div className={styles.carouselWrap}>
        <ProductCarousel slides={products.filter(product => ["bpc-157", "retatrutide", "tb-500", "mt-2", "mots-c", "ghk-cu"].includes(product.slug)).map((product, index) => {
          const variant = getDefaultProductVariant(product);
          const heroImage = product.slug === "retatrutide" ? "/images/hero-vials/glp-3-30mg.png" : `/images/hero-vials/${catalogSlug(product.slug)}.webp`;
          return {
            name: product.shortName,
            materialMask: heroImage,
            href: `/products/${catalogSlug(product.slug)}`,
            image: <ProductVial heroImage={heroImage} product={product} featured={index === 0} isolated sizes="(max-width: 760px) 78vw, (max-width: 1200px) 38vw, 31vw" />,
            details: <>
              <h2 className={styles.productName}>{product.shortName}</h2>
              <p className={styles.productMeta}><span>{formatDosage(variant.dosage)} vial</span><span>{product.category}</span><strong>{variant.price === null ? "Pricing pending" : formatPrice(variant.price)}</strong></p>
              <div className={styles.actions}>
                <Link className={styles.action} href={`/products/${catalogSlug(product.slug)}`} aria-label={`Explore ${product.shortName}`}>Explore {product.shortName} <ArrowIcon direction="right" /></Link>
                <Link className={styles.collectionLink} href="/products">View the collection</Link>
              </div>
              <p className={styles.notice}><span>For laboratory research only. Not for personal use or administration to humans or animals.</span></p>
            </>,
          };
        })} />
      </div>
    </section>
    <HomeStory />
  </>;
}
