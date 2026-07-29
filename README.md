# PON Lounge — La Sala del Tiempo

The real, production-track site for **PON Lounge**, a VIP lounge in
Medellín built as an ode to time and luxury — precision, exclusivity, and
timeless nightlife (deliberately not a literal theme like an "exotic watch
museum" — the motif is time itself). Built with Next.js (App Router) +
TypeScript + Tailwind CSS v4, deployable on Vercel.

> This repo replaces the static HTML preview that used to live in
> `../borrador pon lounge/site`. That folder is kept only as an archived
> reference for the earlier draft — all new work happens here.

**Brand direction (locked in):**

- **Concept:** "La Sala del Tiempo" — time and VIP/luxury as the motif.
- **Tagline:** _"Donde el tiempo se detiene y el lujo no tiene hora."_
- **Palette:** obsidian black + brass/gold, with a deep emerald accent.
  Typography: Playfair Display (headings) + Inter (body).

Menu, gallery, testimonials, and real address/contact are still
placeholder/sample content pending the client's real information — clearly
marked in the UI (preview banners, "sample" notes) so it's obvious what
still needs replacing.

## Tech stack

| Concern       | Choice                                                   |
| ------------- | -------------------------------------------------------- |
| Framework     | Next.js 16 (App Router, Turbopack)                       |
| Language      | TypeScript (strict)                                      |
| Styling       | Tailwind CSS v4 (CSS-first `@theme` config)              |
| i18n          | Custom ES/EN context (`src/lib/i18n`), no page routing   |
| Database      | Postgres (Vercel Postgres / Neon) + Drizzle ORM          |
| Email         | Resend (automatic reservation confirmations)             |
| Unit tests    | Vitest + React Testing Library                           |
| E2E tests     | Playwright (API responses mocked via route interception) |
| Lint / format | ESLint (`eslint-config-next`) + Prettier                 |
| Git hooks     | Husky + lint-staged (auto lint/format on commit)         |
| CI            | GitHub Actions (`.github/workflows/ci.yml`)              |
| Hosting       | Vercel                                                   |

## Getting started

Requires Node 20+.

```bash
npm install
cp .env.example .env.local   # then fill in real values as they become available
npm run dev
```

The app runs at **http://localhost:3100** (not the Next.js default 3000 —
pinned explicitly so it never collides with other local projects).

Without `DATABASE_URL` set, the reservation wizard still works — it
automatically degrades to manual WhatsApp/call/email booking (see
"Reservations" below). Nothing breaks; you just don't get automatic
confirmation until the database is connected.

## Reservations: automatic, no one has to manage them

The reservation wizard books directly against a database — no person has
to read WhatsApp and reply. The flow:

1. Customer picks a date → the UI fetches real remaining capacity per time
   slot from the database (`GET /api/availability?date=`).
2. Customer fills in their details and hits **Confirmar reserva** →
   `POST /api/reservations` calls a Postgres function, `book_reservation()`,
   that checks capacity and inserts the reservation **atomically** (using
   `pg_advisory_xact_lock` so two people booking the last spot at the same
   moment can't both succeed — no double-booking race condition).
3. On success, a confirmation email is sent immediately via Resend. No
   inbox to check, no reply needed.
4. If a slot is full or something goes wrong, the customer sees that
   instantly and can pick another time — never a false "confirmed".

If the database isn't reachable (not set up yet, or a transient error),
the wizard **automatically falls back** to the original manual flow
(WhatsApp / call / email with a prefilled message) instead of breaking —
see `ReservationWizard.tsx`'s `slotsFailed`/`liveMode` state.

### One-time setup

1. **Provision Postgres.** In the Vercel dashboard, open this project →
   **Storage** → **Create Database** → **Postgres** (this is Neon under the
   hood). This injects `DATABASE_URL` into the project's env vars
   automatically.
2. **Pull the connection string locally:**
   ```bash
   npx vercel login      # opens a browser to authenticate
   npx vercel link       # connect this folder to the Vercel project
   npx vercel env pull .env.local
   ```
3. **Create the tables:**
   ```bash
   npm run db:push
   ```
4. **Install the booking function + seed default time slots/capacity:**
   ```bash
   npm run db:seed
   ```
   Re-running `db:seed` is safe (the function is `CREATE OR REPLACE`, and
   slot seeding upserts).
5. **Add a Resend API key** (resend.com → API Keys → Sending access) as
   `RESEND_API_KEY` in `.env.local` and in Vercel's project env vars. Until
   a real domain (e.g. `ponlounge.co`) is verified in Resend, emails send
   from `onboarding@resend.dev`, which works fine for any recipient — just
   swap the `FROM_ADDRESS` in `src/lib/email.ts` once a domain is verified.

### Changing capacity or time slots

Time slots and their capacity live in the `slot_capacity` table (seeded by
`npm run db:seed` from the defaults in `src/db/seed.ts`). To change them
later without touching code, update that table directly — e.g. via
Vercel's Postgres dashboard/query tab, or Neon's SQL editor. Adding a new
slot is just inserting a row; the availability API and wizard pick it up
automatically.

### Files involved

```
src/db/schema.ts              # Drizzle schema: reservations, slot_capacity
src/db/client.ts               # Lazily-initialized Neon/Drizzle client
src/db/sql/book_reservation.sql  # The atomic booking Postgres function
src/db/seed.ts                  # Installs the function + seeds default slots
src/app/api/availability/route.ts   # GET real-time remaining capacity
src/app/api/reservations/route.ts   # POST — books + triggers confirmation email
src/lib/email.ts                # Resend confirmation email
src/components/ReservationWizard.tsx  # Live mode + manual-fallback UI
```

## Scripts

| Script                 | What it does                                          |
| ---------------------- | ----------------------------------------------------- |
| `npm run dev`          | Start the dev server on port 3100                     |
| `npm run build`        | Production build                                      |
| `npm run start`        | Serve the production build (port 3100)                |
| `npm run lint`         | ESLint                                                |
| `npm run lint:fix`     | ESLint with autofix                                   |
| `npm run format`       | Prettier — write                                      |
| `npm run format:check` | Prettier — check only (used in CI)                    |
| `npm run typecheck`    | `tsc --noEmit`                                        |
| `npm run test`         | Unit tests (Vitest), single run                       |
| `npm run test:watch`   | Unit tests, watch mode                                |
| `npm run test:e2e`     | E2E tests (Playwright, builds + serves the app)       |
| `npm run test:e2e:ui`  | E2E tests with Playwright's UI runner                 |
| `npm run db:generate`  | Generate a Drizzle migration from `schema.ts` changes |
| `npm run db:push`      | Push the current schema straight to the database      |
| `npm run db:seed`      | Install `book_reservation()` + seed default slots     |

## Project structure

```
src/
  app/
    api/availability/  # GET real-time slot capacity for a date
    api/reservations/  # POST — books a reservation
    carta/              # /carta — standalone menu page (accordion), for table QR codes
    layout.tsx, page.tsx, globals.css, robots.ts, sitemap.ts
  components/
    sections/           # Home page sections (Hero, About, MenuTeaser, ...)
    ReservationWizard.tsx, MenuAccordion.tsx, Header.tsx, Footer.tsx, ...
    *.test.tsx           # Co-located unit tests
  db/                    # Drizzle schema, client, atomic booking SQL, seed script
  data/menu.ts           # Sample menu content
  lib/
    i18n/                # ES/EN dictionaries + React context (no page routing)
    config.ts            # Contact details, sourced from env vars
    email.ts              # Resend confirmation email
    reservation.ts         # Date/time formatting, .ics generation, WhatsApp message builder
e2e/                     # Playwright specs (external APIs mocked via page.route())
.github/workflows/ci.yml # Lint, typecheck, unit tests, build, e2e on every PR
```

## Environment variables

See `.env.example` for the full list with comments. Copy it to `.env.local`
(gitignored) and fill in real values — never commit secrets.

`NEXT_PUBLIC_ENV=production` is what flips `robots.ts`/`sitemap.ts` to allow
indexing. Keep it unset (or anything else) until the real content is ready
to go live, so search engines don't index placeholder content.

## Deployment (Vercel)

This repo has not been connected to Vercel yet. To do that:

1. In the [Vercel dashboard](https://vercel.com/new), import the
   `NicoRDJ/pon-longue` GitHub repo — Vercel auto-detects Next.js, no
   config needed.
2. Add the environment variables from `.env.example` (at minimum
   `NEXT_PUBLIC_SITE_URL` pointing at the real domain, and
   `NEXT_PUBLIC_ENV=production` once content is ready to be indexed).
3. Provision Postgres and add `RESEND_API_KEY` as described in
   "Reservations" above, so automatic booking works in production too.
4. Every push to `main` deploys to production; every PR gets its own
   preview URL automatically — this is how collaborators can review changes
   without needing local setup.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) — branch naming, commit convention,
and the PR checklist (CI must pass: lint, typecheck, unit tests, build, e2e).
