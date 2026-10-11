"use client";

import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/products";
import { formatDosage } from "@/lib/product-variants";
import { useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./cart-drawer.module.css";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, totalPrice, updateQuantity, removeItem, clearCart } = useCart();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const dialogRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const opener = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "Tab") {
        const elements = dialogRef.current?.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], input, select, [tabindex="0"]');
        if (!elements?.length) return;
        const first = elements[0];
        const last = elements[elements.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      opener?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className={styles.overlay}>
      {/* Backdrop */}
      <div className={styles.backdrop} onClick={onClose} />

      {/* Drawer - full width on mobile, max-w-md on larger */}
      <div
        className={styles.drawer}
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
      >
        {/* Header */}
        <div className={styles.header}>
          <h2 id="cart-title">Your Cart</h2>
          <button ref={closeButtonRef} onClick={onClose} className={styles.close} aria-label="Close cart">
            <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className={styles.items}>
          {items.length === 0 ? (
            <div className={styles.empty}>
              <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
              <p>Your cart is empty</p>
            </div>
          ) : (
            <ul>
              {items.map((item) => (
                <li key={item.id} className={styles.item}>
                  <div className={styles.dosage}>
                    <span>{formatDosage(item.variant.dosage)}</span>
                  </div>

                  <div className={styles.name}>
                    <h3>{item.product.shortName}</h3>
                    <p>{formatPrice(item.pricePerUnit)} / vial</p>
                  </div>
                  <div className={styles.price}>{formatPrice(item.pricePerUnit * item.quantity)}</div>
                    <div className={styles.quantity}>
                      <button
                        aria-label={`Decrease ${item.product.shortName} ${formatDosage(item.variant.dosage)} quantity`}
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        aria-label={`Increase ${item.product.shortName} ${formatDosage(item.variant.dosage)} quantity`}
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                      <button
                        aria-label={`Remove ${item.product.shortName} ${formatDosage(item.variant.dosage)}`}
                        onClick={() => removeItem(item.id)}
                        className={styles.remove}
                      >
                        Remove
                      </button>
                    </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.subtotal}>
              <span>Subtotal</span>
              <strong>{formatPrice(totalPrice)}</strong>
            </div>
            <Link
              href="/checkout"
              onClick={onClose}
              className={styles.checkout}
            >
              Continue to Checkout
            </Link>
            <button
              onClick={clearCart}
              className={styles.clear}
            >
              Clear Cart
            </button>
            <p>
              By placing an order, you confirm these products are for research use only.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
