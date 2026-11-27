"use client";

import { useEffect, useState } from "react";
import { readConsent, updateConsent, type ConsentChoice } from "@/lib/analytics";
import { ui } from "@/lib/content";
import { useSite } from "./providers";
import s from "./consent.module.scss";

export const OPEN_CONSENT_EVENT = "open-consent";

/** Small consent card (KVKK / GDPR). Shown until the visitor makes a choice; reopenable from the footer. */
export function ConsentBanner() {
  const { t } = useSite();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (readConsent() === null) setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_CONSENT_EVENT, reopen);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, reopen);
  }, []);

  if (!open) return null;

  const choose = (choice: ConsentChoice) => {
    updateConsent(choice);
    setOpen(false);
  };

  return (
    <div className={s.banner} role="region" aria-label={t(ui.consent.title)}>
      <p className={s.title}>{t(ui.consent.title)}</p>
      <p className={s.text}>{t(ui.consent.text)}</p>
      <div className={s.actions}>
        <button type="button" className={s.reject} onClick={() => choose("denied")}>
          {t(ui.consent.reject)}
        </button>
        <button type="button" className={s.accept} onClick={() => choose("granted")}>
          {t(ui.consent.accept)}
        </button>
      </div>
    </div>
  );
}
