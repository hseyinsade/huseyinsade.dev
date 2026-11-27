import { langs, type Lang } from "@/lib/content";
import s from "./LanguageSwitch.module.scss";

type Props = { value: Lang; onChange: (lang: Lang) => void };

export function LanguageSwitch({ value, onChange }: Props) {
  return (
    <div className={s.group} role="group" aria-label="Language">
      {langs.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => onChange(l)}
          aria-pressed={value === l}
          className={s.option}
          data-track="language_switch"
          data-track-label={l}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
