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

Initial project setup:

```bash
$ npx create-nx-workspace@latest --preset=empty
# nx-madrus
# no cloud
$ cd madrus/
$ yarn add -D @nxext/vite @nxext/vitest vitest/ui
$ yarn nx g @nxext/vite:application it-force     # main application
$ yarn nx g @nxext/react:library ui --buildable  # shared components library
```

?> I have used the `--buildable` flag for the library just in case, not sure yet if it is necessary in our case.

!> The newly created `it-force` application is now located inside the `apps` folder and the newly created `ui` library inside the `libs` folder. That is a big difference with `@nrwl/react` that creates both applications and libraries inside the `packages` folder.

We need to fix a couple of small issues with `package.json`.

1. Move `tslib` from `dependencies` to `devDependencies`
2. Switch from `npm` to `yarn`
    ```bash
    $ npx rimraf node_modules/ package-lock.json
    $ yarn
    ```

I have renamed my main git branch from `master` to `main`.

Vite requires a couple of fixes for our `tsconfig.base.json`:

```json
...
"compilerOptions": {
  "isolatedModules": true,
}
...
```

And last but not least, I have copied my favorite `prettier` en `eslint` related files from another project.

### Plugins

This is the list of installed plugins (`yarn nx list`):

```text
> NX Installed plugins:
   @nrwl/cypress (executors,generators)
   @nrwl/jest (executors,generators)
   @nrwl/js (executors,generators)
   @nrwl/linter (executors,generators)
   @nrwl/node (executors,generators)
   @nrwl/react (executors,generators)
   @nrwl/storybook (executors,generators)
   @nrwl/web (executors,generators)
   @nrwl/workspace (executors,generators)
   @nxext/react (generators)
   @nxext/vite (executors,generators)
   @nxext/vitest (executors,generators)
   nx (executors)
   nx-plugin-vite (executors,generators)
```

We can check __capabilities__ of an installed plugin like this:

```bash
yarn nx list @nrwl/react
```

### Generate a new React project or library

To see the generation options, run something like this:

```bash
yarn nx g @nxext/vite:application --help
yarn nx g @nrwl/react:application --help
```

Use `--dry-run` option to see the dialog and the list of files to be created without actually creating them.

```bash
yarn nx g @nxext/vite:application --dry-run
yarn nx g @nrwl/react:application --dry-run
```

When you are satisfied, run the same command without `--dry-run` flag.

For `@nrwl/react` my answers would be:

- `IT Force`
- `none`
- `React Router`

We would see two new packages inside the `packages` folder: `it-force` and `it-force-e2e`.

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
