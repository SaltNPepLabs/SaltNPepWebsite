import { products } from "@/lib/products";
import { ProductCard } from "./product-card";
import s from "./service-pages.module.css";
export function ProductRecommendations({ slug }: { slug: string }) {
 const current = products.find(product => product.slug === slug);
 const others = products.filter(product => product.slug !== slug);
 const selections = [...others.filter(product => product.category === current?.category), ...others.filter(product => product.category !== current?.category)].slice(0,4);
 return <section className={s.recommendations} aria-label="Explore the collection"><h2>More from the collection.</h2><p>Other catalog listings to explore. These are not suggested combinations or usage protocols.</p><div className={s.grid}>{selections.map(product => <ProductCard key={product.slug} product={product} />)}</div></section>;
}
