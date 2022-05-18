# Nx-madrus

This project was generated using [Nx](https://nx.dev).

<p style="text-align: left;"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="150"></p>

## Setup

### Nx Root Project Creation

I have installed the initial project with this command: `npx create-nx-workspace test`. Further, my choices were:
- `ts`
- no Nx Cloud

Then I have deleted `package-lock.json` and ran `yarn` to switch from `npm` to `yarn`. Also, I have rename my main git branch from `master` to `main`.

I have copied my favorite prettier en eslint files from another project.

### Plugins

Added the following plugins:

```bash
yarn add @nrwl/react
```

This is the list of installed plugins (`yarn nx list`):

```text
> NX Installed plugins:
  @nrwl/cypress (executors,generators)
  @nrwl/jest (executors,generators)
  @nrwl/js (executors,generators)
  @nrwl/linter (executors,generators)
  @nrwl/react (executors,generators)
  @nrwl/storybook (executors,generators)
  @nrwl/web (executors,generators)
  @nrwl/workspace (executors,generators)
  nx (executors)
```

We can check __capabilities__ of the installed plugins, e.g.:

```bash
yarn nx list @nrwl/react
```

### Generate the React Project

To see the generation options, run something like this:

```bash
yarn nx g @nrwl/react:application --help
```

Use `--dry-run` option to see the dialog and the list of files to be created without actually creating them.

```bash
yarn nx g @nrwl/react:application
```

My answers:

- `IT Force`
- `Emotion`
- `React Router`

We have got created two packages inside the `packages` folder: `it-force` and `it-force-e2e`.

### Run the project

Here is the command:

```bash
yarn nx run it-force:start
```

### Linting

Run linting by:

```bash
yarn nx run it-force:lint
```

Most probably, the first time you run it, it fails because a bunch of extra NPM packages are missing. I have had to install the following five as dev dependencies:

- `@nrwl/eslint-plugin-nx`
- `@typescript-eslint/eslint-plugin`
- `@typescript-eslint/parser`
- `eslint`
- `eslint-config-prettier`

## Styleguidist with Typescript support

Add the following packages:

```bash
yarn add -D react-styleguidist react-docgen-typescript
```



---

## Adding capabilities to your workspace

Nx supports many plugins which add capabilities for developing different types of applications and different tools.

These capabilities include generating applications, libraries, etc as well as the devtools to test, and build projects as well.

Below are our core plugins:

- [React](https://reactjs.org)
  - `npm install --save-dev @nrwl/react`
- Web (no framework frontends)
  - `npm install --save-dev @nrwl/web`
- [Angular](https://angular.io)
  - `npm install --save-dev @nrwl/angular`
- [Nest](https://nestjs.com)
  - `npm install --save-dev @nrwl/nest`
- [Express](https://expressjs.com)
  - `npm install --save-dev @nrwl/express`
- [Node](https://nodejs.org)
  - `npm install --save-dev @nrwl/node`

There are also many [community plugins](https://nx.dev/community) you could add.

## Generate an application

Run `nx g @nrwl/react:app my-app` to generate an application.

> You can use any of the plugins above to generate applications as well.

When using Nx, you can create multiple applications and libraries in the same workspace.

## Generate a library

Run `nx g @nrwl/react:lib my-lib` to generate a library.

> You can also use any of the plugins above to generate libraries as well.

Libraries are shareable across libraries and applications. They can be imported from `@nxmadrus/mylib`.

## Development server

Run `nx serve my-app` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `nx g @nrwl/react:component my-component --project=my-app` to generate a new component.

## Build

Run `nx build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `nx test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

## Running end-to-end tests

Run `nx e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

## Understand your workspace

Run `nx graph` to see a diagram of the dependencies of your projects.

## Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.

## ☁ Nx Cloud

### Distributed Computation Caching & Distributed Task Execution

<p style="text-align: center;"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-cloud-card.png"></p>

Nx Cloud pairs with Nx in order to enable you to build and test code more rapidly, by up to 10 times. Even teams that are new to Nx can connect to Nx Cloud and start saving time instantly.

Teams using Nx gain the advantage of building full-stack applications with their preferred framework alongside Nx’s advanced code generation and project dependency graph, plus a unified experience for both frontend and backend developers.

Visit [Nx Cloud](https://nx.app/) to learn more.
