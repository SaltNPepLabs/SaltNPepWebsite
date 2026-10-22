import { Suspense } from "react";
import type { Metadata } from "next";
import { Catalog } from "@/components/catalog";
export const metadata: Metadata = { title: "The collection | SALT N’ PEP", description: "Explore the SALT N’ PEP research compound collection. Compound specifications, laboratory documentation, and vial pricing." };
export default function ProductsPage() {
  return <div className="section-wrap catalog-page"><header className="collection-editorial"><div><span className="collection-eyebrow">THE SALT N’ PEP COLLECTION</span><h1>Research Compounds</h1></div><p>Considered compounds.<br />Clear specifications. Batch documentation.</p></header><Suspense fallback={<p>Loading collection…</p>}><Catalog /></Suspense><p className="catalog-disclaimer">For laboratory research only. Not for human consumption. Product photographs are for presentation; refer to each compound’s listed specifications.</p></div>;
}
