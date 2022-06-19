const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind')
const { join } = require('path')

module.exports = {
  content: [
    join(__dirname, 'src/**/*!(*.stories|*.spec).{html,js,ts,tsx,md}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  presets: [require('../../tailwind-workspace-preset.js')],
  darkMode: 'class', // or 'media'
  theme: {
    extend: {},
  },
  plugins: [],
}
