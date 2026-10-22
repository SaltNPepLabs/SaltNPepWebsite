"use client";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "./language-provider";
import s from "./service-pages.module.css";

type ChatApi = {
 onLoad?: () => void; onChatMinimized?: () => void; onChatMaximized?: () => void;
 showWidget?: () => void; hideWidget?: () => void; maximize?: () => void;
};
declare global { interface Window { Tawk_API?: ChatApi; Tawk_LoadStart?: Date } }

export function SupportChat() {
 const {t} = useLanguage();
 const [requested,setRequested] = useState(false);
 const [state,setState] = useState<"idle"|"loading"|"open"|"error">("idle");
 const ready = useRef(false);
 useEffect(() => {
  if(state !== "loading") return;
  const timer = setTimeout(() => setState("error"), 20000);
  return () => clearTimeout(timer);
 },[state]);
 function openChat() {
  if(ready.current) {
   window.Tawk_API?.showWidget?.(); window.Tawk_API?.maximize?.(); setState("open"); return;
  }
  // Load only when the visitor asks to chat. No phone numbers or secrets here.
  window.Tawk_API = window.Tawk_API || {};
  window.Tawk_API.onLoad = () => {
   ready.current = true;
   window.Tawk_API?.showWidget?.(); window.Tawk_API?.maximize?.(); setState("open");
  };
  window.Tawk_API.onChatMinimized = () => { window.Tawk_API?.hideWidget?.(); setState("idle"); };
  window.Tawk_API.onChatMaximized = () => setState("open");
  window.Tawk_LoadStart = new Date();
  setState("loading"); setRequested(true);
 }
 return <>
  {state !== "open" && <button className={s.chat} onClick={openChat} disabled={state === "loading"}>{state === "loading" ? t("Opening chat…","Abriendo chat…") : t("Chat with us","Chatea con nosotros")}</button>}
  {state === "error" && <section className={s.chatPanel} role="status"><p>{t("Chat couldn’t connect. You can email us instead.","No se pudo conectar el chat. Puedes escribirnos por correo.")}</p><a href="mailto:hello@saltnpeplabs.com">hello@saltnpeplabs.com</a><button onClick={()=>setState("idle")} aria-label="Close chat notice"> ×</button></section>}
  {requested && <Script id="salt-pep-live-chat" src="https://embed.tawk.to/6ad8e59327479734ae0a61b0/1k5fk1hpm" strategy="afterInteractive" crossOrigin="anonymous" onError={()=>setState("error")}/>}
 </>;
}
