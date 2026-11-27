import { Icon } from "@/components/atoms/Icon";
import s from "./VideoPlayer.module.scss";

/** Decorative video player chrome for the TV+ card. */
export function VideoPlayer() {
  return (
    <div className={s.player} aria-hidden>
      <div className={s.top}>
        <span className={s.live}>LIVE</span>
        <span>1080p · DRM</span>
      </div>
      <div className={s.track}>
        <div className={s.buffered} />
        <div className={s.progress} />
      </div>
      <div className={s.controls}>
        <Icon name="play" size="md" />
        <Icon name="volume" size="md" />
        <span className={s.time}>42:17 / 58:00</span>
      </div>
    </div>
  );
}
