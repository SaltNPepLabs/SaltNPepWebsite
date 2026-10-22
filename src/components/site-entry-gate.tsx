"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type FormEvent, type ReactNode } from "react";
import styles from "./site-entry-gate.module.css";
import { acceptAnalyticsGate, track } from "@/lib/analytics";

const confirmationKey = "snp-entry-confirmation-v2";
const confirmationEvent = "snp-entry-confirmed";
let confirmedInMemory = false;

function subscribe(onChange: () => void) {
  function onStorage(event: StorageEvent) {
    if (event.key === confirmationKey || event.key === null) onChange();
  }
  window.addEventListener(confirmationEvent, onChange);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(confirmationEvent, onChange);
    window.removeEventListener("storage", onStorage);
  };
}

function readStoredConfirmation(storage: "localStorage" | "sessionStorage") {
  try {
    return window[storage].getItem(confirmationKey) === "confirmed";
  } catch {
    return false;
  }
}

function readConfirmation() {
  return confirmedInMemory
    || readStoredConfirmation("localStorage")
    || readStoredConfirmation("sessionStorage");
}

function rememberConfirmation(rememberDevice: boolean) {
  confirmedInMemory = true;
  if (rememberDevice) {
    try {
      localStorage.setItem(confirmationKey, "confirmed");
      return;
    } catch { /* Fall back to this tab if persistent storage is unavailable. */ }
  } else {
    try { localStorage.removeItem(confirmationKey); } catch { /* Storage may be unavailable. */ }
  }
  try {
    sessionStorage.setItem(confirmationKey, "confirmed");
  } catch { /* Keep this visit usable when all browser storage is unavailable. */ }
}

function unconfirmedOnServer() {
  return false;
}

export function SiteEntryGate({ children }: { children: ReactNode }) {
  const confirmed = useSyncExternalStore(subscribe, readConfirmation, unconfirmedOnServer);
  const [rememberDevice, setRememberDevice] = useState(true);
  const [over21, setOver21] = useState(false);
  const [understandsResearch, setUnderstandsResearch] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const viewed = useRef(false);

  useEffect(() => {
    if (readConfirmation()) acceptAnalyticsGate();
    else if (!viewed.current) { viewed.current = true; track("age_gate_viewed"); }
  }, [confirmed]);

  useEffect(() => {
    if (confirmed) return;
    const dialog = dialogRef.current;
    if (!dialog) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // The static export opens the form immediately; promote it to a native modal after hydration.
    dialog.close();
    dialog.showModal();
    ageRef.current?.focus();
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [confirmed]);

  function enterSite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!over21 || !understandsResearch) return;
    track("age_gate_accepted");
    acceptAnalyticsGate();
    rememberConfirmation(rememberDevice);
    window.dispatchEvent(new Event(confirmationEvent));
    requestAnimationFrame(() => document.getElementById("main-content")?.focus());
  }

  return (
    <>
      <div className={styles.site} inert={!confirmed}>{children}</div>
      {!confirmed && (
        <dialog
          ref={dialogRef}
          open
          className={styles.dialog}
          aria-labelledby="entry-title"
          aria-describedby="entry-description"
          aria-modal="true"
          onCancel={(event) => event.preventDefault()}
        >
          <form onSubmit={enterSite}>
            <p className={styles.brand}>SALT N’ PEP</p>
            <h2 id="entry-title" className={styles.title}>Before you enter</h2>
            <p id="entry-description" className={styles.description}>Please confirm both statements to continue.</p>
            <div className={styles.confirmations}>
              <label className={styles.statement}>
                <input ref={ageRef} type="checkbox" required checked={over21} onChange={(event) => setOver21(event.target.checked)} />
                <span>I am over the age of 21</span>
              </label>
              <label className={styles.statement}>
                <input type="checkbox" required checked={understandsResearch} onChange={(event) => setUnderstandsResearch(event.target.checked)} />
                <span>I understand these products are for laboratory research only, not for personal use or administration to humans or animals</span>
              </label>
            </div>
            <label className={styles.remember}>
              <input type="checkbox" checked={rememberDevice} onChange={(event) => setRememberDevice(event.target.checked)} aria-describedby="remember-device-note" />
              <span>Remember this device<small id="remember-device-note">Skip this step next time on this browser.</small></span>
            </label>
            <button type="submit" className={styles.enter} disabled={!over21 || !understandsResearch}>Enter site</button>
          </form>
        </dialog>
      )}
    </>
  );
}
