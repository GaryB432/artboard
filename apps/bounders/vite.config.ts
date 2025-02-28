import { coverageConfigDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern",
      },
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

    alias: {
      "@artboard/vector": "/home/gary/repos/artboard/libraries/vector/src",
    },
  },
});
