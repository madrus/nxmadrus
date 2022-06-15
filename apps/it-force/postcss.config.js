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
