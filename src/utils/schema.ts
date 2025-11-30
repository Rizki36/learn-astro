/**
 * JSON-LD Schema utilities for SEO
 * These schemas follow Schema.org standards for better search engine understanding
 */

export const SITE_URL = "https://devfitra.com";
export const SITE_NAME = "DevFitra";
export const AUTHOR_NAME = "Rizki Fitra Rahman";

/**
 * Person schema for the site author
 * Used as a reference across multiple pages
 */
export const personSchema = {
	"@type": "Person",
	"@id": `${SITE_URL}/#person`,
	name: AUTHOR_NAME,
	alternateName: ["DevFitra", "Fitra"],
	jobTitle: "Full Stack Developer",
	description:
		"Passionate Full Stack Developer specializing in React, NextJS, TypeScript and modern web technologies",
	url: SITE_URL,
	image: `${SITE_URL}/images/me.jpg`,
	knowsAbout: [
		"React",
		"NextJS",
		"TypeScript",
		"JavaScript",
		"Laravel",
		"Web Development",
		"Full Stack Development",
		"PostgreSQL",
		"MySQL",
		"Prisma",
	],
	sameAs: [
		"https://github.com/rizki36",
		"https://linkedin.com/in/rizki36",
		"https://instagram.com/fitra36_",
	],
};

/**
 * WebSite schema for the main site
 */
export const websiteSchema = {
	"@type": "WebSite",
	"@id": `${SITE_URL}/#website`,
	url: SITE_URL,
	name: SITE_NAME,
	description:
		"Portfolio and personal website of Rizki Fitra Rahman, a passionate Full Stack Developer specializing in React, NextJS, TypeScript and more.",
	publisher: {
		"@id": `${SITE_URL}/#person`,
	},
	inLanguage: "en-US",
};

/**
 * Creates a BlogPosting schema
 */
export function createBlogPostingSchema(post: {
	title: string;
	description: string;
	pubDate: Date;
	url: string;
	image?: string;
	tags?: string[];
	category?: string;
	author?: string;
}) {
	return {
		"@context": "https://schema.org",
		"@type": "BlogPosting",
		headline: post.title,
		description: post.description,
		datePublished: post.pubDate.toISOString(),
		dateModified: post.pubDate.toISOString(),
		author: {
			"@type": "Person",
			"@id": `${SITE_URL}/#person`,
			name: post.author || AUTHOR_NAME,
		},
		publisher: {
			"@type": "Person",
			"@id": `${SITE_URL}/#person`,
			name: AUTHOR_NAME,
		},
		image: post.image || `${SITE_URL}/images/og-image.jpg`,
		mainEntityOfPage: {
			"@type": "WebPage",
			"@id": `${SITE_URL}${post.url}`,
		},
		keywords: post.tags?.join(", ") || "",
		articleSection: post.category || "Blog",
		inLanguage: "en-US",
	};
}

/**
 * Creates a TechArticle schema
 */
export function createTechArticleSchema(article: {
	title: string;
	description: string;
	pubDate: Date;
	url: string;
	image?: string;
	tags?: string[];
	author?: string;
	minutesRead?: number;
}) {
	return {
		"@context": "https://schema.org",
		"@type": "TechArticle",
		headline: article.title,
		description: article.description,
		datePublished: new Date(article.pubDate).toISOString(),
		dateModified: new Date(article.pubDate).toISOString(),
		author: {
			"@type": "Person",
			"@id": `${SITE_URL}/#person`,
			name: article.author || AUTHOR_NAME,
		},
		publisher: {
			"@type": "Person",
			"@id": `${SITE_URL}/#person`,
			name: AUTHOR_NAME,
			url: SITE_URL,
		},
		mainEntityOfPage: {
			"@type": "WebPage",
			"@id": `${SITE_URL}${article.url}`,
		},
		keywords: article.tags?.join(", ") || "",
		timeRequired: article.minutesRead ? `PT${article.minutesRead}M` : undefined,
		image: article.image || `${SITE_URL}/images/og-image.jpg`,
		articleSection: "Technology",
		inLanguage: "en-US",
	};
}

/**
 * Creates a CreativeWork schema for portfolio projects
 */
export function createProjectSchema(project: {
	title: string;
	description: string;
	publishDate: Date;
	url: string;
	image?: string;
	technologies: string[];
	github?: string;
	liveUrl?: string;
}) {
	return {
		"@context": "https://schema.org",
		"@type": "CreativeWork",
		name: project.title,
		description: project.description || project.title,
		author: {
			"@type": "Person",
			"@id": `${SITE_URL}/#person`,
			name: AUTHOR_NAME,
		},
		creator: {
			"@type": "Person",
			"@id": `${SITE_URL}/#person`,
			name: AUTHOR_NAME,
		},
		datePublished: new Date(project.publishDate).toISOString(),
		image: project.image || `${SITE_URL}/images/og-image.jpg`,
		url: `${SITE_URL}${project.url}`,
		keywords: project.technologies.join(", "),
		...(project.github && {
			codeRepository: project.github,
		}),
		...(project.liveUrl && {
			workExample: {
				"@type": "WebSite",
				url: project.liveUrl,
			},
		}),
	};
}
