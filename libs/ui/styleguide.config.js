const path = require('path')

module.exports = {
  title: 'Awesome Style Guide',
  components: 'src/components/**/*.{js,jsx,ts,tsx}',
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
  require: ['babel-polyfill', path.join(__dirname, 'styleguide/styles.css')],
  webpackConfig: {
    module: {
      rules: [
        // Babel loader will use your project’s .babelrc
        {
          test: /\.(js|jsx|ts|tsx|md)$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    // resolve: {
    //   extensions: ['.js', '.jsx', '.ts', '.tsx', '.md'],
    // },
    externals: {
      react: 'React',
    },
  },
}
