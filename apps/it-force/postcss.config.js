const { join } = require('path')

module.exports = {
  plugins: {
    'postcss-import': {},
    'tailwindcss/nesting': {},
    tailwindcss: {
      config: join(__dirname, 'tailwind.config.js'),
    },
    'postcss-flexbugs-fixes': {},
    'postcss-preset-env': {
      autoprefixer: {
        flexbox: 'no-2009',
      },
      stage: 3,
      features: {
        'custom-properties': false,
      },
    },
    cssnano: {
      preset: 'default',
    },
  },
}
