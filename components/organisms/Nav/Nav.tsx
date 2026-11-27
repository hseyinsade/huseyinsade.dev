"use client";

import { useEffect, useState } from "react";
import { InspectToggle } from "@/components/molecules/InspectToggle";
import { LanguageSwitch } from "@/components/molecules/LanguageSwitch";
import { ThemeToggle } from "@/components/molecules/ThemeToggle";
import { useSite } from "@/components/providers";
import { ui } from "@/lib/content";
import { cx } from "@/lib/cx";
import s from "./Nav.module.scss";

export const navLinks = [
  { id: "work", label: ui.nav.work },
  { id: "experience", label: ui.nav.experience },
  { id: "stack", label: ui.nav.stack },
  { id: "contact", label: ui.nav.contact },
] as const;

export function Nav() {
  const { t, lang, setLang, theme, toggleTheme, inspect, setInspect } = useSite();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the link of the section in the middle of the screen.
  useEffect(() => {
    const sections = navLinks.map((l) => document.getElementById(l.id)).filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <header className={cx(s.header, scrolled && s.scrolled)}>
      <nav className={s.nav}>
        <a href="#top" className={s.brand} aria-label="Huseyin Sade — home">
          <span className={s.logo}>hs</span>
          <span className={s.domain}>huseyinsade.dev</span>
        </a>

        <ul className={s.links}>
          {navLinks.map((l) => (
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
          <InspectToggle on={inspect} label={t(ui.inspect)} onToggle={() => setInspect((v) => !v)} />
          <LanguageSwitch value={lang} onChange={setLang} />
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </div>
      </nav>
    </header>
  );
}
