# ui

This library was generated with [Nx](https://nx.dev) and [@nxext/react]()_

## Project generation

```bash
yarn add -D @nxext/react
yarn nx g @nxext/react:library ui --buildable --add-tailwind --dry-run
yarn nx g @nxext/react:library ui --buildable --add-tailwind
```

## Build the library

Run `yarn nx build ui` to build the library with Vite.

## Running unit tests

Run `yarn nx test ui` to execute the unit tests via [Jest](https://jestjs.io). Mybe not so important in a UI components library.

## Configure Styleguidist

Add `styleguide.config.js` to the root of the package:

<details>
<summary><code>packages/ui/styleguide.config.js</code></summary>

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

It contains 3 important sections:

1. `components`: specifies the path to UI-components.
2. `propsParser`: specifies `react-docgen-typescript` as our parser so that our Styleguidist "understands" Typescript types and interfaces without the need for prop types.
3. `webpackConfig`: our minimal webpack configuration independently of any other existing one anywhere inside our monorepo.

## Run Styleguidist scritps

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
