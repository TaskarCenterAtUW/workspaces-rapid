---
name: suggest
description: Review the codebase and suggest improvements, without making edits. Use when asked for a review, an audit, or ideas for what to improve.
argument-hint: additional optional context
---

Find concrete improvements and flag things worth tracking for future work. Respect the existing style; don't over-engineer. Report findings only — do not make edits. The user will choose which suggestions to implement.

If the user provided additional context with the prompt, treat it as a focus area (e.g. "focus on Docker config", "performance only").

## Steps

1. Read `AGENTS.md` to understand the project structure.
2. Survey the codebase, paying particular attention to:
   - Package/dependency manifests (`package.json`, etc.)
   - Build and tooling scripts (`scripts/build.sh`)
   - Docker and nginx configuration (`Dockerfile`, `nginx.conf`)
   - GitHub Actions workflows (`.github/workflows/`)
   - `README` — how the project presents itself

## Categories to evaluate

Skip categories where things look fine. Don't invent problems.

**Correctness / Bugs** — wrong config values, broken scripts, typos in user-facing output

**Code Quality** — outdated practices, duplicated logic, unnecessary indirection, misleading comments, obvious simplifications

**Performance** — unnecessary looping, extra copies, redundant calls

**Docker / nginx** — image size, layer caching, nginx config correctness, security headers

**CI / deployment** — GitHub Actions workflows: outdated action versions, missing permissions scoping, secrets handling, steps that could fail silently

**Runtime / tooling** — `npm`/`yarn`/`bun` assumptions in scripts (any package manager should work), dependency aliases and local `file:` paths

**Developer Experience** — missing or misleading `package.json` scripts, incomplete `.gitignore`/`.gitattributes`, missing docs or source comments

**Architecture / Technical Debt** — signs that complexity is accumulating: growing god-objects, framework or library choices that are becoming a liability, inconsistent patterns across similar code, coupling that makes changes harder than they should be, conventions the project has outgrown

## How to respond

Group findings by category. Number each suggestion sequentially across all categories (1, 2, 3…) so the user can refer to them by number. For each finding:
- 🔥 Actionable issue (bug, broken) — should be fixed soon
- 👉 Improvement (best practice, clarity) — worth doing
- 💡 Suggestion (optional, bigger change) — idea to track for future work
