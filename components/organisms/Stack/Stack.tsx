"use client";

import { Reveal } from "@/components/atoms/Reveal";
import { SectionHeader } from "@/components/molecules/SectionHeader";
import { StackGroup } from "@/components/molecules/StackGroup";
import { useSite } from "@/components/providers";
import { education, languages, stack, text, ui } from "@/lib/content";
import s from "./Stack.module.scss";

export function Stack() {
  const { t, lang } = useSite();

  return (
    <section id="stack" className={s.section}>
      <SectionHeader index="03" title={t(ui.sections.stack)} sub={t(ui.sections.stackSub)} />

      <div className={s.grid}>
        {stack.map((g, i) => (
          <StackGroup key={g.group.en} group={g} lang={lang} delay={(i % 3) as 0 | 1 | 2} />
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
        <Reveal delay={1}>
          <h3 className={s.metaTitle}>{t(ui.languages)}</h3>
          <ul className={s.metaList}>
            {languages.map((l) => (
              <li key={l.name.en}>
                <p className={s.strong}>{t(l.name)}</p>
                <span className={s.aside}>{t(l.level)}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
