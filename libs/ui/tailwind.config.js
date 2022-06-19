const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind')
const { join } = require('path')

module.exports = {
  content: [
    join(__dirname, 'src/**/*.{html,js,jsx,ts,tsx,md}'),
    join(__dirname, 'styleguide/index.html'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  presets: [require('../../tailwind-workspace-preset.js')],
  darkMode: 'class', // or 'media'
  theme: {
    extend: {},
  },
  plugins: [],
}
