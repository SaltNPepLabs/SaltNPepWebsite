"use client";
import { useEffect,useState } from "react";
import { cutoffClock } from "@/lib/delivery-window";
import { useLanguage } from "./language-provider";
import s from "./service-pages.module.css";
export function DeliveryCountdown() {
 const [now,setNow]=useState<Date|null>(null); const {t}=useLanguage();
 useEffect(()=>{const timer=setInterval(()=>setNow(new Date()),1000);return()=>clearInterval(timer);},[]);
 const clock=now?cutoffClock(now):null;const seconds=clock?Math.ceil(clock.remaining/1000):0;
 return <div className={s.deliveryHero}><div className={s.clockHeading}><svg viewBox="0 0 100 100" width="74" height="74" aria-hidden="true"><circle cx="50" cy="50" r="44" fill="none" stroke="#d8d8d4" strokeWidth="3"/><path d="M50 19V50L72 62" fill="none" stroke="#faf8f1" strokeWidth="4" strokeLinecap="round"/><circle cx="50" cy="50" r="4" fill="#d8d8d4"/></svg><div><p className={s.eyebrow}>{t("THE 11 A.M. CLUB","LA CITA DE LAS 11")}</p><h2>{clock&&!clock.beforeCutoff?t("Today’s cutoff has passed.","El plazo de hoy ha terminado."):t("Beat the clock.","Adelántate al reloj.")}</h2></div></div><p>{clock&&!clock.beforeCutoff?t("Time until tomorrow’s 11 a.m. cutoff","Tiempo hasta las 11 de mañana"):t("Order before 11 a.m. Mountain Time","Pide antes de las 11, hora de la montaña")}</p><div className={s.clock}>{[Math.floor(seconds/3600),Math.floor(seconds/60)%60,seconds%60].map((value,index)=><div className={s.clockTile} key={index}><strong>{clock?String(value).padStart(2,"0"):"—"}</strong><span>{[t("HOURS","HORAS"),t("MINUTES","MINUTOS"),t("SECONDS","SEGUNDOS")][index]}</span></div>)}</div><p>{t("Utah County: before 11 a.m. → delivered the next day. At or after 11 a.m. → delivered two days later.","Utah County: antes de las 11 → entrega al día siguiente. A partir de las 11 → entrega dos días después.")}</p><p className={s.previewFine}>{t("Seven days a week. Holiday schedules may vary and will be shown before ordering. Outside Utah County, the same cutoff determines dispatch—not arrival.","Los siete días. Los horarios festivos pueden variar y se mostrarán antes del pedido. Fuera de Utah County, el límite determina el despacho, no la llegada.")}</p></div>;
}
