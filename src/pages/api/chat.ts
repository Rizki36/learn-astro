import { createOpenAI } from "@ai-sdk/openai";
import { convertToModelMessages, streamText } from "ai";
import type { APIRoute } from "astro";

const openAIClient = createOpenAI({
	apiKey: import.meta.env.OPENAI_API_KEY || "",
});

export const prerender = false;

export const POST: APIRoute = async ({ request, site }) => {
	try {
		const { messages } = await request.json();

		// Fetch context from our API endpoint
		const contextUrl = site
			? `${site}api/chatbot-context.json`
			: "http://localhost:4321/api/chatbot-context.json";
		console.log("Context URL:", contextUrl);

		const contextResponse = await fetch(contextUrl);
		const context = await contextResponse.json();

		// System prompt with context
		const systemPrompt = `Kamu adalah asisten AI untuk portfolio website Fitra (devfitra.com). 
		
Tugasmu adalah membantu pengunjung mengetahui tentang Fitra dan project-project yang telah dikerjakan.

INFORMASI TENTANG FITRA:
- Nama: ${context.about.name}
- Role: ${context.about.role}
- Website: ${context.about.website}
- Deskripsi: ${context.about.description}
- Skills: ${context.about.skills.join(", ")}
- Focus Area: ${context.about.focus.join(", ")}

STATISTIK:
- Total Projects: ${context.stats.totalProjects}
- Featured Projects: ${context.stats.featuredProjects}
- Total Articles: ${context.stats.totalArticles}
- Total Blog Posts: ${context.stats.totalBlogs}

PROJECTS:
${context.projects
	.map(
		(p: {
			title: string;
			description: string;
			technologies: string[];
			startDate?: string;
			endDate: string;
			liveUrl?: string;
			githubUrl?: string;
		}) =>
			`- ${p.title}: ${p.description}
  Technologies: ${p.technologies.join(", ")}
  Period: ${p.startDate || "N/A"} - ${p.endDate}
  ${p.liveUrl ? `Live URL: ${p.liveUrl}` : ""}
  ${p.githubUrl ? `GitHub: ${p.githubUrl}` : ""}`,
	)
	.join("\n\n")}

ARTICLES:
${context.articles
	.map(
		(a: {
			title: string;
			description: string;
			tags: string[];
			publishDate: string;
		}) =>
			`- ${a.title}: ${a.description}
  Tags: ${a.tags.join(", ")}
  Published: ${a.publishDate}`,
	)
	.join("\n\n")}

BLOG POSTS:
${context.blogs
	.map(
		(b: {
			title: string;
			excerpt: string;
			tags: string[];
			publishDate: string;
		}) =>
			`- ${b.title}: ${b.excerpt}
  Tags: ${b.tags.join(", ")}
  Published: ${b.publishDate}`,
	)
	.join("\n\n")}

INSTRUKSI:
1. Jawab dalam bahasa Indonesia secara natural dan ramah
2. Fokus pada project dan kemampuan teknis Fitra
3. Jika ditanya tentang project tertentu, berikan detail lengkap termasuk teknologi yang digunakan
4. Jika ditanya rekomendasi project, sebutkan yang featured atau yang paling relevan
5. Jika pertanyaan di luar konteks portfolio, arahkan kembali ke topik portfolio
6. Gunakan emoji secukupnya untuk membuat percakapan lebih menarik
7. Jika ditanya tentang contact atau cara menghubungi, arahkan ke website devfitra.com

Jawab dengan informatif tapi tetap concise. Maksimal 3-4 paragraf untuk setiap jawaban.`;

		const result = streamText({
			model: openAIClient("gpt-4o-mini"),
			system: systemPrompt,
			messages: convertToModelMessages(messages),
			temperature: 0.7,
			maxOutputTokens: 500,
		});

		return result.toTextStreamResponse();
	} catch (error) {
		console.error("Chat API Error:", error);
		return new Response(
			JSON.stringify({
				error: "Failed to process chat request",
				details: error instanceof Error ? error.message : "Unknown error",
			}),
			{
				status: 500,
				headers: {
					"Content-Type": "application/json",
				},
			},
		);
	}
};
