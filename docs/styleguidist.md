# StyleGuidist

This library was generated with [Nx](https://nx.dev) and [@nxext/react]().

## Library Package Generation

```bash
yarn nx g @nxext/react:library ui --buildable --dry-run
yarn nx g @nxext/react:library ui --buildable
```

?> I have used the `--buildable` flag here just in case, not sure yet how exactly I will be using the library.

## Add Styleguidist with Typescript support

Add the following packages:

```bash
yarn add -D react-styleguidist react-docgen-typescript
```

Styleguidist is a great tool but not without some toll:

1. `Styleguidist` is 100% JS in code en docs, has no TS-support out-of-the-box, so we need `react-docgen-typescript` plugin.
2. `Styleguidist` uses Webpack, so it needs a reference to some `webpack.config.js` in order to tweak it. However, we don't have one in our project.Fortunately, it is possible to create a `webpackConfig` section in the `styleguide.config.js` and it will be happily used. :smiley:
3. `Styleguidist` by default presents all the UI-components inside the `components` folder. This is fine for libraries but not necessarily for applications. The latter can have that folder filled in with complex React function components, not just Storybook-like UI-components.

## Configure Styleguidist

Add `styleguide.config.js` to the root of the package:

<details>
<summary>libs/ui/styleguide.config.js</summary>

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
<summary>libs/ui/package.json</summary>

```json
...
"scripts": {
  "start-ui": "styleguidist server",
  "build-ui": "styleguidist build"
},
...
```

</details>

## Run Styleguidist

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
