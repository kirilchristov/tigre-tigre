---
name: tigre-nextjs-migration-manager
description: Plan and execute tigre-tigre React-to-Next.js migration work from intake to delivery. Use when turning migration ideas into scoped stories, splitting stories into actionable tickets, creating ADR/RFC technical documentation, tracking migration status, or setting up and maintaining a consistent docs/migration workspace.
---

# Tigre Nextjs Migration Manager

Use this skill to run migration planning and execution as a repeatable workflow with consistent artifacts.

## Quick Start

1. Initialize workspace:
   `python3 scripts/manage_migration_workspace.py --root <repo-root> --work-dir docs/migration init`
2. Create a story from an idea:
   `python3 scripts/manage_migration_workspace.py --root <repo-root> --work-dir docs/migration new-story --title "<story title>"`
3. Split story into tickets:
   `python3 scripts/manage_migration_workspace.py --root <repo-root> --work-dir docs/migration new-ticket --title "<ticket title>" --story STORY-001 --type feature`
4. Create technical docs when architecture or risk needs written decisions:
   `python3 scripts/manage_migration_workspace.py --root <repo-root> --work-dir docs/migration new-doc --title "<doc title>" --kind adr --related STORY-001`

## Workflow

1. Capture idea in `docs/migration/00-intake/idea-brief.md` using the template in `assets/idea-brief-template.md`.
2. Convert idea into a story in `docs/migration/01-stories/` using `references/story-and-ticket-rules.md`.
3. Split story into tickets in `docs/migration/02-tickets/`:
   Ticket goals must be testable and independently reviewable.
   Keep ticket size to roughly half-day to two-day tasks.
4. Create ADR/RFC docs in `docs/migration/03-tech-docs/` before implementing high-impact decisions.
5. Move tickets across `docs/migration/04-status/board.md` and log notable outcomes in `changelog.md`.

## Progress Visibility

1. Before starting implementation, move the active ticket to `In Progress` in `docs/migration/04-status/board.md`.
2. Announce each major step in the terminal/chat before running it.
3. After each major step, post a short status update with what changed and what is next.
4. When work is complete, move the ticket to `In Review` or `Done` in `board.md`.
5. Append `docs/migration/04-status/changelog.md` with:
   date, ticket ID, summary of changes, and verification performed.

## Migration-Specific Guidance

1. Use `references/migration-technical-checklist.md` during planning and PR review.
2. Resolve migration in vertical slices when possible:
   route/page + data + UI + tests + deployment checks.
3. Keep stories aligned to user-visible outcomes, not framework internals.
4. Use one ticket for one operational concern. Avoid mixed concerns such as "routing + styling + tests" unless tightly coupled.

## Quality Gates

Before marking a ticket `Done`, verify:

1. Acceptance criteria are met and checked off.
2. Tests are added or updated.
3. Build and lint pass locally.
4. Docs are updated for behavior or architecture changes.
5. Risks, follow-up items, and rollout notes are reflected in changelog/tech docs.

## References

1. Read `references/workflow.md` for end-to-end operating cadence.
2. Read `references/story-and-ticket-rules.md` when splitting stories and writing tickets.
3. Read `references/migration-technical-checklist.md` when validating migration coverage.
4. Copy templates from `assets/` when creating custom docs outside script output.
