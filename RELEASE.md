# Release Checklist

Optionally, use the `/release` skill in your agent (Claude Code, Copilot Chat, etc.) to automate the build and verification steps.
For the full manual process, follow the sections below.

## Update `main` branch

The `main` branch includes only the scaffolding - shell scripts and Dockerfile.
The `dist/` folder (containing the various Rapid builds) is `.gitignore`d

```sh
git checkout main
npm install              # or bun/yarn/pnpm — any package manager works
sh ./scripts/build.sh    # populates ./dist/
docker build -t workspaces-rapid .
```

You can test that the docker container does serve up Rapid as expected.
```sh
docker run --rm -p 8080:80 workspaces-rapid
```
You should be able to access:
- http://localhost:8080/rapid2/
- http://localhost:8080/rapid3/


## Update `release` branch

The `release` branch checks in the contents of `dist/` too - this makes it suitable for deployment.
It's basically a copy of `main` but with one additional commit appended to it.
(We use `-f` to force check-in all the files in `dist/`)

We then merge `develop` using the `ours` strategy. This keeps the files in `release` exactly as they are,
but records `develop` as merged, so the PR from `release` into `develop` merges without conflicts.

```sh
git checkout release
git reset --hard main
sh ./scripts/build.sh    # populates ./dist/
git add -f dist
git commit -m 'Check in build'
git fetch origin
git merge -s ours origin/develop -m 'Merge develop, keeping release contents'
git push origin -f release
```


## Deployment

This repo uses workflows to deploy to the target environments.

1. Visit https://github.com/TaskarCenterAtUW/workspaces-rapid/pulls and open a Pull Request
2. Select "base:" as `develop`, `staging`, or `production`  (the environment to deploy to)
3. Select "compare:" as `release`
4. Deploy will run when the Pull Request is merged
