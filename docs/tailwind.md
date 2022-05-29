# Tailwind

## Add Tailwind

Initial setup

```bash
yarn add -D tailwindcss autoprefixer postcss-cli postcss-import
cd libs/ui
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

Alternatively, one can use the classic `tailwind.css` without any customizations:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

In this case, you may see the linting warning: `Unknown at rule @tailwind`. In VSCode we can add [PostCSS Language Support](https://marketplace.visualstudio.com/items?itemName=csstools.postcss) extension to get rid of this warning (tip of TailwindCSS).
