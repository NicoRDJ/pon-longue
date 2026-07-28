# PON Lounge — La Sala del Tiempo

The real, production-track site for **PON Lounge**, a luxury lounge in
Medellín themed around a room of exotic watches — horology, precision, and
timeless nightlife. Built with Next.js (App Router) + TypeScript + Tailwind
CSS v4, deployable on Vercel.

> This repo replaces the static HTML preview that used to live in
> `../borrador pon lounge/site`. That folder is kept only as an archived
> reference for the earlier draft — all new work happens here.

**Brand direction (locked in):**

- **Concept:** "La Sala del Tiempo" — a lounge staged like a collector's room
  of exotic watches.
- **Tagline:** _"Donde el tiempo se detiene y el lujo no tiene hora."_
- **Palette:** obsidian black + brass/gold, with a deep emerald accent.
  Typography: Playfair Display (headings) + Inter (body).

Everything else (menu, reservations, gallery, real address/contact) is still
placeholder/sample content pending the client's real information — this repo
is intentionally starting small (hero + concept section) and will grow.

## Tech stack

| Concern       | Choice                                           |
| ------------- | ------------------------------------------------ |
| Framework     | Next.js 16 (App Router, Turbopack)               |
| Language      | TypeScript (strict)                              |
| Styling       | Tailwind CSS v4 (CSS-first `@theme` config)      |
| Unit tests    | Vitest + React Testing Library                   |
| E2E tests     | Playwright                                       |
| Lint / format | ESLint (`eslint-config-next`) + Prettier         |
| Git hooks     | Husky + lint-staged (auto lint/format on commit) |
| CI            | GitHub Actions (`.github/workflows/ci.yml`)      |
| Hosting       | Vercel                                           |

## Getting started

Requires Node 20+.

```bash
npm install
cp .env.example .env.local   # then fill in real values as they become available
npm run dev
```

The app runs at **http://localhost:3100** (not the Next.js default 3000 —
pinned explicitly so it never collides with other local projects).

## Scripts

| Script                 | What it does                                    |
| ---------------------- | ----------------------------------------------- |
| `npm run dev`          | Start the dev server on port 3100               |
| `npm run build`        | Production build                                |
| `npm run start`        | Serve the production build (port 3100)          |
| `npm run lint`         | ESLint                                          |
| `npm run lint:fix`     | ESLint with autofix                             |
| `npm run format`       | Prettier — write                                |
| `npm run format:check` | Prettier — check only (used in CI)              |
| `npm run typecheck`    | `tsc --noEmit`                                  |
| `npm run test`         | Unit tests (Vitest), single run                 |
| `npm run test:watch`   | Unit tests, watch mode                          |
| `npm run test:e2e`     | E2E tests (Playwright, builds + serves the app) |
| `npm run test:e2e:ui`  | E2E tests with Playwright's UI runner           |

## Project structure

```
src/
  app/            # App Router routes, layout, metadata (robots.ts, sitemap.ts)
  components/     # Reusable UI (co-located *.test.tsx unit tests)
e2e/              # Playwright end-to-end specs
.github/workflows/ci.yml   # Lint, typecheck, unit tests, build, e2e on every PR
```

Kept flat on purpose while the project is small. As real features land
(menu, reservations wizard, gallery — ported and rebuilt from the static
draft), expect `lib/`, `types/`, and route groups to show up under `src/`.

## Environment variables

See `.env.example` for the full list with comments. Copy it to `.env.local`
(gitignored) and fill in real values — never commit secrets.

`NEXT_PUBLIC_ENV=production` is what flips `robots.ts`/`sitemap.ts` to allow
indexing. Keep it unset (or anything else) until the real content is ready
to go live, so search engines don't index placeholder content.

## Deployment (Vercel)

This repo has not been connected to Vercel or GitHub yet. To do that:

1. Push this repo to a GitHub repository (create one, e.g. `pon-lounge-bar`,
   under whichever account/org should own it).
2. In the [Vercel dashboard](https://vercel.com/new), import that GitHub
   repo — Vercel auto-detects Next.js, no config needed.
3. Add the environment variables from `.env.example` in the Vercel project
   settings (at minimum `NEXT_PUBLIC_SITE_URL` pointing at the real domain,
   and `NEXT_PUBLIC_ENV=production` once content is ready to be indexed).
4. Every push to `main` deploys to production; every PR gets its own
   preview URL automatically — this is how collaborators can review changes
   without needing local setup.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) — branch naming, commit convention,
and the PR checklist (CI must pass: lint, typecheck, unit tests, build, e2e).
