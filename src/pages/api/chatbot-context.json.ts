import { getCollection } from "astro:content";
import type { APIRoute } from "astro";

export const prerender = false;

export const GET: APIRoute = async () => {
	try {
		// Fetch all content collections
		const portfolio = await getCollection("portfolio");
		const articles = await getCollection("article");
		const blogs = await getCollection("blog");

		// Sort portfolio by date (newest first)
		const sortedPortfolio = portfolio.sort((a, b) => {
			const dateA = a.data.startDate ? new Date(a.data.startDate).getTime() : 0;
			const dateB = b.data.startDate ? new Date(b.data.startDate).getTime() : 0;
			return dateB - dateA;
		});

		// Aggregate context data
		const context = {
			about: {
				name: "Fitra",
				role: "Full Stack Developer",
				website: "devfitra.com",
				description:
					"Experienced Full Stack Developer specializing in modern web technologies including React, NextJS, TypeScript, and Laravel. Passionate about building scalable applications and solving complex problems.",
				skills: [
					"JavaScript",
					"TypeScript",
					"React",
					"Next.js",
					"Laravel",
					"MySQL",
					"PostgreSQL",
					"Prisma",
					"TailwindCSS",
					"Astro",
				],
				focus: [
					"Full Stack Web Development",
					"Modern JavaScript Frameworks",
					"Database Design & Optimization",
					"API Development",
					"UI/UX Implementation",
				],
			},
			projects: sortedPortfolio.map((project) => ({
				title: project.data.title,
				description: project.data.description || "",
				technologies: project.data.technologies || [],
				startDate: project.data.startDate
					? new Date(project.data.startDate).toLocaleDateString("id-ID", {
							year: "numeric",
							month: "long",
						})
					: null,
				endDate: project.data.endDate
					? new Date(project.data.endDate).toLocaleDateString("id-ID", {
							year: "numeric",
							month: "long",
						})
					: "Present",
				featured: project.data.featured || false,
				liveUrl: project.data.liveUrl || null,
				githubUrl: project.data.github || null,
				slug: project.slug,
			})),
			articles: articles.map((article) => ({
				title: article.data.title,
				description: article.data.description,
				tags: article.data.tags || [],
				publishDate: new Date(article.data.pubDate).toLocaleDateString(
					"id-ID",
					{
						year: "numeric",
						month: "long",
						day: "numeric",
					},
				),
				minutesRead: article.data.minutesRead || null,
				slug: article.slug,
			})),
			blogs: blogs
				.filter((blog) => !blog.data.draft)
				.map((blog) => ({
					title: blog.data.title,
					excerpt: blog.data.excerpt,
					tags: blog.data.tags || [],
					publishDate: new Date(blog.data.pubDate).toLocaleDateString("id-ID", {
						year: "numeric",
						month: "long",
						day: "numeric",
					}),
					slug: blog.slug,
				})),
			stats: {
				totalProjects: portfolio.length,
				totalArticles: articles.length,
				totalBlogs: blogs.filter((b) => !b.data.draft).length,
				featuredProjects: portfolio.filter((p) => p.data.featured).length,
			},
		};

		return new Response(JSON.stringify(context, null, 2), {
			status: 200,
			headers: {
				"Content-Type": "application/json",
				"Cache-Control": "public, max-age=3600", // Cache for 1 hour
			},
		});
	} catch (error) {
		console.error("Error generating chatbot context:", error);
		return new Response(
			JSON.stringify({ error: "Failed to generate context" }),
			{
				status: 500,
				headers: {
					"Content-Type": "application/json",
				},
			},
		);
	}
};
