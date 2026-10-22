"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { getDefaultProductVariant } from "@/lib/product-variants";
import { products } from "@/lib/products";
import { upcomingProducts } from "@/lib/upcoming-products";
import { ProductCard } from "./product-card";
import { UpcomingProductCard } from "./upcoming-product-card";
import { ArrowIcon } from "./arrow-icon";
import styles from "./catalog.module.css";

const categories = [...new Set([...products, ...upcomingProducts].map(product => product.category))];

export function Catalog() {
  const [sort, setSort] = useState("featured");
  const [query, setQuery] = useState("");
  const params = useSearchParams();
  const requested = params.get("category");
  const [selectedCategory, setCategory] = useState<string | null>(null);
  const category = selectedCategory ?? (requested && categories.includes(requested) ? requested : "All categories");
  const [availability, setAvailability] = useState("all");
  const search = query.trim().toLowerCase();
  const matchesCategory = (product: { category: string }) => category === "All categories" || product.category === category;
  const current = availability === "upcoming" ? [] : products.filter(product => matchesCategory(product) && `${product.name} ${product.shortName} ${product.tagline}`.toLowerCase().includes(search));
  current.sort((a, b) => sort === "name" ? a.shortName.localeCompare(b.shortName) : sort === "price" ? (getDefaultProductVariant(a).price ?? Infinity) - (getDefaultProductVariant(b).price ?? Infinity) : 0);
  const upcoming = availability === "current" ? [] : upcomingProducts.filter(product => matchesCategory(product) && `${product.name} ${product.searchTerms?.join(" ") ?? ""}`.toLowerCase().includes(search));
  const count = current.length + upcoming.length;

  return (
    <>
      <div className={`catalog-toolbar ${styles.toolbar}`}>
        <label className={`search-field ${styles.search}`}>
          <span aria-hidden="true">⌕</span>
          <input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Find a product" aria-label="Find a product" />
        </label>
        <label className={styles.filter}>
          <span className="sr-only">Research category</span>
          <select value={category} onChange={event => setCategory(event.target.value)}>
            {["All categories", ...categories].map(item => <option key={item}>{item}</option>)}
          </select>
        </label>
        {upcomingProducts.length > 0 && <label className={styles.filter}>
          <span className="sr-only">Availability</span>
          <select value={availability} onChange={event => setAvailability(event.target.value)}>
            <option value="all">All products</option>
            <option value="current">Current collection</option>
            <option value="upcoming">Coming soon</option>
          </select>
        </label>}
        <label className={styles.filter}><span className="sr-only">Sort products</span><select value={sort} onChange={event => setSort(event.target.value)}><option value="featured">Featured order</option><option value="name">Name: A–Z</option><option value="price">Price: low to high</option></select></label>
        <span className="result-count" aria-live="polite">{count} {count === 1 ? "product" : "products"}</span>
      </div>
      <div className={styles.grid}>
        {current.map(product => <ProductCard key={product.slug} product={product} presentation="collection" />)}
        {upcoming.map(product => <UpcomingProductCard key={product.slug} product={product} />)}
      </div>
      {count === 0 && (
        <div className="empty-results">
          <h2>No products found.</h2>
          <p>Try a different name, research category, or availability.</p>
          <button className="text-link" onClick={() => { setQuery(""); setCategory("All categories"); setAvailability("all"); }}>Reset filters <ArrowIcon /></button>
        </div>
      )}
    </>
  );
}
