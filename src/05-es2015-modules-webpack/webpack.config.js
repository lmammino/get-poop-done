const { resolve, join } = require('path')

module.exports = {
  entry: './app.js',
  output: {
    path: resolve(join(__dirname, '..', '..', 'build', 'v5')),
    filename: 'app.js'
  },
  mode: 'production'
}
