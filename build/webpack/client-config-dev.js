'use strict';

const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./client-config.js');

module.exports = merge(baseConfig, {
  entry: [ 'webpack-hot-middleware/client' ],
  plugins: [ new webpack.HotModuleReplacementPlugin() ],
});
