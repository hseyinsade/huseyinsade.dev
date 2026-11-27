import { Icon } from "@/components/atoms/Icon";
import { cx } from "@/lib/cx";
import s from "./InspectToggle.module.scss";

type Props = { on: boolean; label: string; onToggle: () => void };

/** Turns the element inspector on and off. Also bound to the I key (see Inspector). */
export function InspectToggle({ on, label, onToggle }: Props) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={on}
      title={`${label} (I)`}
      className={cx(s.button, on && s.on)}
      data-track="inspect_toggle"
      data-track-label={on ? "off" : "on"}
    >
      <Icon name="inspect" />
      {label}
      <kbd className={s.kbd}>I</kbd>
    </button>
  );
}
