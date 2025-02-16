import { defineConfig } from "vitest/config";
import { sveltekit } from "@sveltejs/kit/vite";

export default defineConfig({
  plugins: [sveltekit()],

  test: {
    environment: "happy-dom",
    include: ["src/**/*.{test,spec}.{js,ts}"],
  },
});
