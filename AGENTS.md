# Agent Notes

## Stack & Constraints

- **Node >=24.0.0** required (`engines` in `package.json`).
- **Astro 6.x** with `output: "server"` and `@astrojs/vercel` adapter. Not a static site.
- **React 19** + **TypeScript**. Tsconfig extends `astro/tsconfigs/strictest`.
- **Biome 2.0.6** handles linting and formatting. Do not add ESLint or Prettier.

## Developer Commands

| Command | What it does |
|--------|--------------|
| `npm run dev` | Astro dev server (default port 4321) |
| `npm run build` | Production build to `./dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run typecheck` | `astro check` — Astro-specific type checking |
| `npm run format` | `biome format --write .` |
| `npm run lint` | `biome lint --write .` |
| `npm run check` | `biome check --write .` (format + lint + organize imports) |

No test runner is configured.

## Content & Data Model

- All content lives in `src/content/` and is typed via `src/content.config.ts` using Astro’s `defineCollection` + Zod.
- Collections: `portfolio`, `article`, `blog`, `chatbot`, `tools`.
- Adding a new collection requires updating `src/content.config.ts` and placing markdown/JSON under `src/content/<collection>/`.

## API Routes

- `src/pages/api/chat.ts` — streaming chat endpoint using `@ai-sdk/openai` (`gpt-4o-mini`). Requires `OPENAI_API_KEY`.
- `src/pages/api/chatbot-context.json.ts` — aggregates portfolio/article/blog stats into a JSON context payload for the chatbot. Uses `getCollection()` from `astro:content`.
- **All API routes must export `prerender = false`** because the site is in server mode.

## Environment

- `OPENAI_API_KEY` is required for the chatbot to work. Copy `.env.example` to `.env` and fill it in.

## Code Style (Biome)

- Tab indentation.
- Double quotes for JS/TS.
- Organize imports enabled (`assist.actions.source.organizeImports`).
- Special linter overrides for `.astro`, `.svelte`, `.vue`: `useConst`, `useImportType`, `noUnusedVariables`, and `noUnusedImports` are turned off.

## Site Constants

- Site URL, name, and author schemas are centralized in `src/utils/schema.ts`. The canonical URL is `https://devfitra.com`.

## GitHub Prompts

- `.github/prompts/portfolio-rewrite.prompt.md` contains a prompt for rewriting portfolio copy in the style of the Booku project. Reference it when editing portfolio markdown descriptions.
