// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import icon from "astro-icon";
import mdx from "@astrojs/mdx";
import node from "@astrojs/node";

import expressiveCode from "astro-expressive-code";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  // https://eastondev.com/blog/en/posts/dev/20251202-astro-ssr-guide/
  output: "server", // Enable SSR mode
  adapter: node({
    mode: "standalone", // Standalone server mode
  }),

  integrations: [react(), icon(), expressiveCode(), mdx()],
});
