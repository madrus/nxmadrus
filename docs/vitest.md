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

#### TSConfig - Check Check Double-Check

In the `tsconfig.base.json` ensure the following settings:

<details>
<summary>tsconfig.base.json</summary>

```json
{
  ...
  "compilerOptions": {
    ...
    "paths": {
      "@madrus/ui": [
        "libs/ui/src/index.ts"
      ]
    },
    ...
  },
  ...
  "files": [
    "libs/ui/src/index.ts"
  ],
  ...
}
```

</details>

Check the `tsconfig.node.json` to ensure it references `vite.config.ts` and not `vitest.config.ts`:

```json
"include": [
  "vite.config.ts"
]
```

### Apps and Libs

Presently, I have created two packages: an application `apps/it-force` and a library `libs/ui`. We need to make sure we have several files in the root of each project.

?> Officially, the files inside each application or library folder should extend the same file in the root of the project (see above). However, I failed to make my project work when using this extension technique.

<details>
<summary>vite.config.ts</summary>

```ts
/// <reference types="vitest" />
/// <reference types="vite/client" />
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
    environment: 'jsdom',
    globals: true,
    setupFiles: ['src/setupTests.ts'],
  },
})
```

</details>

This file is a full clone of the same file in the project root. It has however one extra very important setting: `setupFiles: ['src/setupTests.ts']` (see below).

<details>
<summary>vite-env.d.ts</summary>

```ts
/// <reference types="vitest" />
/// <reference types="vite/client" />
```

</details>

As one has already noticed, I am repeating these two references in many placed. Somehow I failed to get the stuff running when I had them inside this file only. :cry:

<details>
<summary>src/setupTests.ts</summary>

```ts
// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'
```

</details>

Again, according to the official documentation referencing this file from `vite.config.ts` should be enough for __Vitest__ to understand `jest-dom` extended functions like `.toHaveTextContent(...)` or `.toBeInTheDocument()`. However, my tests failed to recognize them until I added this import line to each `spec` file.

<details>
<summary>tsconfig.json</summary>

```json
{
  ...
  "compilerOptions": {
    ...
    "noEmit": true,
    ...
    "types": [
      "vite/client"
    ],
    ...
  },
  ...
  "include": [
    "src",
    "vite.config.ts"
  ],
  ...
}
```

</details>

These are the settings common for both applications and libraries. Inside the one in the application (`it-force`) folder, we need to add another very important setting that links the application to the corresponding library:

```json
{
  ...
  "files": [
    "../../libs/ui/src/index.ts"
  ],
  ...
}
```

!> Make sure that this `index.ts` file exports all the necessary library components to be imported in the application.

<details>
<summary>tsconfig.lib.json</summary>

```json
{
  ...
  "compilerOptions": {
    ...
    "types": [
      "vite/client",
      "node"
    ]
    ...
  }
  ...
}
```

</details>

<details>
<summary>tsconfig.spec.json</summary>

```json
{
  ...
  "compilerOptions": {
    ...
    "types": [
      "vitest/globals",
      "node"
    ]
    ...
  }
  ...
}
```

</details>

I am not 100% sure that the settings are the minimal necessary, but everything works, so - hey! - who cares?!

## Scripts

In order to run Vite and Vitest scripts, we need to do a couple of extra steps. When we generate our applications and libraries using `@nxext/vitest`, only the standard targets get configured in our `project.json` files:

- inside `apps/it-force` these are: `build`, `serve`, `lint`, `test`;
- inside `libs/ui` these are:  `build`, `lint`, `test`.

However, there are more options offered by both Vite and Vitest. To use them, we just need to add them as normal NPM scripts to to local `package.json` files in `apps/it-force` and `libs/ui`:

<details>
<summary>package.json</summary>

```json
{
  ...
  "scripts": {
    ...
    "build": "tsc && vite build",
    "coverage": "vitest run --coverage",
    "preview": "vite preview",
    "test": "vitest",
    "test-ui": "vitest --ui",
    ...
  }
  ...
}
```

</details>

!> Don't use colons `":"` in the script names, replace them with dashes `"-"`. Otherwise, Nx engine will give errors trying to parse the terminal commands to run them.

With these new scripts added, we can run them like this:

```bash
yarn nx coverage it-force
yarn nx test-ui ui
```

By the way, this `test-ui` script opens a beautiful Vitest UI to make testing real visual fun. Be sure to try it yourself!
