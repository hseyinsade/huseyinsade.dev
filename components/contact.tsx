"use client";

import { useEffect, useState } from "react";
import { profile, ui } from "@/lib/content";
import { useSite } from "./providers";
import { OPEN_CONSENT_EVENT } from "./consent";
import { ArrowUpRight, Reveal } from "./ui";
import s from "./contact.module.scss";

function IstanbulClock() {
  const [time, setTime] = useState<string>("");
  useEffect(() => {
    const f = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/Istanbul",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    const tick = () => setTime(f.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return <span>{time || "--:--:--"}</span>;
}

export function Contact() {
  const { t } = useSite();
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  const links = [
    { label: "GitHub", handle: `@${profile.githubHandle}`, href: profile.github },
    { label: "LinkedIn", handle: `in/${profile.linkedinHandle}`, href: profile.linkedin },
  ];

  return (
    <section id="contact" className={s.section}>
      <Reveal className={s.panel}>
        <div className="bg-grid" aria-hidden />
        <div className={s.glow} aria-hidden />
        <div className={s.inner}>
          <p className={s.index}>
            <span>04</span> / {t(ui.nav.contact)}
          </p>
          <h2 className={s.title}>
            {t(ui.sections.contact)}
            <span>.</span>
          </h2>
          <p className={s.sub}>{t(ui.sections.contactSub)}</p>

          <div className={s.actions}>
            <a
              href={`mailto:${profile.email}`}
              className={s.email}
              data-track="email_click"
            >
              {profile.email}
            </a>
            <button
              type="button"
              onClick={copy}
              className={s.copy}
              data-track="email_copy"
              aria-live="polite"
            >
              {copied ? (
                <>
                  <svg viewBox="0 0 16 16" fill="none" aria-hidden>
                    <path d="m3 8.5 3 3 7-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {t(ui.copied)}
                </>
              ) : (
                <>
                  <svg viewBox="0 0 16 16" fill="none" aria-hidden>
                    <rect x="5" y="5" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
                    <path d="M3 10.5V4a1 1 0 0 1 1-1h6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                  {t(ui.copy)}
                </>
              )}
            </button>
          </div>

          <ul className={s.links}>
            {links.map((l) => (
              <li key={l.label}>
                <a href={l.href} target="_blank" rel="noreferrer" data-track="outbound_click" data-track-label={l.label}>
                  <span>
                    <span className={s.linkLabel}>{l.label}</span>
                    <span className={s.linkHandle}>{l.handle}</span>
                  </span>
                  <ArrowUpRight />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}

export function Footer() {
  const { t } = useSite();
  return (
    <footer className={s.footer}>
      <p>
        © {new Date().getFullYear()} Huseyin Sade. {t(ui.built)}
      </p>
      <div className={s.footerEnd}>
        <button type="button" className={s.cookieButton} onClick={() => window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))}>
          {t(ui.consent.settings)}
        </button>
        <p className={s.clock}>
          {t(ui.localTime)} · <IstanbulClock />
        </p>
      </div>
    </footer>
  );
}
