import s from "./Tag.module.scss";

export function Tag({ children }: { children: React.ReactNode }) {
  return <span className={s.tag}>{children}</span>;
}
