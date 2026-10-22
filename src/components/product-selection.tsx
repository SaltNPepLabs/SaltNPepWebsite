"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type ProductSelection = { slug: string; variantId: string; selectVariant: (id: string) => void };
const SelectionContext = createContext<ProductSelection | null>(null);

export function ProductSelectionProvider({ slug, initialVariantId, children }: { slug: string; initialVariantId: string; children: ReactNode }) {
  const [variantId, selectVariant] = useState(initialVariantId);
  return <SelectionContext.Provider value={{ slug, variantId, selectVariant }}>{children}</SelectionContext.Provider>;
}

export function useProductSelection() { return useContext(SelectionContext); }
