import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: cloudflare({
    imageService: "passthrough",
    vite: {
      ssr: {
        external: ["node:buffer"],
      },
    },
  }),
  site: "https://andyduong.work",
  integrations: [react(), sitemap()],
});
