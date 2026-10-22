"use client";
import { LinkArrow } from "./link-arrow";
import { useId, useState, type FormEvent } from "react";
import { useLanguage } from "./language-provider";

// Public form endpoint supplied by Brevo. No API key or subscriber list is exposed.
const action = "https://9b0b232d.sibforms.com/serve/MUIFAAcRxVa-mjHzjbJjGvRv9hkKHNv5_mOG_gJlquoGXxMIlM6MgCEUP9x9hrWoHM0EUFBfdUnqm8VQudiN01MxWPpGVxxLZKmjRIRo9mgzOr5E-eaUW5hcvMw-_EXpMKzeIeoKSKoR0MShYZqJufDcEj5gDbhsriRLn2sXyMTmj9N7SmWt3K8pYi-Ix8WTmXYgvpTJo_PQa3CwNA==";
export function NewsletterSignup({ className }: { className?: string }) {
 const id = useId();
 const [state,setState] = useState<"idle"|"saving"|"saved"|"error">("idle");
 async function submit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();
  if(state === "saving") return;
  const form = event.currentTarget;
  setState("saving");
  try {
   const response = await fetch(action, {method:"POST", body:new FormData(form), signal:AbortSignal.timeout(15000)});
   const result = await response.json();
   if(!response.ok || result.success !== true) throw new Error("Signup failed");
   setState("saved"); form.reset();
  } catch { setState("error"); }
 }
 const {t} = useLanguage();
 return <><form className={className} action={action} method="POST" onSubmit={submit}>
  <label className="sr-only" htmlFor={id}>{t("Email address", "Correo electrónico")}</label>
  <input id={id} name="EMAIL" type="email" autoComplete="email" placeholder={t("Your email address", "Tu correo electrónico")} maxLength={254} required/>
  <input type="text" name="email_address_check" defaultValue="" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{display:"none"}}/>
  <input type="hidden" name="locale" value="en"/><input type="hidden" name="html_type" value="simple"/>
  <button type="submit" disabled={state === "saving"}>{state === "saving" ? t("Saving…", "Guardando…") : t("Join", "Suscribirme")} <span aria-hidden="true"><LinkArrow diagonal /></span></button>
 </form><small role="status" aria-live="polite">{state === "saved" ? t("You’re on the list. We’ll email you when we have updates.", "Ya estás en la lista. Te enviaremos novedades.") : state === "error" ? <>{t("We couldn’t confirm your signup. ", "No pudimos confirmar tu inscripción. ")}<a href={action} target="_blank" rel="noopener noreferrer">{t("Try our signup page", "Prueba nuestra página de inscripción")}</a></> : null}</small></>;
}
