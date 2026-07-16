---
description: Reflect on recent work and bring all project documentation up to date
argument-hint: additional optional context
---

Update all project documentation to match the current state of the code. Fix gaps, stale content, spelling mistakes, and anything unclear. Make all edits — do not just list findings. Do not commit; the user will review first.

If the user provided additional context with the prompt, treat it as a focus area (e.g. "only README", "check AGENTS.md is accurate").

## Steps

1. Read `AGENTS.md` to understand the project structure.
2. Review the current chat session history — primary source of context for what changed.
3. Run `git log --oneline -20` to confirm what was actually landed.
4. Search the codebase as needed to verify current state.

## What to update

- Inline documentation (JSDoc, comments)
- Markdown files (`README`, design docs, contributing guides)
- Agent instructions (`AGENTS.md`, `copilot-instructions`, etc.)
- Working memory — e.g. `SCRATCHPAD.md`, `.scratchpad/*`, or whatever convention this project uses (see `AGENTS.md`)

- Any tool, script, or workflow guidance is still accurate
- Nothing important from recent work is missing

### README.md
The public face of the project. Check that:
- The feature list / description still reflects what the project does
- Setup and usage instructions still work as written
- Any referenced scripts, commands, or file paths still exist and are correct
- Version numbers or compatibility notes aren't stale

### CONTRIBUTING.md (if present)
Check that:
- Development setup instructions are still accurate
- Any described workflow (build steps, naming conventions, PR process) reflects current practice

### Other markdown files
(RELEASE.md, etc.)
- RELEASE.md or similar: check that documented release steps match current tooling

### Prompt files (`.github/prompts/*.prompt.md`, `.instructions.md`, etc.)
Check that:
- Referenced file paths, script names, and commands still exist
- Any example version numbers or outputs are not misleading
- Steps are still in the right order

### Inline code documentation
Look for comments in source files that reference something that has since changed:
- Outdated file paths or module names
- Comments describing behavior that has been refactored
- TODO/FIXME comments that have been resolved by recent work (remove or update them)

---

## How to respond

For each layer, report one of:
- ✅ **Up to date** — nothing to do
- 🟡 **Updated** — briefly describe what you changed
- 💡 **Flag for user** — something needs a human decision

Keep it brief. One line per finding is enough.
Make all edits directly — don't ask for permission on small fixes.
