# workspaces-rapid

[![License](https://img.shields.io/badge/license-ISC-blue.svg)](LICENSE.md)

This repository packages multiple versions of [Rapid](https://rapideditor.org) (a front-end OSM editor) into a single nginx Docker container, serving them as static files.


## How it works

- `rapid2` is installed from npm (`@rapideditor/rapid@^2.x`)
- `rapid3` is currently a local `file:../rapid` dependency (not yet published to npm); once published it will become a normal npm alias too
- `scripts/build.sh` installs nothing — it just copies `node_modules/rapid2/dist` and `node_modules/rapid3/dist` into `./dist/rapid2/` and `./dist/rapid3/`
- `./dist/` is **gitignored** on development branches to avoid churn; it is committed only on dedicated release branches
- The Dockerfile is intentionally minimal: it just copies `./dist/` into an nginx image


## Deployment context

This repo is referenced by [`workspaces-stack`](https://github.com/TaskarCenterAtUW/workspaces-stack) (a separate repo), which `git clone`s this project and builds the Docker image via `docker-compose.build.yml`. No build happens inside Docker — the pre-built `dist/` is all that's needed.

See the [RELEASE.md](RELEASE.md) for the release checklist.


## Developer workflow

```sh
npm install        # or bun/yarn/pnpm — any package manager works
sh ./scripts/build.sh   # populates ./dist/
docker build -t workspaces-rapid .
docker run --rm -p 8080:80 workspaces-rapid
```
You should be able to access:
- http://localhost:8080/rapid2/
- http://localhost:8080/rapid3/


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for setup instructions and contribution guidelines.


## License

Available under the [ISC License](https://opensource.org/licenses/ISC). See [LICENSE.md](LICENSE.md).
