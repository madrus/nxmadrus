# Vite and Vitest

?> __Disclaimer:__ This document is still raw and some of the statements and conclusions may be wrong as not thoroughly tested yet or not working as expected or described in the official documentation or relevant public articles found on Internet.

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

Next, go through all the NPM packages in `package.json` dependencies and devDependencies and delete all lines with `jest` in any of them. After that reinstall your project:

```bash
npx rimraf node_modules/ yarn.lock
yarn
```

Finally, go through the files in the project tree and delete any __Jest__ config files anywhere.

## Consistent Configuration

> The biggest challenge is to make sure that both libraries and applications can be run with Vite and tested with Vitest. For that, we need to ensure that the following two things function as they should:
>   - __Vite__ should be able to compile library components imported inside applications, and
>   - __Vitest__ should understand the `@testing-library/jest-dom` extension functions like `toBeInTheDocument()`

### Project root

According to the official Vite/Vitest documentation, both are happy with either `vite.config.js` or `vitest.config.js`. The latter can be used if we wish to have a separate testing configuration. For the moment, we don't need that, therefore we will go with `vite.config.js`.

So, we rename `vitest.config.js` to `vite.config.js` in the root of our project:

<details>
<summary>vite.config.js</summary>

```js
/// <reference types="vitest" />
/// <reference types="vite/client" />
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
  },
})
```

</details>

#### Important takeaways

1. Two plugins, `@vitejs/plugin-react` and `vite-tsconfig-paths`, are necessary for Vite to be able to compile Typescript React and to understand Typescript aliases to be able to import library components inside applications as if they were installed, e.g.
   ```ts
   import MyLibsReactComponent from '@madrus/ui'
   ```
2. Basic global test configuration ensures that:
   1. words like `describe` and `it` be accepted without linting warnings even though Jest is not installed;
   2. unit tests have Jest-like behavior based on `jsdom` environment
   3. we get the possibility to create code coverage reports
