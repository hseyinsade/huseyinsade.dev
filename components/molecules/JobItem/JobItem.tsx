import { Reveal } from "@/components/atoms/Reveal";
import { TagList } from "@/components/molecules/TagList";
import type { Job, Lang } from "@/lib/content";
import { cx } from "@/lib/cx";
import { formatDuration, formatMonth } from "@/lib/date";
import s from "./JobItem.module.scss";

type Props = {
  job: Job;
  lang: Lang;
  /** Label for an ongoing job's end date ("Present"). */
  presentLabel: string;
  /** The last item fades the timeline line out. */
  last?: boolean;
};

export function JobItem({ job, lang, presentLabel, last }: Props) {
  const current = !job.end;
  const location = job.location && (lang === "tr" ? job.location.replace("Istanbul", "İstanbul") : job.location);

  return (
    <Reveal as="li" className={s.item}>
      <div className={s.period}>
        <p>
          {formatMonth(job.start, lang)} — {job.end ? formatMonth(job.end, lang) : presentLabel}
        </p>
        <p className={s.duration}>{formatDuration(job.start, job.end, lang)}</p>
      </div>

      <div className={cx(s.content, last && s.last)}>
        <span className={cx(s.marker, current && s.current, current && "live-dot")} aria-hidden />
        <h3 className={s.company}>
          {job.company}
          {job.note && <span className={s.note}>{job.note[lang]}</span>}
        </h3>
        <p className={s.role}>
          {job.role[lang]}
          {location && <span> · {location}</span>}
        </p>
        <p className={s.summary}>{job.summary[lang]}</p>

        {job.highlights && (
          <ul className={s.highlights}>
            {job.highlights[lang].map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        )}

        <TagList items={job.tags} className={s.tags} />
      </div>
    </Reveal>
  );
}
