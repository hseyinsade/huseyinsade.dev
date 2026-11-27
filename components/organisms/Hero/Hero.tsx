"use client";

import { SocialLinks } from "@/components/molecules/SocialLinks";
import { CodeCard } from "@/components/organisms/CodeCard";
import { useSite } from "@/components/providers";
import { ui } from "@/lib/content";
import { cx } from "@/lib/cx";
import s from "./Hero.module.scss";

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
              <span aria-hidden>→</span>
            </a>
            <a href="#work" className={s.secondary} data-track="cta_click" data-track-label="see_work">
              {t(ui.hero.ctaSecondary)}
            </a>
            <SocialLinks className={s.socials} />
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
              <dd className={s.statLabel} aria-hidden>
                {t(stat.label)}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
