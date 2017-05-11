path = require 'path'
HtmlWebpackPlugin = require 'html-webpack-plugin'

module.exports =
  entry: './src/main.ts'
  output:
    filename: "app-#{Date.now()}.js"
    path: path.resolve __dirname, 'dist'
  module:
    loaders: [
        test: /\.ts$/
        loader: 'ts-loader'
      ,
        test: /\.pug$/
        loader: 'pug-ng-html-loader'
      ,
        test: /\.css$/
        loader: 'style-loader!css-loader'
    ]
  resolve:
    extensions: ['.js', '.json', '.ts', '.pug']
  plugins: [
    new HtmlWebpackPlugin(
      filename: 'index.html'
      template: './src/index.pug'
    )
  ]
