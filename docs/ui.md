# UI with StyleGuidist

This library was generated with [Nx](https://nx.dev) and [@nxext/react]().

## Library Package Generation

```bash
yarn add -D @nxext/react
yarn nx g @nxext/react:library ui --buildable --add-tailwind --dry-run
yarn nx g @nxext/react:library ui --buildable --add-tailwind
```

## Build the library with Vitejs

Run `yarn nx build ui` to build the library with Vite.

## Add Styleguidist with Typescript support

Add the following packages:

```bash
yarn add -D react-styleguidist react-docgen-typescript
```

Styleguidist is a great tool but not without some toll:

1. `Styleguidist` is 100% JS in code en docs, has not TS-support except via `react-docgen-typescript` plugin -- very fragile
2. `Styleguidist` requires referencing, using and maybe even tweaking the existing project webpack config file, otherwise one had to create an alternative `webpack.config.js` -- again very fragile
3. `Styleguidist` presents the UI-components in the `components` folder by default. However, most apps have that folder filled in with React function components rather than Storybook-like UI-components

## Configure Styleguidist

Add `styleguide.config.js` to the root of the package:

<details>
<summary>packages/ui/styleguide.config.js</summary>

```js
const path = require('path')

module.exports = {
  components: 'src/components/**/*.{js,jsx,ts,tsx}',
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
        // Babel loader will use your project’s .babelrc
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
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    externals: {
      react: 'React',
    },
  },
}
```

</details>

The config file contains 3 important sections:

1. `components`: specifies the path to UI-components.
2. `propsParser`: specifies `react-docgen-typescript` as our parser so that our Styleguidist "understands" Typescript types and interfaces without the need for prop types.
3. `webpackConfig`: our minimal webpack configuration independently of any other existing one anywhere inside our monorepo.

Add the scripts section to `package.json` file in the package root:

<details>
<summary>packages/ui/package.json</summary>

```json
...
"scripts": {
  "start-ui": "styleguidist server",
  "build-ui": "styleguidist build"
},
...
```

</details>

## Run Styleguidist scripts

If we have done everything properly, we can run two known Styleguidist scripts:

```bash
### BUILD
yarn nx build-ui ui
# or
yarn nx run ui:build-ui
### START
yarn nx start-ui ui
# or
yarn nx run ui:start-ui
```

## Add Tailwind

Initial setup

```bash
yarn add -D tailwindcss autoprefixer postcss-cli postcss-import
cd packages/ui
npx tailwind init --full
cd ../..
```

Inside the `ui` package create `postcss.config.js` file.

```js
const { join } = require('path')

module.exports = {
  plugins: {
    'postcss-import': {},
    tailwindcss: {
      config: join(__dirname, 'tailwind.config.js'),
    },
    autoprefixer: {},
  },
}
```

Inside the generated `tailwind.config.js` we expand the `content` section:

```js
const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind')
const { join } = require('path')

module.exports = {
  content: [
    join(__dirname, './src/**/!(*.spec).{html,ts,tsx}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  ...
}
```

Inside the `src/assets` folder, we create `tailwind.css`:

```css
@import "tailwindcss/base";
@import "./custom-base-styles.css";

@import "tailwindcss/components";
@import "./custom-components.css";

@import "tailwindcss/utilities";
@import "./custom-utilities.css";
```

You will probably see the linting warning: `Unknown at rule @tailwindcss`. In VSCode we can add [PostCSS Language Support](https://marketplace.visualstudio.com/items?itemName=csstools.postcss) extension to get rid of this warning (tip of TailwindCSS).

## Unit testing with Jest

To be able to use extended functions of `@testing-library/jest-dom`, we need to install and configure it:

```bash
yarn add -D @testing-library/jest-dom
```

Now add `src/setupTests.ts` file with this line:

```ts
import '@testing-library/jest-dom'
```

Finally, configure Jest to use this setup file by adding two lines to `jest.config.ts`:

```ts
setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
testEnvironment: 'jsdom',
```

Run `yarn nx test ui` to execute the unit tests via [Jest](https://jestjs.io).

!> __TODO:__ replace Jest with Vitest.

