var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js')

webpackConfig.devtool = false
webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
  sourceMap: false
}));

module.exports = webpackConfig
