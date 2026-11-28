import { cx } from "@/lib/cx";
import s from "./AvailabilityBadge.module.scss";

type Props = {
  available: boolean;
  label: string;
};

/** Pill that says whether I'm taking on new work. */
export function AvailabilityBadge({ available, label }: Props) {
  return (
    <span className={cx(s.badge, available ? s.open : s.busy)} data-available={available}>
      <span className={s.dot} aria-hidden />
      {label}
    </span>
  );
}
