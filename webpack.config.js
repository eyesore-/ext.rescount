const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: {
    popup: './popup/popup.js',
    background: './background/index.js',
    init: './background/init.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
}
