import { renderOgImage } from "@/lib/og";

export const dynamic = "force-static";

// Served as /og-tr.png (a real .png file in the static export).
export function GET() {
  return renderOgImage("tr");
}
