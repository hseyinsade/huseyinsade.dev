"use client";

import { education, languages, stack, text, ui } from "@/lib/content";
import { useSite } from "./providers";
import { cx, Reveal, SectionHeader } from "./ui";
import s from "./stack.module.scss";

export function Stack() {
  const { t, lang } = useSite();

  return (
    <section id="stack" className={s.section}>
      <SectionHeader index="03" title={t(ui.sections.stack)} sub={t(ui.sections.stackSub)} />

      <div className={s.grid}>
        {stack.map((g, i) => (
          <Reveal key={g.group.en} delay={(i % 3) * 70} className={cx(s.group, g.wide && s.wide)}>
            <p className={s.groupName}>
              <span>{"{"}</span> {t(g.group)} <span>{"}"}</span>
            </p>
            <ul className={s.items}>
              {g.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>

      <div className={s.meta}>
        <Reveal>
          <h3 className={s.metaTitle}>{t(ui.education)}</h3>
          <ul className={s.metaList}>
            {education.map((e) => (
              <li key={e.school}>
                <div>
                  <p className={s.strong}>{e.school}</p>
                  <p className={s.sub}>{t(e.degree)}</p>
                </div>
                <span className={s.aside}>{text(e.years, lang)}</span>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={80}>
          <h3 className={s.metaTitle}>{t(ui.languages)}</h3>
          <ul className={s.metaList}>
            {languages.map((l) => (
              <li key={l.name.en}>
                <p className={s.strong}>{t(l.name)}</p>
                <span className={cx(s.aside)}>{t(l.level)}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
