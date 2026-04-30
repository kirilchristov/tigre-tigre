---
name: pr-push
description: Prepare and push a PR-ready branch update. Use when bumping the project version, running the full local verification sequence, and only committing and pushing if all checks pass. Default to a patch bump unless the user asks for minor, major, or a specific version.
---

# PR Push

Use this skill for a safe "bump, verify, commit, push" workflow.

## Default Behavior

1. Inspect git status and the current branch before making changes.
2. Find the project version sources and bump them consistently:
   Default to a patch bump.
   If the user specifies a version or bump type, use that instead.
3. Run the full local verification sequence.
4. Stop immediately if any verification step fails.
5. Only if all checks pass:
   Stage the intended files.
   Create a conventional commit.
   Push the requested branch or branches.

## Version Bump Rules

1. For Node repos, check `package.json` and lockfiles first.
2. Update every authoritative version location in one pass.
3. Do not guess extra release files unless they already exist in the repo.
4. Mention the old and new version in the final summary.

## Verification Order

Prefer the repo's own scripts when available.

1. `npm run lint`
2. `npm run typecheck`
3. `npm test`
4. `npm run build`

If the repo uses a different package manager or script names, adapt to the local setup instead of forcing npm.

## Commit And Push Rules

1. Do not commit or push if the worktree contains unrelated unknown changes that could be mixed into the release bump. Ask before proceeding if the diff is ambiguous.
2. Use a conventional commit:
   `chore: bump version to X.Y.Z`
   If the version bump ships a specific fix, a more specific commit is acceptable.
3. Push the current branch by default.
4. If the user asks to update another branch such as `preview`, fast-forward it to the same commit when safe, then push it too.
5. Only create or update a GitHub PR if the user explicitly asks for that step.

## Failure Handling

1. If any check fails, do not commit.
2. Report the first failing command and the relevant error.
3. Fix the issue if it is clearly in scope; otherwise stop and ask.

## Quick Use

- "Use `$pr-push` and do a patch bump."
- "Use `$pr-push` to bump to `1.4.2`, verify, and push `main` and `preview`."
- "Use `$pr-push` for this branch, but stop before pushing."
