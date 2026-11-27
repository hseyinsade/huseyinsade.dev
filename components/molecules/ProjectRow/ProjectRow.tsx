import { Icon } from "@/components/atoms/Icon";
import { Reveal } from "@/components/atoms/Reveal";
import { TagList } from "@/components/molecules/TagList";
import { text, type Lang, type Project } from "@/lib/content";
import s from "./ProjectRow.module.scss";

type Props = { project: Project; number: number; lang: Lang; delay?: 0 | 1 | 2 };

/** One line in the "more projects" list. Becomes a link when the project has a URL. */
export function ProjectRow({ project: p, number, lang, delay = 0 }: Props) {
  const content = (
    <>
      <span className={s.index}>{String(number).padStart(2, "0")}</span>
      <div>
        <h3 className={s.name}>
          <span>{p.name}</span>
          {p.url && <Icon name="arrow-up-right" />}
        </h3>
        <p className={s.meta}>
          {text(p.category, lang)} · {text(p.company, lang)}
        </p>
      </div>
      <p className={s.description}>{text(p.description, lang)}</p>
      <TagList items={p.tags.slice(0, 4)} className={s.tags} />
    </>
  );

  return (
    <Reveal as="li" delay={delay}>
      {p.url ? (
        <a href={p.url} target="_blank" rel="noreferrer" className={s.row} data-track="project_click" data-track-label={p.name}>
          {content}
        </a>
      ) : (
        <div className={s.row}>{content}</div>
      )}
    </Reveal>
  );
}
