"use client";
import { NewsletterSignup } from "./newsletter-signup";
import { useLanguage } from "./language-provider";
import s from "./service-pages.module.css";
export function Newsletter() {
 const {t}=useLanguage();
 return <section id="newsletter" className={s.newsletter}><h2>{t("Notes from the lab.","Notas del laboratorio.")}</h2><p>{t("Catalog news, new arrivals and documentation updates.","Novedades del catálogo, productos y documentación.")}</p><NewsletterSignup className={s.signup}/></section>;
}

export { SupportChat } from "./support-chat";
