# Migration status (monorepo → CANShift org)

Split from `tburkhalterr/CANShift` with history. Remaining cutover steps:

1. ~~Re-link Vercel~~ DONE — the Vercel Git integration is connected: preview deploys on PRs, production on main. No VERCEL_* secrets or Actions deploy workflow needed.
2. Update GitHub links in content + the changelog release source to the new firmware repo.
3. Transfer `scope:docs` issues; flip public.

## Observability

- Sentry (project `tmbk/canshift-docs`, region DE) via `@sentry/astro`, active only when `PUBLIC_SENTRY_DSN` is set; source maps upload additionally needs `SENTRY_AUTH_TOKEN`. Both go in the Vercel project env.
- PostHog pageviews via a bundled Head script, active only when `PUBLIC_POSTHOG_KEY` is set (`PUBLIC_POSTHOG_HOST` optional, defaults to EU).
