import { ImageResponse } from "next/og";
import { iconDataUri } from "@/lib/icon";

export const dynamic = "force-static";

/** iOS home-screen icon (/apple-touch-icon.png): same "</>" mark as the favicon, full-bleed (iOS rounds the corners). */
export function GET() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#0c0c0b" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={iconDataUri} width={180} height={180} alt="" />
      </div>
    ),
    { width: 180, height: 180 },
  );
}
