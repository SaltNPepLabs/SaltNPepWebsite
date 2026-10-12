"use client";

import { createContext, useContext, useState, useCallback, useEffect, useRef, type ReactNode } from "react";
import { track } from "./analytics";
import { catalogSlug } from "./catalog-naming";
import type { Product } from "./products";
import { createCartItem, restoreCartItems, MAX_CART_LINES, type CartItem } from "./cart-items";
export type { CartItem } from "./cart-items";

interface CartContextType {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  additionId: number;
  addItem: (product: Product, quantity: number, variantId?: string) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [additionId, setAdditionId] = useState(0);
  const [hydrated, setHydrated] = useState(false);
  const currentItems = useRef<CartItem[]>([]);
  useEffect(() => {
    let restored: CartItem[] = [];
    try {
      restored = restoreCartItems(JSON.parse(localStorage.getItem("snp-cart") || "[]"));
    } catch { /* Storage can be unavailable; the in-memory cart still works. */ }
    // Hydrate browser storage after the static export's initial render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setItems(restored);
    currentItems.current = restored;
    setHydrated(true);
  }, []);
  useEffect(() => {
    if (!hydrated) return;
    try { localStorage.setItem("snp-cart", JSON.stringify(items.map(i => ({ slug: i.product.slug, variantId: i.variant.id, quantity: i.quantity })))); } catch { /* Keep cart usable without storage. */ }
  }, [items, hydrated]);

  const addItem = useCallback((product: Product, quantity: number, variantId?: string) => {
    const item = createCartItem(product.slug, quantity, variantId);
    if (!item) return;
    setAdditionId((previous) => previous + 1);
    const prev = currentItems.current;
    const existing = prev.find((i) => i.id === item.id);
    const nextItem = existing ? createCartItem(product.slug, Math.min(100, existing.quantity + quantity), item.variant.id)! : item;
    const next = existing ? prev.map(i => i.id === item.id ? nextItem : i) : prev.length < MAX_CART_LINES ? [...prev, item] : prev;
    currentItems.current = next; setItems(next);
    const added = next === prev ? 0 : nextItem.quantity - (existing?.quantity || 0);
    if (added > 0) trackCartChange("add_to_cart", nextItem, added, next);
  }, []);

  const removeItem = useCallback((id: string) => {
    const removed = currentItems.current.find(i => i.id === id);
    const next = currentItems.current.filter(i => i.id !== id);
    currentItems.current = next; setItems(next);
    if (removed) trackCartChange("remove_from_cart", removed, removed.quantity, next);
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (!Number.isInteger(quantity) || quantity > 100) return;
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    const previous = currentItems.current.find(i => i.id === id);
    const next = currentItems.current.map((i) =>
        i.id === id
          ? createCartItem(i.product.slug, quantity, i.variant.id)!
          : i
    );
    currentItems.current = next; setItems(next);
    if (previous && previous.quantity !== quantity) trackCartChange(quantity > previous.quantity ? "add_to_cart" : "remove_from_cart", quantity > previous.quantity ? next.find(i => i.id === id)! : previous, Math.abs(quantity - previous.quantity), next);
  }, [removeItem]);

  const clearCart = useCallback(() => {
    const previous = currentItems.current; currentItems.current = []; setItems([]);
    previous.forEach(item => trackCartChange("remove_from_cart", item, item.quantity, []));
  }, []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.pricePerUnit * i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, totalItems, totalPrice, additionId, addItem, removeItem, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

function trackCartChange(event: string, item: CartItem, quantity: number, items: CartItem[]) {
  track(event, { product_slug: catalogSlug(item.product.slug), variant: item.variant.id, quantity, price_cents: Math.round(item.pricePerUnit * 100), cart_value_cents: Math.round(items.reduce((sum, line) => sum + line.pricePerUnit * line.quantity, 0) * 100) });
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
