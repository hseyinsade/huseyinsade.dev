import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  // Inlined at build time so server HTML and client agree (no hydration mismatch at New Year).
  env: { BUILD_YEAR: String(new Date().getFullYear()) },
};

export default nextConfig;
