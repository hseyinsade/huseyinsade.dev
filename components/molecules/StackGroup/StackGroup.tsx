import { Reveal } from "@/components/atoms/Reveal";
import type { Lang, StackGroup as Group } from "@/lib/content";
import { cx } from "@/lib/cx";
import s from "./StackGroup.module.scss";

type Props = { group: Group; lang: Lang; delay?: 0 | 1 | 2 };

export function StackGroup({ group, lang, delay = 0 }: Props) {
  return (
    <Reveal delay={delay} className={cx(s.group, group.wide && s.wide)}>
      <p className={s.name}>
        <span>{"{"}</span> {group.group[lang]} <span>{"}"}</span>
      </p>
      <ul className={s.items}>
        {group.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </Reveal>
  );
}
