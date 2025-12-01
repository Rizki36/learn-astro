import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import { defineConfig } from "astro/config";
import { SITE_URL } from "./src/utils/schema";

import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  // Replace with your actual domain when it's ready
  site: SITE_URL,

  // Enable server mode for API routes
  output: "server",

  integrations: [
      react(),
      sitemap({
          // Configuration options for sitemap
          filter: (page) => page !== `${SITE_URL}/admin`, // exclude admin pages
          changefreq: "weekly",
          priority: 0.7,
          lastmod: new Date(),
      }),
	],

  adapter: vercel(),
});