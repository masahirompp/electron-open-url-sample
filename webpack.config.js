var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    main: "./appsrc/main/main.ts",
    renderer: "./appsrc/renderer/renderer.ts"
  },
  output: {
    path: __dirname + "/app",
    filename: "[name].js"
  },
  resolve: {
    extensions: ['', '.js', '.ts', '.tsx']
  },
  target: 'electron',
  devtool: 'source-map',
  module: {
    loaders: [{
      test: /\.tsx?$/,
      loader: 'babel!ts'
    }]
  },
  plugins: [
    new CopyWebpackPlugin([{
      from: 'appsrc/renderer/renderer.html'
    }]),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin()
  ]
};
