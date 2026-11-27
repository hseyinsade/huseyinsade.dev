import { Icon } from "@/components/atoms/Icon";
import s from "./ThemeToggle.module.scss";

type Props = { theme: "light" | "dark"; onToggle: () => void };

export function ThemeToggle({ theme, onToggle }: Props) {
  const next = theme === "dark" ? "light" : "dark";
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={`Switch to ${next} theme`}
      className={s.button}
      data-track="theme_toggle"
      data-track-label={next}
    >
      <Icon name={theme === "dark" ? "sun" : "moon"} size="md" />
    </button>
  );
}
