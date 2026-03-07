# Story and Ticket Rules

## Story Rules

1. Use format: `STORY-###-<slug>.md`.
2. Write one story per user-facing outcome.
3. Keep story scope to one deployable milestone.
4. Include at least two acceptance criteria.
5. List dependencies (data, platform, design, SEO, analytics).

## Ticket Rules

1. Use format: `TT-###-<slug>.md`.
2. Link ticket to exactly one primary story.
3. Keep ticket size to half-day to two-day effort.
4. Define exact verification steps.
5. Set ticket type from `feature`, `bug`, `chore`, `docs`.

## Story Splitting Heuristics

Split by:

1. Route boundaries (page or layout groups).
2. Data flow boundaries (client fetch vs server fetch).
3. UI boundaries (component groups with independent QA).
4. Risk boundaries (high-risk changes isolated first).
5. Release boundaries (safe to ship independently).

## Ticket Quality Checklist

Use this checklist before moving a ticket to `Ready`:

1. Goal is specific and measurable.
2. Implementation plan has explicit steps.
3. Dependencies and blockers are noted.
4. Definition of done is complete.
5. Validation plan includes automated and manual checks.
