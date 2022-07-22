const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind')

module.exports = {
  content: [
    './src/components/**/*!(*.spec).{html,js,jsx,ts,tsx}',
    './src/views/**/*!(*.stories|*.spec).{html,js,jsx,ts,tsx}',
    './index.html}',
    '../../libs/ui/src/components/**/*!(*.spec).{js,jsx,ts,tsx}',
    ...createGlobPatternsForDependencies(__dirname),
  ],
  presets: [require('../../tailwind-workspace-preset.js')],
  darkMode: 'class', // or 'media'
  // theme: {
  //   extend: {},
  // },
  // plugins: [],
}
