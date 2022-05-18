const path = require('path')

module.exports = {
  components: 'src/ui/**/*.{js,jsx,ts,tsx}',
  propsParser: (filePath, source, resolver, handlers) => {
    const { ext } = path.parse(filePath)
    return ext === '.tsx'
      ? require('react-docgen-typescript').parse(
          filePath,
          source,
          resolver,
          handlers
        )
      : require('react-docgen').parse(source, resolver, handlers)
  },
  webpackConfig: {
    module: {
      rules: [
        // Babel loader will use your project’s babel.config.js
        {
          test: /\.(js|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
        // Other loaders that are needed for your components
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
  },
}
