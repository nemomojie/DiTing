'use strict';


const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          extractCSS: true,
        },
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin({ filename: 'common.css' }),
    new webpack.DefinePlugin({ 'process.env': { NODE_ENV: '"production"' } }),
  ],
};
