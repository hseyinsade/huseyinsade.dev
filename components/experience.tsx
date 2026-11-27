"use client";

import { jobs, ui, type Lang } from "@/lib/content";
import { useSite } from "./providers";
import { cx, Reveal, SectionHeader, Tags } from "./ui";
import s from "./experience.module.scss";

function fmt(ym: string, lang: Lang) {
  const [y, m] = ym.split("-").map(Number);
  return new Intl.DateTimeFormat({ en: "en-US", tr: "tr-TR", de: "de-DE" }[lang], { month: "short", year: "numeric" }).format(
    new Date(y, m - 1, 1),
  );
}

function duration(start: string, end: string | undefined, lang: Lang) {
  const [sy, sm] = start.split("-").map(Number);
  const now = new Date();
  const [ey, em] = end ? end.split("-").map(Number) : [now.getFullYear(), now.getMonth() + 1];
  const months = (ey - sy) * 12 + (em - sm) + 1;
  const y = Math.floor(months / 12);
  const mo = months % 12;
  if (lang === "tr") return [y && `${y} yıl`, mo && `${mo} ay`].filter(Boolean).join(" ");
  if (lang === "de") return [y && `${y} ${y > 1 ? "Jahre" : "Jahr"}`, mo && `${mo} ${mo > 1 ? "Monate" : "Monat"}`].filter(Boolean).join(" ");
  return [y && `${y} yr${y > 1 ? "s" : ""}`, mo && `${mo} mo`].filter(Boolean).join(" ");
}

export function Experience() {
  const { t, lang } = useSite();

  return (
    <section id="experience" className={s.section}>
      <SectionHeader index="02" title={t(ui.sections.experience)} sub={t(ui.sections.experienceSub)} />

      <ol>
        {jobs.map((job, i) => {
          const current = !job.end;
          return (
            <Reveal as="li" key={job.company + job.start} className={s.item}>
              <div className={s.period}>
                <p>
                  {fmt(job.start, lang)} — {job.end ? fmt(job.end, lang) : t(ui.present)}
                </p>
                <p className={s.duration}>{duration(job.start, job.end, lang)}</p>
              </div>

              <div className={s.content}>
                <span className={cx(s.marker, current && s.current, current && "live-dot")} aria-hidden />
                <h3 className={s.company}>
                  {job.company}
                  {job.note && <span className={s.note}>{t(job.note)}</span>}
                </h3>
                <p className={s.role}>
                  {t(job.role)}
                  {job.location && (
                    <span> · {lang === "tr" ? job.location.replace("Istanbul", "İstanbul") : job.location}</span>
                  )}
                </p>
                <p className={s.summary}>{t(job.summary)}</p>

                {job.highlights && (
                  <ul className={s.highlights}>
                    {job.highlights[lang].map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                )}

                <Tags items={job.tags} className={s.tags} />
                {i === jobs.length - 1 && <span className={s.fade} aria-hidden />}
              </div>
            </Reveal>
          );
        })}
      </ol>
    </section>
  );
}
