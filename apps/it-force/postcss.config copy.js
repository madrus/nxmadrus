const tailwindcss = require('tailwindcss')

module.exports = {
  plugins: [
    tailwindcss('./tailwind.config.js'),
    require('postcss-import'),
    process.env.NODE_ENV === 'production'
      ? [
          require('postcss-flexbugs-fixes'),
          [
            require('postcss-preset-env'),
            {
              autoprefixer: {
                flexbox: 'no-2009',
              },
              stage: 3,
              features: {
                'custom-properties': false,
              },
            },
          ],
          [
            require('cssnano'),
            {
              preset: 'default',
            },
          ],
        ]
      : // No transformations in development
        undefined,
  ],
}
