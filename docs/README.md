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

I have installed the initial project with this command: `npx create-nx-workspace it-force`. Further, my choices were:
- `ts`
- no Nx Cloud

Then I have deleted `package-lock.json` and ran `yarn` to switch from `npm` to `yarn`. Also, I have rename my main git branch from `master` to `main`.

I have copied my favorite prettier en eslint files from another project.

### Plugins

Added the following plugins:

```bash
yarn add @nrwl/react @nxext/react
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

Styleguidist is a great tool but not without some toll:

1. `Styleguidist` is 100% JS in code en docs, has not TS-support except via `react-docgen-typescript` plugin -- very fragile
2. `Styleguidist` requires referencing, using and maybe even tweaking the existing project webpack config file, otherwise one had to create an alternative `webpack.config.js` -- again very fragile
3. `Styleguidist` presents the UI-components in the `components` folder by default. However, most apps have that folder filled in with React function components rather than Storybook-like UI-components

Here are the tweaks so far.

<details>
<summary><code>apps/it-force/workspace.json</code></summary>

```json
{
  "it-force": {
    "root": "apps/it-force",
    "targets": {
      "start": {
        "executor": "nx:run-script",
        "options": {
          "script": "npx styleguidist server"
        }
      },
      "build": {
        "executor": "nx:run-script",
        "options": {
          "script": "npx styleguidist build"
        }
      }
    }
  }
}
```

</details>

<details>
<summary><code>apps/it-force/styleguide.config.js</code></summary>

```js
const path = require('path')

module.exports = {
  components: 'src/ui/**/*.{js,jsx,ts,tsx}',
  propsParser: (filePath, source, resolver, handlers) => {
    const { ext } = path.parse(filePath)
    return ext === '.tsx'
      ? require('react-docgen-typescript').parse(
          filePath,
          source,
          resolver,
          handlers
        )
      : require('react-docgen').parse(source, resolver, handlers)
  },
  webpackConfig: {
    module: {
      rules: [
        // Babel loader will use your project’s babel.config.js
        {
          test: /\.(js|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
        // Other loaders that are needed for your components
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
  },
}
```

</details>

<details>
<summary><code>apps/it-force/project.json</code></summary>

```json
"configurations": {
  "ui": {
    "executor": "nx:run-script",
    "outputs": [
      "apps/it-force/docs"
    ],
    "options": {
      "script": "styleguidist server --config apps/it-force/styleguide.config.js"
    }
  }
},
```

</details>

