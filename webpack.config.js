const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: './popup/popup.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true
        },
        query: {
          presets: ['react']
        }
      }
    ]
  }
}
