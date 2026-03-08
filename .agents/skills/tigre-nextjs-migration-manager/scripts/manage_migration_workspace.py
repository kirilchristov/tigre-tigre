#!/usr/bin/env python3
"""Create and manage a React-to-Next.js migration workspace."""

from __future__ import annotations

import argparse
import re
from pathlib import Path


def slugify(text: str) -> str:
    slug = re.sub(r"[^a-zA-Z0-9]+", "-", text.strip().lower()).strip("-")
    return slug or "untitled"


def ensure_file(path: Path, content: str) -> None:
    if path.exists():
        return
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content.strip() + "\n", encoding="utf-8")


def next_id(folder: Path, prefix: str) -> int:
    pattern = re.compile(rf"^{re.escape(prefix)}-(\d{{3}})-")
    max_id = 0
    if folder.exists():
        for item in folder.glob("*.md"):
            match = pattern.match(item.name)
            if match:
                max_id = max(max_id, int(match.group(1)))
    return max_id + 1


def init_workspace(root: Path, work_dir: str) -> None:
    base = root / work_dir
    folders = [
        "00-intake",
        "01-stories",
        "02-tickets",
        "03-tech-docs/adr",
        "03-tech-docs/rfc",
        "04-status",
    ]
    for folder in folders:
        (base / folder).mkdir(parents=True, exist_ok=True)

    ensure_file(
        base / "README.md",
        """
# Migration Workspace

This workspace tracks the React-to-Next.js migration.

## Structure
- `00-intake/`: ideas, constraints, and success criteria
- `01-stories/`: scoped stories with acceptance criteria
- `02-tickets/`: implementation tickets linked to stories
- `03-tech-docs/`: ADRs and RFCs
- `04-status/`: board and changelog
""",
    )

    ensure_file(
        base / "00-intake/idea-brief.md",
        """
# Idea Brief

## Problem

## Desired Outcome

## Constraints

## Risks

## Out of Scope
""",
    )

    ensure_file(
        base / "04-status/board.md",
        """
# Migration Board

## Backlog

## Ready

## In Progress

## In Review

## Done
""",
    )

    ensure_file(
        base / "04-status/changelog.md",
        """
# Migration Changelog

## YYYY-MM-DD
- Added:
- Changed:
- Verified:
""",
    )


def story_template(story_id: str, title: str) -> str:
    return f"""
# {story_id}: {title}

## Problem

## User Value

## Scope

## Acceptance Criteria
- [ ]
- [ ]

## Dependencies

## Technical Notes

## Split Into Tickets
- [ ]
"""


def ticket_template(ticket_id: str, title: str, story_id: str, ticket_type: str) -> str:
    return f"""
# {ticket_id}: {title}

- Type: {ticket_type}
- Story: {story_id}
- Status: Backlog

## Goal

## Implementation Plan
1.
2.
3.

## Definition of Done
- [ ] Code merged
- [ ] Tests added/updated
- [ ] Manual QA completed
- [ ] Docs updated

## Validation
- [ ] Unit/integration tests
- [ ] Build passes
- [ ] Regression check complete
"""


def doc_template(doc_id: str, title: str, kind: str, related: str | None) -> str:
    related_line = related or "None"
    return f"""
# {doc_id}: {title}

- Type: {kind.upper()}
- Related: {related_line}

## Context

## Decision

## Alternatives Considered

## Consequences

## Rollout Plan
"""


def create_story(root: Path, work_dir: str, title: str) -> Path:
    story_dir = root / work_dir / "01-stories"
    story_num = next_id(story_dir, "STORY")
    story_id = f"STORY-{story_num:03d}"
    file_path = story_dir / f"{story_id}-{slugify(title)}.md"
    file_path.write_text(story_template(story_id, title).strip() + "\n", encoding="utf-8")
    return file_path


def create_ticket(root: Path, work_dir: str, title: str, story_id: str, ticket_type: str) -> Path:
    ticket_dir = root / work_dir / "02-tickets"
    ticket_num = next_id(ticket_dir, "TT")
    ticket_id = f"TT-{ticket_num:03d}"
    file_path = ticket_dir / f"{ticket_id}-{slugify(title)}.md"
    file_path.write_text(
        ticket_template(ticket_id, title, story_id, ticket_type).strip() + "\n",
        encoding="utf-8",
    )
    return file_path


def create_doc(root: Path, work_dir: str, title: str, kind: str, related: str | None) -> Path:
    doc_dir = root / work_dir / "03-tech-docs" / kind
    prefix = "ADR" if kind == "adr" else "RFC"
    doc_num = next_id(doc_dir, prefix)
    doc_id = f"{prefix}-{doc_num:03d}"
    file_path = doc_dir / f"{doc_id}-{slugify(title)}.md"
    file_path.write_text(doc_template(doc_id, title, kind, related).strip() + "\n", encoding="utf-8")
    return file_path


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Manage migration planning workspace")
    parser.add_argument("--root", default=".", help="Repository root (default: current directory)")
    parser.add_argument("--work-dir", default="docs/migration", help="Workspace directory")

    subparsers = parser.add_subparsers(dest="command", required=True)
    subparsers.add_parser("init", help="Create migration workspace folders and starter docs")

    story = subparsers.add_parser("new-story", help="Create a new story markdown file")
    story.add_argument("--title", required=True)

    ticket = subparsers.add_parser("new-ticket", help="Create a new ticket markdown file")
    ticket.add_argument("--title", required=True)
    ticket.add_argument("--story", required=True, help="Story ID like STORY-001")
    ticket.add_argument("--type", default="feature", choices=["feature", "bug", "chore", "docs"])

    doc = subparsers.add_parser("new-doc", help="Create a new ADR or RFC markdown file")
    doc.add_argument("--title", required=True)
    doc.add_argument("--kind", required=True, choices=["adr", "rfc"])
    doc.add_argument("--related", help="Related story/ticket ID")
    return parser


def main() -> None:
    parser = build_parser()
    args = parser.parse_args()

    root = Path(args.root).resolve()
    work_dir = args.work_dir

    if args.command == "init":
        init_workspace(root, work_dir)
        print(f"Initialized migration workspace at {root / work_dir}")
        return

    init_workspace(root, work_dir)

    if args.command == "new-story":
        path = create_story(root, work_dir, args.title)
        print(f"Created story: {path}")
    elif args.command == "new-ticket":
        path = create_ticket(root, work_dir, args.title, args.story, args.type)
        print(f"Created ticket: {path}")
    elif args.command == "new-doc":
        path = create_doc(root, work_dir, args.title, args.kind, args.related)
        print(f"Created doc: {path}")


if __name__ == "__main__":
    main()
