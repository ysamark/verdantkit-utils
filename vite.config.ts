import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    alias: {
      // search about
      "~/": "./src",
    },

    env: {
      VERDANT_HASH_SECRET: "VERDANT_KIT_HASH_SECRET::Key",
    },

    // yarn add -D @vitest/coverage-v8
    coverage: {
      enabled: true,
    },
  },
});
