# canshift-docs — Project Rules

Documentation site for CANShift (org: github.com/CANShift) — Astro + Starlight, deployed at canshift.app.

## Commands

- `npm run dev` (:4321) / `build` / `format:check`

## Rules

- All content in English; every surface documented from the driver's or contributor's perspective.
- The changelog page renders GitHub Releases from CANShift/canshift-firmware at build time — release descriptions must stay substantive.
- Analytics: Vercel Analytics + PostHog pageviews; Sentry via `@sentry/astro` — all behind `PUBLIC_*` env, never hardcode keys.

## Workflow

- Branch `type/short-description`; Conventional Commits, subject only.
- PR via `gh pr create`; required checks `lint`, `build`; **rebase and merge only**.
- Deploys: Vercel Git integration — preview per PR, production on main.
