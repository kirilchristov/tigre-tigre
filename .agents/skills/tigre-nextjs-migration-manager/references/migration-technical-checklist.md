# Migration Technical Checklist

Use this checklist when planning stories and reviewing pull requests in the React-to-Next.js migration.

## Routing and Rendering

1. Map each React Router route to an App Router segment.
2. Decide Server Component vs Client Component boundaries.
3. Add `loading` and `error` states where needed.
4. Preserve or improve metadata and SEO behavior.

## Data and State

1. Define fetch location for each data dependency.
2. Move server-safe fetches to server-side execution.
3. Keep client state only for required interactivity.
4. Confirm caching/revalidation strategy is explicit.

## Assets and Styling

1. Place static assets in `public/` or optimized pipelines.
2. Replace eligible images with Next.js image handling.
3. Verify style consistency and hydration safety.
4. Validate responsive behavior on mobile and desktop.

## Quality and Observability

1. Update tests for migrated behavior.
2. Run lint, typecheck, build, and smoke tests.
3. Verify analytics and tracking events.
4. Record regressions and follow-up work in changelog.

## Deployment Readiness

1. Validate environment variables and runtime assumptions.
2. Verify redirects, rewrites, and headers.
3. Test preview deployment before production release.
