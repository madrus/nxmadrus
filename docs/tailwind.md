# Tailwind CSS

## Philosophy

__Tailwind__ adds content and utility CSS based on our actual code to minimize the resulting CSS bundle. At one time, I was thinking of creating a shared lib with all the Tailwind stuff including my custom styling. But then I realized that it had little added value. Inside such a shared library, we will get no optimization like purging of the not used CSS rules as such a shared library is not aware of the specific utility classes we use in our sibling apps and libs.

The current working concept works as follows. Every sibling app or lib recompiles its own Tailwind CSS taking only its own utility classes in consideration. Consequently, when an application imports shared library components, it needs only to import the components themselves, i.e., `.tsx` but __not__ that library's own compiled CSS. Finally, inside the application we recompile the Tailwind CSS, which will take care of the styles and utility classes but also __include__ the utility classes from those imported shared lib components.

This means that within each app or lib the optimization concerns only the stuff it is using both internally and via import of shared library components. In this way, we will not be duplicating the CSS that will be loaded into the browser.

## Add Tailwind

Initial setup

```bash
yarn add -D tailwindcss autoprefixer cssnano postcss-cli
yarn add -D postcss-import postcss-flexbugs-fixes postcss-preset-env
cd apps/it-force
npx tailwind init
cd ../..
```

## Add PostCSS

Inside the `it-force` package create `postcss.config.js` file inspired by [Nextjs](https://nextjs.org/docs/advanced-features/customizing-postcss-config). The tricky thing was to convert the array notaion to the object notation.

```js
const { join } = require('path')

module.exports = {
  plugins: {
    'postcss-import': {},
    'tailwindcss/nesting': {},
    tailwindcss: {
      config: join(__dirname, 'tailwind.config.js'),
    },
    ...(process.env.NODE_ENV === 'production'
      ? {
          'postcss-flexbugs-fixes': {},
          'postcss-preset-env': {
            autoprefixer: {
              flexbox: 'no-2009',
            },
            stage: 3,
            features: {
              'custom-properties': false,
              'color-mod-function': { unresolved: 'warn' },
            },
          },
          cssnano: { preset: 'default' },
        }
      : {}),
  },
}
```

In VSCode we can add [PostCSS Language Support](https://marketplace.visualstudio.com/items?itemName=csstools.postcss) extension (tip of TailwindCSS).

## Configure CSS Assets

We change the generated `tailwind.config.js` to this:

```js
const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind')
const { join } = require('path')

module.exports = {
  content: [
    join(__dirname, 'src/**/*!(*.stories|*.spec).{html,js,ts,tsx}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  presets: [require('../../tailwind-workspace-preset.js')],
  darkMode: 'class', // or 'media'
}
```

Inside the `src/assets` folder, we create `tailwind.css` file with a bunch of imports. It is very important that the actual styling is imported, not specified in this file:

```css
@import './_tw-base';
@import './_base';
@import './_markdown';

@import './_tw-components';
@import './_components';

@import './_tw-utilities';
```

We place all the partial files to be imported in the same folder.

## Configure Styling Scripts

We add the following scripts to the `package.json` in the root of each application and library:

```json
{
  ...
  scripts: {
    ...
    "build-css": "postcss src/styles/tailwind.css -o dist/styles/main.css --map",
    "watch-css": "postcss src/styles/*.css -o dist/styles/main.css --map -w"
  }
}
```

This will create `main.css` with all the Tailwind and our custom styles inside the `dist/styles` folder of each application and library.
