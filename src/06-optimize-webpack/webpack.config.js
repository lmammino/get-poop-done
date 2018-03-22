const { resolve, join } = require('path')

module.exports = {
  entry: './app.js',
  output: {
    path: resolve(join(__dirname, '..', '..', 'build', 'v6')),
    filename: 'app.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { modules: false }]
            ]
          }
        }
      }
    ]
  },
  mode: 'production',
  devtool: 'hidden-source-map'
}
