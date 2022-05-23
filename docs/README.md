# Nx Madrus Monorepo

## Table of Contents

- [Home ⇗](/)
- [UI with StyleGuidist ⇗](/ui.md)
- [References ⇗](/references.md)
- [Nx Official Readme ⇗](/nx-readme.md)

## About

This project was generated using [Nx](https://nx.dev).

<p style="text-align: left;">
  <img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="150">
</p>

## Setup

### Nx Root Project Creation

I have installed the initial project with this command: `npx create-nx-workspace@latest`. Further, my choices were:
- React Typescript
- no Nx Cloud
- Stylguidist UI library with `vitejs`

Then I have deleted `package-lock.json` and ran `yarn` to switch from `npm` to `yarn`. Also, I have rename my main git branch from `master` to `main`.

I have copied my favorite `prettier` en `eslint` related files from another project.

### Plugins

Added the following plugins:

```bash
yarn add @nrwl/react @nxext/react @nxext/vitest
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
   @nxext/react (generators)
   @nxext/vite (executors,generators)
   nx (executors)
```

We can check __capabilities__ of an installed plugin like this:

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
yarn nx g @nrwl/react:application --dry-run
```

When you are satisfied, run this command without it.

My answers:

- `IT Force`
- `Emotion`
- `React Router`

We have got created two packages inside the `packages` folder: `it-force` and `it-force-e2e`.

### Run the project

Here is the command:

```bash
yarn nx run it-force:start
# or, as it-force is the default project
yarn nx start
```

### Linting

Run linting by:

```bash
yarn nx run it-force:lint
# or, as it-force is the default project
yarn nx lint
```

Most probably, the first time you run it, it fails because a bunch of extra NPM packages is missing. I have had to install at least the following five as dev dependencies:

- `@nrwl/eslint-plugin-nx`
- `@typescript-eslint/eslint-plugin`
- `@typescript-eslint/parser`
- `eslint`
- `eslint-config-prettier`

## Add Vitest and remove Jest

In the project root run:

```bash
yarn nx g @nxext/vitest:init
```

This will create the `vitest.config.ts` file.

Now, we can add Vitest to any of our packages:

```bash
yarn nx g @nxext/vitest:vitest-project
```
