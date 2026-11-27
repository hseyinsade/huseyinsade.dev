"use client";

import { JobItem } from "@/components/molecules/JobItem";
import { SectionHeader } from "@/components/molecules/SectionHeader";
import { useSite } from "@/components/providers";
import { jobs, ui } from "@/lib/content";
import s from "./Experience.module.scss";

export function Experience() {
  const { t, lang } = useSite();

  return (
    <section id="experience" className={s.section}>
      <SectionHeader index="02" title={t(ui.sections.experience)} sub={t(ui.sections.experienceSub)} />
      <ol>
        {jobs.map((job, i) => (
          <JobItem key={job.company + job.start} job={job} lang={lang} presentLabel={t(ui.present)} last={i === jobs.length - 1} />
        ))}
      </ol>
    </section>
  );
}
