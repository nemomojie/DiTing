'use strict';

module.exports = {
  entry: '/app/public/entry/index.js',
  output: {
    filename: 'mo-test-webpack.bundle.js',
    path: '/dist/',
  },
  module: {
    rules: [
      { test: /\.vue$/, use: 'vue-loader' },
    ],
  },
};
