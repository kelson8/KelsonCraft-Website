// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import icon from "astro-icon";
import mdx from "@astrojs/mdx";
import node from "@astrojs/node";

import sitemap from '@astrojs/sitemap';

import expressiveCode from "astro-expressive-code";

import playformCompress from "@playform/compress";

// https://astro.build/config
export default defineConfig({
  // TODO Make a .env value for this later.
  site: "https://kelsoncraft.net",
  vite: {
    plugins: [tailwindcss()],
  },
  
  // https://eastondev.com/blog/en/posts/dev/20251202-astro-ssr-guide/
  // output: "server", // Enable SSR mode
  // adapter: node({
  //   mode: "standalone", // Standalone server mode
  // }),

  // integrations: [react(), icon(), expressiveCode(), mdx()],
  integrations: [react(), icon(), expressiveCode({
    // themes: [expressiveCodeDarkTheme, expressiveCodeDarkTheme],
    themes: ["dracula", "solarized-light"],
  }),
    mdx(),
    // https://docs.astro.build/en/guides/integrations-guide/sitemap/
    sitemap(),

      // Minify some files in the build output.
    playformCompress({
      // https://aaronjbecker.com/posts/astro-static-compression-minification-containerization/
      // if you use tailwind or postcss, your CSS is already minified
      CSS: false,
      // astro already minifies html, but not inlined javascript, so this does have an impact of about ~12% for me.
      HTML: true,
      // images imported as assets are already optimized as webp.
      // if you have images in your /public directory, you may want to compress them with this package.
      Image: true,
      // javascript is already minified by vite; enabling this option only reduces file size by < 1%, so skip.
      JavaScript: false,
      // markup in any imported SVGs needs to be minified to remove comments etc.
      // inline SVGs are treated as HTML and minified as such.
      SVG: true,
    })
  ],
});