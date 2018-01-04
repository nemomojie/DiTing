'use strict';

const webpack = require('webpack');

module.exports = {
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({ 'process.env': { NODE_ENV: '"development"' } }),
  ],
};
