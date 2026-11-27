"use client";

import { useEffect, useState } from "react";
import { langs, ui } from "@/lib/content";
import { useSite } from "./providers";
import { cx } from "./ui";
import s from "./nav.module.scss";

const links = [
  { id: "work", label: ui.nav.work },
  { id: "experience", label: ui.nav.experience },
  { id: "stack", label: ui.nav.stack },
  { id: "contact", label: ui.nav.contact },
] as const;

export function Nav() {
  const { t, lang, setLang, theme, toggleTheme, inspect, setInspect } = useSite();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = links.map((l) => document.getElementById(l.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <header
      className={cx(s.header, scrolled && s.scrolled)}
    >
      <nav className={s.nav}>
        <a href="#top" className={s.brand} aria-label="Huseyin Sade — home">
          <span className={s.logo}>
            hs
          </span>
          <span className={s.domain}>huseyinsade.dev</span>
        </a>

        <ul className={s.links}>
          {links.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                className={cx(s.link, active === l.id && s.active)}
                aria-current={active === l.id ? "true" : undefined}
                data-track="nav_click"
                data-track-label={l.id}
              >
                {t(l.label)}
              </a>
            </li>
          ))}
        </ul>

        <div className={s.actions}>
          <button
            type="button"
            onClick={() => setInspect((v) => !v)}
            aria-pressed={inspect}
            title={`${t(ui.inspect)} (I)`}
            className={cx(s.inspect, inspect && s.on)}
            data-track="inspect_toggle"
            data-track-label={inspect ? "off" : "on"}
          >
            <svg viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M2 2h5M2 2v5M14 14H9M14 14V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="m6 6 3.2 7.5 1-3.3 3.3-1L6 6Z" fill="currentColor" />
            </svg>
            {t(ui.inspect)}
            <kbd>I</kbd>
          </button>

          <div className={s.langs} role="group" aria-label="Language">
            {langs.map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLang(l)}
                aria-pressed={lang === l}
                data-track="language_switch"
                data-track-label={l}
              >
                {l}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            className={s.theme}
            data-track="theme_toggle"
            data-track-label={theme === "dark" ? "light" : "dark"}
          >
            {theme === "dark" ? (
              <svg viewBox="0 0 16 16" fill="none" aria-hidden>
                <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" />
                <path
                  d="M8 1v1.5M8 13.5V15M1 8h1.5M13.5 8H15M3 3l1 1M12 12l1 1M3 13l1-1M12 4l1-1"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="M13.5 9.5A6 6 0 0 1 6.5 2.5a6 6 0 1 0 7 7Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
              </svg>
            )}
          </button>
        </div>
      </nav>
    </header>
  );
}
