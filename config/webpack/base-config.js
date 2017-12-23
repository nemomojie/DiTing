'use strict';

const path = require('path');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  output: {
    filename: '[name].js',
    path: path.join(__dirname, '../../app/dist'), // 纯字符串会被解析成文件系统的绝对路径
  },
  module: {
    rules: [
      { test: /\.vue$/, use: 'vue-loader' },
    ],
  },
};
