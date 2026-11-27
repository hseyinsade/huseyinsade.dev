import s from "./Waveform.module.scss";

export const BAR_COUNT = 48;

/** Decorative audio waveform. Bar heights, delays and opacity all come from the stylesheet. */
export function Waveform() {
  return (
    <div className={s.wave} aria-hidden>
      {Array.from({ length: BAR_COUNT }, (_, i) => (
        <span key={i} className={s.bar} />
      ))}
    </div>
  );
}
