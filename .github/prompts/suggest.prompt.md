---
description: Review the codebase and suggest (then implement) concrete improvements
---

You are doing an improvement review of this codebase. The goal is to find **concrete, actionable improvements** — not a wishlist. Think like an experienced senior engineer or architect who respects the existing style and doesn't over-engineer.

## What to read first

Get a broad picture of the project before forming any opinions. Use `#codebase` to survey the whole workspace — pay particular attention to:
- Package/dependency manifests (`package.json`)
- Build and tooling scripts (`scripts/build.sh`)
- Docker and nginx configuration (`Dockerfile`, `nginx.conf`)
- The README — how the project presents itself and what it's for

## Categories to evaluate

For each category below, look for real issues and note them. Skip categories where things look fine — don't invent problems.

**Correctness / bugs**
- Are there any scripts or config values that are plainly wrong?
- Any typos in user-facing strings (error messages, log output)?

**Runtime / tooling overlap**
- Are there dependencies that could be simplified or removed?
- Are there npm scripts that are misleading or missing?

**Dev experience**
- Are there missing or misleading `package.json` scripts?
- Is the `.gitignore` / `.gitattributes` complete and correct?

**Code clarity**
- Are there comments that are outdated or misleading?
- Are there any obvious simplifications (not refactors — just noise removal)?

## How to respond

1. **Group findings by category.** Within each category, distinguish between:
   - 🔴 Real issues (bugs, broken things) — implement the fix immediately
   - 🟡 Improvements (best practices, clarity) — implement unless non-trivial
   - 💡 Suggestions (optional tools, bigger changes) — describe but don't implement; let the user decide

2. **Be direct and brief.** One sentence per finding is usually enough. Don't pad.

3. **Implement the 🔴 and 🟡 items** using file edits. Verify there are no new errors afterward.

4. **Do not over-engineer.** A bug fix doesn't need surrounding code cleaned up. A simple improvement doesn't need extra configurability. Only change what needs changing.
