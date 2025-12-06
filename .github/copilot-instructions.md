# Copilot Instructions for learn-astro

## Project Overview
Personal portfolio website built with **Astro v5.16.3** using **server mode** (`output: "server"`) deployed on Vercel. Site domain: `devfitra.com`. Uses **Biome 2.0.6** for formatting/linting (not ESLint/Prettier) and follows the strictest TypeScript config (`extends: "astro/tsconfigs/strictest"`). Requires **Node.js >=20.0.0**.

**Architecture**: Hybrid rendering - static pages with `prerender: true` + dynamic API routes with `prerender: false` for the AI chatbot feature.

## Content Architecture
Three distinct content collections in `src/content/` using **Astro's new glob loader pattern**:
- **`portfolio/`** - Project showcases (technologies, dates, live URLs)
- **`article/`** - Technical writing (tech blog posts)  
- **`blog/`** - Lifestyle content (travel, personal topics)

Each collection has unique schemas defined in `src/content.config.ts` (not `config.ts`) with Zod validation. Key differences:
- **Portfolio**: `publishDate`, `startDate/endDate`, `description` (optional), `technologies` (array), `featured`, `order`, `github`/`liveUrl`
- **Articles**: `pubDate`, `description` (required), `minutesRead` (number, optional), `author`, `featuredImage`, `tags`, `draft`
- **Blogs**: `pubDate`, `excerpt` (required), `minutesRead` (union of number/string, optional), `categoryColor`, `featuredImg`, `tags`, `draft`

**CRITICAL**: Field names differ between collections - articles use `description`, blogs use `excerpt`; articles use `featuredImage`, blogs use `featuredImg`.

## Dynamic Routes Pattern
All collections use `getStaticPaths()` with `getCollection()` and mark `prerender: true`:
```astro
export const prerender = true;

export async function getStaticPaths() {
  const entries = await getCollection('portfolio');
  return entries.map(entry => ({
    params: { slug: entry.id },  // Use entry.id, not entry.slug
    props: { entry },
  }));
}
```
**Important**: Use `entry.id` for params (not `entry.slug`). Articles/blogs filter drafts in production: `getCollection('blog', ({ data }) => import.meta.env.PROD ? !data.draft : true)`

## Layout Hierarchy
- **`BaseLayout.astro`** - Root layout with comprehensive SEO meta tags (OG, Twitter, canonical), theme color, JSON-LD structured data
- **`BlogLayout.astro`** - Extends BaseLayout for blog posts
- **`ArticleLayout.astro`** - Extends BaseLayout for technical articles

All layouts use `Astro.props` for customization (pageTitle, metaDescription, withPadding, withMaxWidth, schemaData, etc.)

## SEO & Structured Data
Every page implements JSON-LD schemas from `src/utils/schema.ts`:
- Base schemas: `personSchema`, `websiteSchema` injected via BaseLayout
- Page-specific schemas: `createProjectSchema()`, `createArticleSchema()`, `createBlogSchema()`
- All pages require: `pageTitle`, `metaDescription`, `metaKeywords`, `canonicalURL`, OG tags
- Sitemap auto-generates at `/sitemap-index.xml` (excludes `/admin`, weekly changefreq)

## Styling Conventions
- **Scoped styles** within `.astro` components using `<style>` tags
- **Global CSS** in `src/styles/global.css` with CSS custom properties:
  - Dark theme by default: `--color-background: #161616`, `--color-text: #e0e0e0`
  - Font stack: Inter (Google Fonts) + system fonts
- **CSS Modules** NOT used - prefer scoped Astro styles
- **Biome formatting**: Tabs for indentation, double quotes for JavaScript strings (configured in `biome.json`)

## Component Patterns
- **Navigation** (`src/components/Navigation.astro`) imports client-side JS via `<script>` tag for active menu state
- Components import images from `src/images/` (e.g., `import logo from "../images/logo.svg"`)
- Props destructuring in frontmatter with defaults: `const { withPadding = true } = Astro.props`

## Development Workflow
```bash
npm run dev        # Start dev server (localhost:4321)
npm run build      # Production build to ./dist/
npm run preview    # Preview production build
npm run format     # Biome format (NOT prettier)
npm run lint       # Biome lint (NOT eslint)
npm run check      # Biome format + lint combined
npm run typecheck  # Astro type checking
```

## AI Chatbot Feature
**Architecture**: React component (`ChatBot.tsx`) with streaming API route (`/api/chat.ts`)
- Uses Vercel AI SDK (`@ai-sdk/react`, `@ai-sdk/openai`) with OpenAI's streaming API
- Context loaded from `/api/chatbot-context.json.ts` (dynamic endpoint, `prerender: false`)
- Context endpoint aggregates all portfolio/articles/blogs into JSON for RAG-style prompting
- Markdown rendering via `react-markdown` in `MemoizedMarkdown.tsx` component
- Styles in `src/styles/chatbot.css`

**Key Implementation Details**:
```typescript
// API routes MUST set prerender: false
export const prerender = false;

export const POST: APIRoute = async ({ request, site }) => {
  // Uses site prop to fetch context dynamically
  const contextUrl = site ? `${site}api/chatbot-context.json` : 'http://localhost:4321/api/chatbot-context.json';
  // ... streaming implementation
}
```

## Key Integrations
- **Vercel Adapter** (`@astrojs/vercel`) - serverless deployment with API routes
- **React** (`@astrojs/react`) - for interactive ChatBot component
- **Sitemap** (`@astrojs/sitemap`) - weekly changefreq, excludes `/admin`
- **RSS Feed** (`@astrojs/rss`) - combined articles + blogs at `/rss.xml`
- No testing framework configured
- No UI component library - custom CSS only

## File Naming
- Components: PascalCase (`BlogCard.astro`, `LatestPosts.astro`)
- Pages: kebab-case or lowercase (`index.astro`, `404.astro`)
- Content files: kebab-case markdown (`.md`)
- Styles: lowercase CSS files

## Common Pitfalls
- Don't use ESLint/Prettier commands - Biome handles all linting/formatting
- Content collection schemas are strict - match field types exactly (dates must be Date objects in frontmatter)
- Image paths: `public/` assets reference with `/`, `src/` assets require imports
- Client-side JS must be in separate files in `src/scripts/` and imported via `<script>` tags
- API routes require `prerender: false`, static pages require `prerender: true`
- Use `entry.id` not `entry.slug` when mapping params in `getStaticPaths()`

## Adding New Content
1. Add markdown file to appropriate collection folder
2. Include all required frontmatter fields per schema in `src/content.config.ts`
3. Dates must be in valid Date format (YYYY-MM-DD works)
4. For draft posts, set `draft: true` - they'll be excluded in production builds
5. RSS feed automatically includes new articles/blogs (filtered by draft status)
