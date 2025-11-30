import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import { SITE_URL } from "./src/utils/schema";

// https://astro.build/config
export default defineConfig({
	site: SITE_URL, // Replace with your actual domain when it's ready
	integrations: [
		sitemap({
			// Configuration options for sitemap
			filter: (page) => page !== `${SITE_URL}/admin`, // exclude admin pages
			changefreq: "weekly",
			priority: 0.7,
			lastmod: new Date(),
		}),
	],
});
