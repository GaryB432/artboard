import path from "path";
import { coverageConfigDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern",
      },
    },
  },
  resolve: {
    alias: {
      "@artboard/vector": path.resolve(__dirname, "../../libraries/vector/src"),
    },
  },
  test: {
    include: ["src/**/*.{test,spec}.{js,ts}"],
    coverage: {
      exclude: [
        "**/*.config.{js,ts}",
        "**/*.{svelte,svelte.{js,ts}}",
        "build/**",
        "src/routes/**",
        "tools/**",
        ...coverageConfigDefaults.exclude,
      ],
    },
  },
});
