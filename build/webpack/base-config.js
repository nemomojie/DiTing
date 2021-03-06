'use strict';

const path = require('path');

module.exports = {
  output: {
    filename: '[name].js',
    path: path.join(__dirname, '../../app/public/dist/'), // 纯字符串会被解析成文件系统的绝对路径
    publicPath: 'dist/',
  },
  module: {
    rules: [
      {
        test: /\.(ttf|woff2|woff|eot)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
            },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [
  ],
};
