import { LinkArrow } from "./link-arrow";
import Link from "next/link";
import { products, formatPrice } from "@/lib/products";
import { catalogSlug } from "@/lib/catalog-naming";
import { formatDosage, getDefaultProductVariant } from "@/lib/product-variants";
import { ProductVial } from "./product-vial";
import s from "./home-story.module.css";
import { HomeDeliveryCountdown } from "./home-delivery-countdown";
export function HomeStory() {
 const selection = [products[0], products[1], products[2], products.find(p=>p.slug==="ghk-cu")!];
 return <div className={s.story}>
  <section className={s.intro} aria-labelledby="shop-intro">
   <div><h2 id="shop-intro">Research compounds.<br/><span>Without the wait.</span></h2></div>
   <HomeDeliveryCountdown />
  </section>
  <section className={s.products} aria-labelledby="home-products"><header><h2 id="home-products">Shop compounds</h2><Link href="/products">View all products <LinkArrow diagonal /></Link></header>
   <div className={s.grid}>{selection.map(product=>{const variant=getDefaultProductVariant(product);return <Link className={s.product} href={`/products/${catalogSlug(product.slug)}`} key={product.slug}><div className={s.image}><ProductVial product={product} isolated sizes="(max-width: 650px) 45vw, 23vw"/></div><div className={s.info}><h3>{product.shortName}</h3><span>{variant.price===null?"Pricing pending":formatPrice(variant.price)}</span></div><p>{formatDosage(variant.dosage)} vial</p></Link>})}</div>
  </section>
  <section className={s.whyEditorial} aria-labelledby="home-why">
   <h2 id="home-why">Why <span>Salt N’ Pep?</span></h2>
   <div className={s.benefitList}>
    {[
     {title:"Local Delivery",description:"Next-day in Utah County.",href:"/delivery"},
     {title:"Transparent Pricing",description:"No minimum orders.",href:"/products"},
     {title:"Third-Party Tested",description:"Batch reports available.",href:"/coas"},
     {title:"Free U.S. Shipping",description:"Nationwide delivery.",href:"/delivery"},
     {title:"Direct Support",description:"We're here to help.",href:"/contact"},
    ].map(item=><div className={s.benefit} key={item.title}>
     <h3>{item.title}</h3>
     <Link className={s.benefitDescription} href={item.href}>{item.description}</Link>
    </div>)}
   </div>
  </section>
 </div>;
}
