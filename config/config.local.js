'use strict';


const webpack = require('webpack');
const wdm = require('webpack-dev-middleware');
const clientConfig = require('./webpack/client-config');
const serverConfig = require('./webpack/server-config');

const compilers = webpack([ clientConfig, serverConfig ]);

module.exports = appInfo => {

  const config = exports = {};

  config.eggWdm = {
    wdm: wdm(compilers, { publicPath: '/public/dist/', serverSideRender: true }),
    match: '/public/dist/',
  };

  return config;
};
