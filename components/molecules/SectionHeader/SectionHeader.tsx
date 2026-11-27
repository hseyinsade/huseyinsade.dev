import { Reveal } from "@/components/atoms/Reveal";
import s from "./SectionHeader.module.scss";

type Props = { index: string; title: string; sub: string };

export function SectionHeader({ index, title, sub }: Props) {
  return (
    <Reveal className={s.header}>
      <p className={s.index}>
        <span>{index}</span> / {title}
      </p>
      <div>
        <h2 className={s.title}>{title}</h2>
        <p className={s.sub}>{sub}</p>
      </div>
    </Reveal>
  );
}
