"use client";

import { profile, ui } from "@/lib/content";
import { CodeCard } from "./code-card";
import { useSite } from "./providers";
import { cx } from "./ui";
import s from "./hero.module.scss";

export function Hero() {
  const { t } = useSite();

  return (
    <section id="top" className={s.hero}>
      <div className={cx("bg-grid", s.grid)} aria-hidden />
      <div className={s.glow} aria-hidden />

      <div className={s.inner}>
        <div className={s.intro}>
          <p className={s.eyebrow}>
            <span className={cx("live-dot", s.dot)} />
            {t(ui.hero.eyebrow)}
          </p>

          <h1 className={s.title}>
            <span>{t(ui.hero.title1)}</span>
            <span>{t(ui.hero.title2)}</span>
            <span className={s.titleAccent}>{t(ui.hero.title3)}</span>
          </h1>
        </div>

        <div>
          <p className={s.lead}>{t(ui.hero.lead)}</p>

          <div className={s.ctas}>
            <a href="#contact" className={s.primary} data-track="cta_click" data-track-label="get_in_touch">
              {t(ui.hero.ctaPrimary)}
              <span>→</span>
            </a>
            <a href="#work" className={s.secondary} data-track="cta_click" data-track-label="see_work">
              {t(ui.hero.ctaSecondary)}
            </a>
            <div className={s.socials}>
              <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" data-track="outbound_click" data-track-label="GitHub">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.11.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.25.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.08 0 4.41-2.69 5.39-5.26 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.68.8.56A11.5 11.5 0 0 0 12 .5Z" />
                </svg>
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" data-track="outbound_click" data-track-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div>
          <CodeCard />
          <div className={s.now}>
            <span className={s.nowBadge}>{t(ui.hero.now)}</span>
            <span>{t(ui.hero.nowText)}</span>
          </div>
        </div>
      </div>

      <div className={s.statsWrap}>
        <dl className={s.stats}>
          {ui.stats.map((stat, i) => (
            <div key={stat.value + i} className={s.stat}>
              <dt className="sr-only">{t(stat.label)}</dt>
              <dd className={s.statValue}>{stat.value}</dd>
              <dd className={s.statLabel}>{t(stat.label)}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
