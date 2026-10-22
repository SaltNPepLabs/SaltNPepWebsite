"use client";
import { LinkArrow } from "./link-arrow";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cutoffClock } from "@/lib/delivery-window";
import s from "./home-delivery-countdown.module.css";

export function HomeDeliveryCountdown() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    const update = () => setNow(new Date());
    const initial = window.setTimeout(update, 0);
    const interval = window.setInterval(update, 1000);
    return () => { window.clearTimeout(initial); window.clearInterval(interval); };
  }, []);
  const clock = now ? cutoffClock(now) : null;
  const seconds = clock ? Math.ceil(clock.remaining / 1000) : 0;
  const passed = clock && !clock.beforeCutoff;
  const values = [Math.floor(seconds / 3600), Math.floor(seconds / 60) % 60, seconds % 60];

  return <div className={s.wrap}>
    <p className={s.eyebrow}>{passed ? "Until tomorrow’s cutoff" : "Order before 11 a.m. Mountain Time"}</p>
    <div className={s.clock} role="timer" aria-label="Time until the next 11 a.m. Mountain Time order cutoff" aria-live="off">
      {values.map((value, index) => <div className={s.unit} key={index}>
        <span className={s.digit}>{clock ? String(value).padStart(2, "0") : "—"}</span>
        <span className={s.label}>{["Hours", "Minutes", "Seconds"][index]}</span>
      </div>)}
    </div>
    <p className={s.promise}>{passed ? <>Today’s cutoff has passed.<br/>Order now for delivery or dispatch in two days.</> : <>Next-day delivery in Utah County.<br/>Next-day shipping everywhere else in the U.S.</>}</p>
    <p className={s.fine}>Carrier transit is additional. Holidays may vary. <Link href="/delivery">Details <LinkArrow diagonal /></Link></p>
  </div>;
}
