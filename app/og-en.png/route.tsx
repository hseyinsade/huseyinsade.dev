import { renderOgImage } from "@/lib/og";

export const dynamic = "force-static";

// Served as /og-en.png (a real .png file in the static export).
export function GET() {
  return renderOgImage("en");
}
