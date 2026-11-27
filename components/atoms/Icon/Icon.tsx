import { cx } from "@/lib/cx";
import { icons, type IconName } from "./icons";
import s from "./Icon.module.scss";

type Props = {
  name: IconName;
  size?: "sm" | "md" | "lg";
  className?: string;
};

/** Decorative icon. Give the surrounding control an accessible name (text or aria-label). */
export function Icon({ name, size = "sm", className }: Props) {
  const { viewBox, body } = icons[name];
  return (
    <svg viewBox={viewBox} aria-hidden focusable="false" data-icon={name} className={cx(s.icon, s[size], className)}>
      {body}
    </svg>
  );
}
