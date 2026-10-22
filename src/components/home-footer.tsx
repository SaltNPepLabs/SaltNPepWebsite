"use client";
import { LinkArrow } from "./link-arrow";
import Link from "next/link";
import { useLanguage } from "./language-provider";
import { NewsletterSignup } from "./newsletter-signup";
import s from "./home-footer.module.css";
const groups = [
 {title:["Explore","Explorar"],links:[["/products","Collection","Colección"],["/coas","COA library","Biblioteca COA"],["/about","About us","Nosotros"]]},
 {title:["Assistance","Asistencia"],links:[["/contact","Contact","Contacto"],["/account","Account & orders","Cuenta y pedidos"],["/delivery","Delivery","Entrega"],["/faq","FAQ","Preguntas frecuentes"]]},
 {title:["Details","Detalles"],links:[["/policies","Policies","Políticas"],["/rewards","Referral rewards","Recompensas"]]},
];
export function HomeFooter() {
 const {t}=useLanguage();
 return <footer className={s.footer}>
  <div className={s.top}><div className={s.brand}><Link href="/" aria-label="Salt N’ Pep home">SALT <span>N’</span> PEP</Link><p>{t("Small compounds. Big curiosity.","Pequeños compuestos. Gran curiosidad.")}</p></div>
  <section id="newsletter" className={s.newsletter} aria-labelledby="home-newsletter-title"><span className={s.eyebrow}>{t("SALT N’ PEP NEWSLETTER","BOLETÍN SALT N’ PEP")}</span><h2 id="home-newsletter-title">{t("Stay ","Mantente ")}<em>{t("up to date.","al día.")}</em></h2><p>{t("New products, restocks and COA updates. Straight to your inbox.","Nuevos productos, reposiciones y actualizaciones COA. En tu correo.")}</p>
   <NewsletterSignup/>
  </section></div>
  <div className={s.middle}><div className={s.note}><span className={s.eyebrow}>{t("CONTACT","CONTACTO")}</span><a href="mailto:hello@saltnpeplabs.com">hello@saltnpeplabs.com <LinkArrow diagonal /></a></div><nav aria-label={t("Footer navigation","Navegación del pie")} className={s.navigation}>{groups.map(group=><div key={group.title[0]}><h3>{t(group.title[0],group.title[1])}</h3>{group.links.map(([href,en,es])=><Link href={href} key={href}>{t(en,es)}</Link>)}</div>)}</nav></div>
  <div className={s.bottom}><p>{t("For laboratory research only. Not for personal use or administration to humans or animals. Products are not intended to diagnose, treat, cure, or prevent any disease.","Solo para investigación de laboratorio. No apto para uso personal ni administración a humanos o animales. Los productos no están destinados a diagnosticar, tratar, curar ni prevenir enfermedades.")}</p><span>© {new Date().getFullYear()} SALT N’ PEP</span></div>
 </footer>;
}
