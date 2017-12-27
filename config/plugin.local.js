'use strict';

const path = require('path');

exports.eggVueWebpack = {
  enable: true,
  path: path.join(__dirname, '../lib/plugin/egg-vue-webpack-dev'),
};
