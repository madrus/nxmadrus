const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind')
const { join } = require('path')

module.exports = {
  content: [
    join(__dirname, './src/*.{js,ts,tsx}'),
    join(
      __dirname,
      './src/components/**/*!(*.stories|*.spec).{html,js,jsx,ts,tsx}'
    ),
    join(__dirname, './src/views/**/*!(*.stories|*.spec).{html,js,jsx,ts,tsx}'),
    join(__dirname, './index.html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  presets: [require('../../tailwind-workspace-preset.js')],
  darkMode: 'class', // or 'media'
}
