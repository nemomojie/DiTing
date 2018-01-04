'use strict';

const webpack = require('webpack');
const merge = require('webpack-merge');
const clientBase = require('./client-config.js');
const devBase = require('./base-client-dev');

module.exports = merge(clientBase, devBase, {
  entry: [ 'webpack-hot-middleware/client' ],
  plugins: [ new webpack.HotModuleReplacementPlugin() ],
});
