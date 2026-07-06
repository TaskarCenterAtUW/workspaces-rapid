---
description: Prepare a new release (build and tag for deployment)
argument-hint: deployment target, e.g. dev, stage, prod
---

You are preparing a deployment for this repo. Do the following steps in order:

1. **Confirm the target** — the deployment target is `${input:version}`. Valid targets are: `dev`, `stage`, `prod`.
   - If the target is not one of these, stop immediately and explain the problem clearly.

2. **Check the current state** by running:
   ```
   git status
   git log --oneline -10
   ```
   Make sure `main` is clean and up to date.

3. **Build and verify**:
   ```
   npm install
   sh ./scripts/build.sh
   ```
   Verify that `dist/rapid2/` and `dist/rapid3/` were populated successfully.

4. **Show the user the remaining manual steps** from `RELEASE.md` — the git operations that follow (force-pushing the release branch, force-tagging) are destructive and should be run by the user directly.
