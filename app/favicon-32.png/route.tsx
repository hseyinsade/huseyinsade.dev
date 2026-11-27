import { ImageResponse } from "next/og";
import { iconDataUri } from "@/lib/icon";

export const dynamic = "force-static";

/** PNG fallback favicon (/favicon-32.png) for browsers without SVG favicon support. */
export function GET() {
  return new ImageResponse(
    (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={iconDataUri} width={32} height={32} alt="" />
    ),
    { width: 32, height: 32 },
  );
}
