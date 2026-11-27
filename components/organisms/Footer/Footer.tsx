"use client";

import { Clock } from "@/components/molecules/Clock";
import { OPEN_CONSENT_EVENT } from "@/components/organisms/ConsentBanner";
import { useSite } from "@/components/providers";
import { ui } from "@/lib/content";
import s from "./Footer.module.scss";

const year = Number(process.env.BUILD_YEAR);

export function Footer() {
  const { t } = useSite();
  return (
    <footer className={s.footer}>
      <p>
        © {year} Huseyin Sade. {t(ui.built)}
      </p>
      <div className={s.end}>
        <button type="button" className={s.cookies} onClick={() => window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))}>
          {t(ui.consent.settings)}
        </button>
        <p className={s.clock}>
          {t(ui.localTime)} · <Clock className={s.time} />
        </p>
      </div>
    </footer>
  );
}
