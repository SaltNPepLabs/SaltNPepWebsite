"use client";
import { useLanguage } from "./language-provider";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { CartDrawer } from "./cart-drawer";
import { DeliveryBanner } from "./delivery-banner";
import { ArrowIcon } from "./arrow-icon";
import { useCart } from "@/lib/cart-context";
import styles from "./header.module.css";
const navigation = [["/products", "The collection", "La colección"], ["/coas", "COA library", "Biblioteca COA"], ["/contact", "Contact", "Contacto"], ["/account", "Account", "Cuenta"]];
export function Header() {
  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [dismissedAddition, setDismissedAddition] = useState(0);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const { totalItems, additionId } = useCart();
  const pathname = usePathname();
  const closeCart = useCallback(() => { setCartOpen(false); setDismissedAddition(additionId); }, [additionId]);
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMobileMenuOpen(false);
      menuButtonRef.current?.focus();
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [mobileMenuOpen]);
  return <>
    <a href="#main-content" className="skip-link">Skip to content</a>
    <DeliveryBanner />
    <header className="site-header">
      <Link href="/" className={`wordmark ${styles.wordmark}`} aria-label="SALT N’ PEP home">SALT <span>N’</span> PEP</Link>
      <nav className="desktop-nav" aria-label="Main navigation">{navigation.map(([href, label, es]) => <Link key={href} href={href} aria-current={pathname.startsWith(href) ? "page" : undefined}>{t(label, es)}</Link>)}</nav>
      <div className={`header-actions ${styles.actions}`}>
        <button className={`bag-button ${styles.bag} ${totalItems > 0 ? styles.bagFilled : ""}`} onClick={() => { setMobileMenuOpen(false); setCartOpen(true); }} aria-label={`Open cart, ${totalItems} items`}>
          {t("Bag", "Bolsa")}
          <span key={additionId} className={`bag-count ${styles.count} ${additionId > 0 ? styles.countAdded : ""}`}>
            {totalItems}
            {additionId > 0 && <svg className={styles.sparks} viewBox="0 0 48 48" fill="currentColor" aria-hidden="true">
              <path d="M37 2 39 7 44 9 39 11 37 16 35 11 30 9 35 7Z" />
              <path d="M8 15 9.5 18.5 13 20 9.5 21.5 8 25 6.5 21.5 3 20 6.5 18.5Z" />
              <path d="M32 34 33.5 37.5 37 39 33.5 40.5 32 44 30.5 40.5 27 39 30.5 37.5Z" />
            </svg>}
          </span>
        </button>
        <button ref={menuButtonRef} className={`menu-button ${styles.menuButton}`} aria-expanded={mobileMenuOpen} aria-controls="mobile-navigation" aria-label={mobileMenuOpen ? "Close menu" : "Open menu"} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>{mobileMenuOpen ? "✕" : "☰"}</button>
      </div>
      {mobileMenuOpen && <nav id="mobile-navigation" className={`mobile-nav ${styles.mobileNavigation}`} aria-label="Mobile navigation">{navigation.map(([href, label, es]) => <Link href={href} key={href} aria-current={pathname.startsWith(href) ? "page" : undefined} onClick={() => setMobileMenuOpen(false)}>{t(label, es)}<ArrowIcon /></Link>)}</nav>}
    </header>
    <CartDrawer open={cartOpen || additionId > dismissedAddition} onClose={closeCart} />
  </>;
}
