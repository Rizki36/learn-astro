# Copilot Instructions for learn-astro

## Start Here
- Ignore `README.md` for repo guidance; it is still the default Astro starter template.
- Use Node.js `>=24.0.0` as defined in `package.json`.
- Main validation commands:
  - `npm run check`
  - `npm run typecheck`
- Use Biome for formatting and linting. Do not use ESLint or Prettier.

## Architecture
- Astro runs in server mode with the Vercel adapter. See `astro.config.mjs`.
- Static pages and content routes usually set `export const prerender = true`.
- API routes under `src/pages/api/` must set `export const prerender = false`.
- Site-wide metadata constants and schema helpers live in `src/utils/schema.ts`.

## Content Layer
- Content collections are defined in `src/content.config.ts` using `astro/loaders` `glob(...)`, not the legacy `src/content/config.ts` pattern.
- There are three collections in `src/content/`:
  - `portfolio`
  - `article`
  - `blog`
- Schema field names differ across collections. The most important differences:
  - articles use `description` and `featuredImage`
  - blogs use `excerpt` and `featuredImg`
  - portfolio uses `publishDate`, `startDate`, `endDate`, `technologies`, `github`, `liveUrl`
- Content schemas are strict. Match field names and types exactly, especially dates.

## Dynamic Routes
- Route files in `src/pages/article/[slug].astro`, `src/pages/blog/[slug].astro`, and `src/pages/portfolio/[slug].astro` generate paths from collection entries.
- Use `entry.id` for route params, not a frontmatter `slug` field.
- Article and blog routes filter out drafts in production.

## Layouts And SEO
- `src/layouts/BaseLayout.astro` is the root layout for page metadata and shared SEO.
- `src/layouts/ArticleLayout.astro` and `src/layouts/BlogLayout.astro` wrap collection detail pages.
- When adding or changing pages, keep metadata and JSON-LD aligned with helpers in `src/utils/schema.ts`.

## UI Conventions
- The site mixes `.astro` components with React components.
- The chatbot UI lives in `src/components/ChatBot.tsx` and `src/components/MemoizedMarkdown.tsx`.
- Navigation behavior is implemented with a plain script import from `src/components/Navigation.astro` to `src/scripts/menu.js`.
- Styling is split between global CSS files in `src/styles/` and scoped `<style>` blocks inside `.astro` files. Do not introduce CSS Modules unless the repo starts using them elsewhere.
- Images from `src/images/` are imported. Files in `public/` are referenced by absolute `/...` paths.

## Chatbot Notes
- `src/pages/api/chat.ts` streams responses with the AI SDK and loads context from `/api/chatbot-context.json`.
- `src/pages/api/chatbot-context.json.ts` builds chatbot context from all content collections.
- If you change collection schemas or rename content fields, update the chatbot context and any rendering code that depends on those fields.

## Pitfalls
- Prefer `src/content.config.ts` and runtime code over older Astro examples or starter docs.
- Preserve tab indentation and double-quoted JavaScript strings to stay aligned with `biome.json`.
- There is no test framework configured; use `npm run check` and `npm run typecheck` as the default verification path.
