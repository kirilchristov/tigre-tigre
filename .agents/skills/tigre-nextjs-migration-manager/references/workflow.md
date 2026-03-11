# Workflow

## Purpose

Use this workflow to convert migration ideas into trackable delivery units with technical decisions captured.

## Cadence

1. Intake:
   Record objective, risk, and constraints in `00-intake/idea-brief.md`.
2. Storying:
   Create one or more story files in `01-stories/`.
3. Ticketing:
   Create delivery tickets in `02-tickets/` linked to story IDs.
4. Technical docs:
   Write ADRs or RFCs for architecture-impacting decisions.
5. Execution:
   Move ticket status on the board and keep `changelog.md` current.
6. Verification:
   Confirm acceptance criteria, regression checks, and deployment readiness.

## Operating Rules

1. Keep each story outcome-based, user-visible, and demoable.
2. Keep each ticket independently testable.
3. Limit ticket WIP to reduce context switching.
4. Document irreversible architectural choices as ADRs before implementation.
5. Close all done tickets with explicit evidence of validation.

## Definition of Ready

A story is ready when:

1. Problem and user value are clear.
2. Scope and non-goals are explicit.
3. Dependencies are listed.
4. Acceptance criteria are measurable.
5. Required technical docs are either written or identified.

## Definition of Done

A ticket is done when:

1. Implementation is complete and reviewed.
2. Tests pass and regression risk is checked.
3. Relevant docs are updated.
4. Board and changelog reflect current state.
