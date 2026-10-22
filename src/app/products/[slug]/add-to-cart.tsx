"use client";

import { useEffect, useRef, useState } from "react";
import { pageview, track } from "@/lib/analytics";
import { catalogSlug, catalogText } from "@/lib/catalog-naming";
import { researchUseNotice } from "@/lib/research-use";
import { useProductSelection } from "@/components/product-selection";
import { useCart } from "@/lib/cart-context";
import { formatPrice, type Product } from "@/lib/products";
import { formatDosage, getDefaultProductVariant, getProductVariant, getStorefrontProductVariants } from "@/lib/product-variants";
import styles from "./add-to-cart.module.css";

export function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart();
  const variants = getStorefrontProductVariants(product);
  const selection = useProductSelection();
  if (!selection || selection.slug !== product.slug) throw new Error("Product size selection provider is required");
  const selectedSize = selection.variantId;
  const setSelectedSize = selection.selectVariant;
  const variant = getProductVariant(product, selectedSize)!;
  const [selectedQty, setSelectedQty] = useState(1);
  const [added, setAdded] = useState(false);
  const feedbackVersion = useRef(0);
  const selectedTier = variant.price === null ? undefined : { qty: selectedQty, price: variant.price };
  const soldOut = !variant.inStock;
  const pending = variant.inStock && variant.price === null;
  const viewedProduct = useRef("");
  useEffect(() => {
    if (viewedProduct.current === product.slug) return;
    viewedProduct.current = product.slug;
    const initial = getDefaultProductVariant(product);
    pageview(window.location.pathname + window.location.search);
    track("product_viewed", { product_slug: catalogSlug(product.slug), product_name: catalogText(product.name), variant: initial.id, price_cents: initial.price === null ? undefined : Math.round(initial.price * 100) });
  }, [product]);

  const resetFeedback = () => {
    feedbackVersion.current++;
    setAdded(false);
  };

  const handleAdd = () => {
    if (soldOut || pending || !selectedTier) return;
    addItem(product, selectedTier.qty, variant.id);
    setAdded(true);
    const version = ++feedbackVersion.current;
    setTimeout(() => { if (feedbackVersion.current === version) setAdded(false); }, 2000);
  };

  return (
    <section className={styles.panel} aria-label="Choose size and quantity">
      <fieldset className={styles.sizes}>
        <legend>Size per vial</legend>
        <div className={styles.options}>
          {variants.map(option => <label key={option.id} className={styles.option} data-sold-out={!option.inStock}>
            <input type="radio" name={`size-${product.slug}`} value={option.id} checked={selectedSize === option.id}
              aria-label={`${formatDosage(option.dosage)}${!option.inStock ? ", sold out" : option.price === null ? ", pricing pending" : ", available"}`}
              onChange={() => { setSelectedSize(option.id); setSelectedQty(1); resetFeedback(); }} />
            <span>{formatDosage(option.dosage)}{!option.inStock && <small>Sold out</small>}</span>
          </label>)}
        </div>
      </fieldset>
      <div className={styles.selection} aria-live="polite" aria-atomic="true">
        <p>{formatDosage(variant.dosage)} / {product.format}</p>
        {soldOut && <><strong>Sold out</strong><p>This size is currently unavailable.</p></>}
        {pending && <><strong>Pricing pending</strong><p>Price for this size is coming soon. Ordering will open once pricing is confirmed.</p></>}
      </div>
      {!soldOut && !pending && <div className={styles.orderLine}>
        <div><h2 className={styles.quantityHeading}>Quantity</h2><div className={styles.stepper}>
          <button type="button" aria-label="Remove one vial" disabled={selectedQty <= 1} onClick={() => { setSelectedQty(q => q - 1); resetFeedback(); }}>−</button>
          <span aria-live="polite">{selectedQty}</span>
          <button type="button" aria-label="Add one vial" disabled={selectedQty >= 100} onClick={() => { setSelectedQty(q => q + 1); resetFeedback(); }}>+</button>
        </div></div>
        <div className={styles.orderPrice}><strong>{formatPrice(variant.price! * selectedQty)}</strong><span>{formatPrice(variant.price!)} per vial</span></div>
      </div>}
      <p className="mt-4 text-sm leading-relaxed">{researchUseNotice}</p>
      <button
        type="button"
        disabled={soldOut || pending || !selectedTier}
        onClick={handleAdd}
        className={`${styles.add} w-full mt-3 py-3 font-black uppercase tracking-[0.12em] rounded-sm transition-all text-xs sm:text-sm ${
          added
            ? "bg-primary text-white"
            : "btn-primary"
        }`}
      >
        <span aria-live="polite">{soldOut ? "Sold out" : pending ? "Pricing pending" : added ? "Added to Cart!" : "Add to Cart"}</span>
      </button>
    </section>
  );
}
