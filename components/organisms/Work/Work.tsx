"use client";

import { ProjectCard } from "@/components/molecules/ProjectCard";
import { ProjectRow } from "@/components/molecules/ProjectRow";
import { SectionHeader } from "@/components/molecules/SectionHeader";
import { VideoPlayer } from "@/components/molecules/VideoPlayer";
import { Waveform } from "@/components/molecules/Waveform";
import { useSite } from "@/components/providers";
import { projects, ui } from "@/lib/content";
import s from "./Work.module.scss";

export function Work() {
  const { t, lang } = useSite();
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="work" className={s.section}>
      <SectionHeader index="01" title={t(ui.sections.work)} sub={t(ui.sections.workSub)} />
      <div className={s.featured}>
        {featured.map((p, i) => (
          <ProjectCard
            key={p.name}
            project={p}
            number={i + 1}
            lang={lang}
            delay={(i % 2) as 0 | 1}
            visual={p.name === "fizy" ? <Waveform /> : <VideoPlayer />}
          />
        ))}
      </div>
      <ul className={s.list}>
        {rest.map((p, i) => (
          <ProjectRow key={p.name} project={p} number={featured.length + i + 1} lang={lang} delay={(i % 3) as 0 | 1 | 2} />
        ))}
      </ul>
    </section>
  );
}
