import { ImageResponse } from "next/og";

export const dynamic = "force-static";

/** iOS home-screen icon (/apple-touch-icon.png): same "hs" mark as the favicon. */
export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0c0c0b",
          color: "#d2ff45",
          fontSize: 84,
          fontWeight: 700,
          fontFamily: "monospace",
          letterSpacing: -4,
        }}
      >
        hs
      </div>
    ),
    { width: 180, height: 180 },
  );
}
