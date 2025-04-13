import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
	site: "https://www.devfitra.com", // Replace with your actual domain when it's ready
	integrations: [
		sitemap({
			// Configuration options for sitemap
			filter: (page) => page !== "https://www.devfitra.com/admin", // exclude admin pages
			changefreq: "weekly",
			priority: 0.7,
			lastmod: new Date(),
		}),
	],
});
