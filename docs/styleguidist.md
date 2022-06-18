# StyleGuidist

## Add Styleguidist with Typescript support

Styleguidist is a great tool but not without some toll:

1. `Styleguidist` is 100% JS in code en docs, has no TS-support out-of-the-box, so we need `react-docgen-typescript` plugin.
2. `Styleguidist` uses Webpack, so it needs a reference to some `webpack.config.js` that needs to be tweaked. However, we don't have one in our project. Fortunately, there is a workaround. We will add a `webpackConfig` section inside the `styleguide.config.js` and it will be happily used. :smiley:
3. `Styleguidist` by default renders all the UI-components inside the `components` folder which is fine for our shared components library. Should you wish to add it inside an application, don't forget that the `components` folder may also include your complex React function components and not only the UI building blocks components. You may divide your basic and complex components between two folders and then use the `components` setting in your `styleguide.config.js` to specify the location of the one with the basic UI components.

Add the following packages:

```bash
$ yarn add -D react-styleguidist react-docgen-typescript babel-polyfill
```

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
  require: ['babel-polyfill', path.join(__dirname, 'dist/assets/main.css')],
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

The config file contains several important sections:

1. `components`: specifies the path to UI-components.
2. `propsParser`: specifies `react-docgen-typescript` as our parser so that our Styleguidist "understands" Typescript types and interfaces without the need for prop types.
3. `require`: specifies the location of the compiled Tailwind CSS file (see [Tailwind CSS Phyilosophy](./tailwind.md#philosophy)) section.
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
