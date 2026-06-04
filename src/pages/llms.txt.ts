import { getCollection } from "astro:content";
import type { APIRoute } from "astro";
import { AUTHOR_NAME, SITE_NAME, SITE_URL } from "../utils/schema";

// Intentionally prerendered to generate a static llms.txt file at build time.
export const prerender = true;

export const GET: APIRoute = async () => {
	// Fetch all content collections
	const portfolio = await getCollection("portfolio");
	const articles = await getCollection("article");
	const blogs = await getCollection("blog");
	const tools = await getCollection("tools");

	const featuredProjects = portfolio
		.filter((p) => p.data.featured)
		.sort((a, b) => (b.data.order || 0) - (a.data.order || 0));

	const recentArticles = articles
		.sort(
			(a, b) =>
				new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime(),
		)
		.slice(0, 5);

	const recentBlogs = blogs
		.filter((b) => !b.data.draft)
		.sort(
			(a, b) =>
				new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime(),
		)
		.slice(0, 5);

	const publishedTools = tools
		.filter((t) => !t.data.draft)
		.sort((a, b) => (b.data.order || 0) - (a.data.order || 0));

	const fullUrl = (path: string) => `${SITE_URL}${path}`;

	const body = [
		`# ${SITE_NAME}`,
		"",
		`> Portfolio and personal website of ${AUTHOR_NAME}, a Full Stack Developer specializing in React, NextJS, TypeScript and modern web technologies.`,
		"",
		"## Overview",
		"",
		`${AUTHOR_NAME} is a Full Stack Developer passionate about building scalable applications and solving complex problems. The website serves as a central hub for projects, technical articles, personal blog posts, and developer tools.`,
		"",
		"## Key Sections",
		"",
		`- Portfolio: ${fullUrl("/portfolio")} — Showcasing selected web development projects`,
		`- Articles: ${fullUrl("/article")} — Technical writings and tutorials`,
		`- Blog: ${fullUrl("/blog")} — Personal blog posts and lifestyle content`,
		`- Tools: ${fullUrl("/tools")} — Free developer utilities and applications`,
		"",
		"## Featured Projects",
		"",
		...featuredProjects.map(
			(p) =>
				`- ${p.data.title}: ${fullUrl(`/portfolio/${p.id}`)} — ${p.data.description || ""}`,
		),
		"",
		"## Recent Articles",
		"",
		...recentArticles.map(
			(a) => `- ${a.data.title}: ${fullUrl(`/article/${a.id}`)}`,
		),
		"",
		"## Recent Blog Posts",
		"",
		...recentBlogs.map((b) => `- ${b.data.title}: ${fullUrl(`/blog/${b.id}`)}`),
		"",
		"## Tools",
		"",
		...publishedTools.map(
			(t) =>
				`- ${t.data.title}: ${fullUrl(`/tools/${t.id}`)} — ${t.data.description}`,
		),
		"",
		"## Contact & Links",
		"",
		`- Website: ${SITE_URL}`,
		"- GitHub: https://github.com/rizki36",
		"- LinkedIn: https://linkedin.com/in/rizki36",
		"- Instagram: https://instagram.com/fitra36_",
		"",
		"## Technologies",
		"",
		"React, Next.js, TypeScript, JavaScript, Laravel, PostgreSQL, MySQL, Prisma, TailwindCSS, Astro",
	].join("\n");

	return new Response(body, {
		status: 200,
		headers: {
			"Content-Type": "text/plain; charset=utf-8",
		},
	});
};
