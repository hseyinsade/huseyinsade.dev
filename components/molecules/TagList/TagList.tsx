import { Tag } from "@/components/atoms/Tag";
import { cx } from "@/lib/cx";
import s from "./TagList.module.scss";

export function TagList({ items, className }: { items: readonly string[]; className?: string }) {
  return (
    <ul className={cx(s.list, className)}>
      {items.map((item) => (
        <li key={item}>
          <Tag>{item}</Tag>
        </li>
      ))}
    </ul>
  );
}
