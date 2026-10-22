"use client";
import { usePathname } from "next/navigation";
import { HomeFooter } from "./home-footer";
import Link from "next/link";
import { ArrowIcon } from "./arrow-icon";
import { useLanguage } from "./language-provider";
import { Newsletter } from "./storefront-services";
export function Footer() {
 const { t } = useLanguage();
 const pathname = usePathname();
 if (pathname === "/") return <HomeFooter />;
 const links = [["/products","Collection","Colección"],["/coas","COA library","Biblioteca COA"],["/about","About","Nosotros"],["/contact","Contact","Contacto"],["/policies","Policies","Políticas"],["/account","Account & orders","Cuenta y pedidos"],["/delivery","Delivery","Entrega"],["/rewards","Referral rewards","Recompensas"],["/faq","Good to know","Preguntas frecuentes"]];
 return <footer className="site-footer"><div className="footer-top"><div><Link href="/" className="wordmark">SALT <span>N’</span> PEP</Link><p>{t("Small compounds. Big curiosity.", "Pequeños compuestos. Gran curiosidad.")}</p></div><nav aria-label={t("Footer navigation","Navegación del pie")}>{links.map(([href,en,es]) => <Link key={href} href={href}>{t(en,es)} <ArrowIcon /></Link>)}</nav></div><Newsletter /><div className="footer-bottom"><p>{t("For laboratory research only. Not for personal use or administration to humans or animals. Products are not intended to diagnose, treat, cure, or prevent any disease.", "Solo para investigación de laboratorio. No apto para uso personal ni administración a humanos o animales. Los productos no están destinados a diagnosticar, tratar, curar ni prevenir enfermedades.")}</p><span>© {new Date().getFullYear()} SALT N’ PEP</span></div></footer>;
}
