import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";

export default defineConfig({
  output: "server",
  adapter: cloudflare({
    imageService: "passthrough",
    vite: {
      ssr: {
        external: ["buffer", "path", "fs", "os", "crypto", "async_hooks"].map(
          (i) => `node:${i}`
        ),
      },
    },
  }),
  site: "https://andyduong.work",
  integrations: [react(), sitemap()],
});
