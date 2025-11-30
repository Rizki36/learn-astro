import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
	// Get all articles
	const articles = await getCollection("article", ({ data }) => {
		return import.meta.env.PROD ? !data.draft : true;
	});

	// Get all blog posts
	const blogs = await getCollection("blog", ({ data }) => {
		return import.meta.env.PROD ? !data.draft : true;
	});

	// Combine and normalize both collections
	const allPosts = [
		...articles.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.pubDate,
			link: `/article/${post.slug}`,
			categories: post.data.tags || [],
			author: post.data.author || "Fitra",
		})),
		...blogs.map((post) => ({
			title: post.data.title,
			description: post.data.excerpt,
			pubDate: post.data.pubDate,
			link: `/blog/${post.slug}`,
			categories: post.data.tags || [],
			author: post.data.author || "Fitra",
		})),
	];

	// Sort by date (newest first)
	allPosts.sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

	return rss({
		title: "DevFitra's Blog & Articles",
		description:
			"Technical articles and lifestyle blog posts about web development, programming, and technology.",
		site: context.site || "https://devfitra.com",
		items: allPosts.map((post) => ({
			title: post.title,
			description: post.description,
			pubDate: post.pubDate,
			link: post.link,
			categories: post.categories,
			author: post.author,
		})),
		customData: "<language>en-us</language>",
	});
}
