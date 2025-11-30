# Copilot Instructions for learn-astro

## Project Overview
Personal portfolio website built with **Astro v2.1.9** featuring a content collections architecture. Site domain: `devfitra.com`. Uses **Biome** for formatting/linting (not ESLint/Prettier) and follows the strictest TypeScript config.

## Content Architecture
Three distinct content collections in `src/content/`:
- **`portfolio/`** - Project showcases (technologies, dates, live URLs)
- **`article/`** - Technical writing (tech blog posts)
- **`blog/`** - Lifestyle content (travel, personal topics)

Each collection has unique schemas defined in `src/content/config.ts` with Zod validation. Key differences:
- Portfolio uses `publishDate` + `startDate/endDate`
- Articles use `pubDate` + `minutesRead` (number)
- Blogs use `pubDate` + `minutesRead` (union of number/string) + `categoryColor`

## Dynamic Routes Pattern
All collections use `getStaticPaths()` with `getCollection()`:
```astro
export async function getStaticPaths() {
  const entries = await getCollection('portfolio');
  return entries.map(entry => ({
    params: { slug: entry.slug },
    props: { entry },
  }));
}
```
Blog posts filter drafts in production: `getCollection('blog', ({ data }) => import.meta.env.PROD ? !data.draft : true)`

## Layout Hierarchy
- **`BaseLayout.astro`** - Root layout with comprehensive SEO meta tags (OG, Twitter, canonical), theme color, manifest
- **`BlogLayout.astro`** - Extends BaseLayout for blog/article posts
- **`ArticleLayout.astro`** - Extends BaseLayout for technical articles
- **`PortfolioLayout`** - Likely exists, follow same pattern if creating

All layouts use `Astro.props` for customization (pageTitle, metaDescription, withPadding, withMaxWidth, etc.)

## Styling Conventions
- **Scoped styles** within `.astro` components using `<style>` tags
- **Global CSS** in `src/styles/global.css` with CSS custom properties:
  - Dark theme by default: `--color-background: #161616`, `--color-text: #e0e0e0`
  - Font stack: Inter (Google Fonts) + system fonts
- **CSS Modules** NOT used - prefer scoped Astro styles
- Tabs for indentation (enforced by Biome)

## Component Patterns
- **Navigation** (`src/components/Navigation.astro`) imports client-side JS via `<script>` tag for active menu state
- Components import images from `src/images/` (e.g., `import logo from "../images/logo.svg"`)
- Props destructuring in frontmatter with defaults: `const { withPadding = true } = Astro.props`

## Development Workflow
```bash
npm run dev        # Start dev server (localhost:3000)
npm run build      # Production build to ./dist/
npm run preview    # Preview production build
npm run format     # Biome format (NOT prettier)
npm run lint       # Biome lint (NOT eslint)
npm run check      # Biome format + lint combined
```

## Key Integrations
- **Sitemap** (`@astrojs/sitemap`) configured in `astro.config.mjs` with weekly changefreq, excludes `/admin`
- No testing framework configured
- No UI component library - custom CSS only

## SEO Standards
Every page must include:
- `pageTitle` (appends "| DevFitra")
- `metaDescription` and `metaKeywords`
- OG tags (image, type, URL)
- Twitter card metadata
- Canonical URL (defaults to `Astro.url.href`)

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

## Adding New Content
1. Add markdown file to appropriate collection folder
2. Include all required frontmatter fields per schema in `config.ts`
3. Dates must be in valid Date format (YYYY-MM-DD works)
4. For draft posts, set `draft: true` - they'll be excluded in production builds
