import { Icon } from "@/components/atoms/Icon";
import { Reveal } from "@/components/atoms/Reveal";
import { TagList } from "@/components/molecules/TagList";
import { text, type Lang, type Project } from "@/lib/content";
import s from "./ProjectCard.module.scss";

type Props = {
  project: Project;
  number: number;
  lang: Lang;
  /** Decorative artwork shown above the text (e.g. a waveform or a video player). */
  visual: React.ReactNode;
  delay?: 0 | 1;
};

/** Large card for a featured project. The whole card is clickable when the project has a URL. */
export function ProjectCard({ project: p, number, lang, visual, delay = 0 }: Props) {
  return (
    <Reveal as="article" delay={delay} className={s.card}>
      <div className={s.visual}>
        <div className="bg-grid" aria-hidden />
        <div className={s.visualInner}>{visual}</div>
      </div>
      <div className={s.body}>
        <div className={s.head}>
          <div>
            <p className={s.meta}>
              {String(number).padStart(2, "0")} · {text(p.company, lang)}
            </p>
            <h3 className={s.name}>{p.name}</h3>
            <p className={s.category}>{text(p.category, lang)}</p>
          </div>
          {p.url && (
            <a href={p.url} target="_blank" rel="noreferrer" className={s.visit} data-track="project_click" data-track-label={p.name}>
              {p.domain}
              <Icon name="arrow-up-right" />
            </a>
          )}
        </div>
        <p className={s.description}>{text(p.description, lang)}</p>
        <TagList items={p.tags} className={s.tags} />
      </div>
    </Reveal>
  );
}
