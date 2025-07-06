import { defineCollection, z } from "astro:content";

// Define the schema for portfolio projects
const portfolioCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    publishDate: z.date(),
    updatedDate: z.date().optional(),
    startDate: z.date(),
    endDate: z.date().optional(),
    image: z.string().optional(),
    featured: z.boolean().default(false),
    technologies: z.array(z.string()),
    github: z.string().url().optional(),
    liveUrl: z.string().url().optional(),
    order: z.number().default(0),
  }),
});

// Define the schema for blog articles
const articleCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    author: z.string().default("Fitra"),
    authorImage: z.string().optional(),
    featuredImage: z.string().optional(),
    category: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    minutesRead: z.number().optional(),
  }),
});

// Define the schema for general blogs (lifestyle, etc.)
const blogCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    pubDate: z.date(),
    createdAt: z.date().optional(),
    updatedDate: z.date().optional(),
    author: z.string().default("Fitra"),
    category: z.string().optional(),
    categoryColor: z.string().optional(),
    featuredImg: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    minutesRead: z.union([z.number(), z.string()]).optional(),
  }),
});

// Export the collections
export const collections = {
  portfolio: portfolioCollection,
  article: articleCollection,
  blog: blogCollection,
};
