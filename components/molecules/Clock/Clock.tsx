"use client";

import { useEffect, useState } from "react";

const format = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/Istanbul",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});

/** Live Istanbul time. Renders a placeholder on the server so the static HTML never shows a stale time. */
export function Clock({ className }: { className?: string }) {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () => setTime(format.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <time className={className} suppressHydrationWarning>
      {time || "--:--:--"}
    </time>
  );
}
