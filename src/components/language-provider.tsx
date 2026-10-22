"use client";
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useSyncExternalStore, type ReactNode } from "react";
type Language = "en" | "es";
const key = "snp-language";
const subscribe = (callback: () => void) => { window.addEventListener("storage", callback); window.addEventListener("snp-language", callback); return () => { window.removeEventListener("storage", callback); window.removeEventListener("snp-language", callback); }; };
const snapshot = (): Language => { try { return localStorage.getItem(key) === "es" ? "es" : "en"; } catch { return "en"; } };
const Context = createContext({ language: "en" as Language, setLanguage: (_: Language) => { void _; } });
export function LanguageProvider({ children }: { children: ReactNode }) {
  const language = useSyncExternalStore(subscribe, snapshot, () => "en" as Language);
  useEffect(() => { document.documentElement.lang = language; }, [language]);
  function setLanguage(value: Language) { try { localStorage.setItem(key, value); window.dispatchEvent(new Event("snp-language")); } catch { /* Storage unavailable: retain the default language. */ } }
  return <Context.Provider value={{ language, setLanguage }}>{children}</Context.Provider>;
}
export function useLanguage() { const context = useContext(Context); return { ...context, t: (en: string, es: string) => context.language === "es" ? es : en }; }
export function LanguageControl() { const { language, setLanguage } = useLanguage(); return <select aria-label="Language / Idioma" value={language} onChange={event => setLanguage(event.target.value as Language)} className="language-control"><option value="en">EN</option><option value="es">ES</option></select>; }

export function TranslationNotice() { const {language}=useLanguage(); const path=usePathname(); const translated=["/coas","/about","/contact","/policies","/account","/rewards","/delivery"].includes(path); if(language!=="es" || translated) return null; return <p lang="es" style={{padding:"10px 24px",fontSize:12,background:"#eae4d8",textAlign:"center"}}>El contenido de esta página está disponible en inglés por ahora.</p>; }
