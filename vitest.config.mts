import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { "@": fileURLToPath(new URL(".", import.meta.url)) },
  },
  test: {
    environment: "jsdom",
    globals: true,
    // Compile SCSS modules with plain class names ("visible", "delay2") so tests can assert on them.
    css: { include: /.+/, modules: { classNameStrategy: "non-scoped" } },
    setupFiles: ["./test/setup.ts"],
    env: { BUILD_YEAR: "2026" },
    include: ["**/*.test.{ts,tsx}"],
    exclude: ["node_modules", ".next", "out"],
  },
});
