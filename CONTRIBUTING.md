# Contributing

This project uses **GitHub** to track issues and manage our source code.
- Check out the [Git Guides](https://github.com/git-guides) to learn more.

This project uses **shell scripts** and **Docker** for building and deployment.

If you want to contribute to workspaces-rapid, you'll probably need to:
- Install [Node.js](https://nodejs.org/) (any recent LTS version)
- Install [Docker](https://docs.docker.com/get-docker/)
- `git clone` workspaces-rapid
- `cd` into the project folder
- `npm install` the dependencies

As you change things, you'll want to run:
```sh
sh ./scripts/build.sh    # populates ./dist/
docker build -t workspaces-rapid .
docker run --rm -p 8080:80 workspaces-rapid
```
Then verify that `http://localhost:8080/rapid2/` and `http://localhost:8080/rapid3/` work.

It's also good to check on the dependencies sometimes with commands like:
- `npm outdated` — what packages have updates available?
- `npm update` — apply updates within semver ranges

Try to keep things simple!

## AI-Assisted Contributions

We welcome contributions made with the help of AI tools.
If you use them, you are responsible for understanding and reviewing the output before submitting it.
Generated code, issues, and PR descriptions should be clear and relevant — not verbose for the sake of it.
