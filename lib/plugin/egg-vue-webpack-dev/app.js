'use strict';

module.exports = app => {
  const wdm = require('webpack-dev-middleware');
  const clientConfig = {
    wdm: wdm(app.eggVueWebpack.clientCompiler, { publicPath: '/public/dist/', serverSideRender: true }),
    match: '/public/dist/',
  };
  const serverConfig = {
    wdm: wdm(app.eggVueWebpack.serverCompiler, { publicPath: '/public/dist/', serverSideRender: true }),
    match: '/public/dist/',
  };
  const eggWdm = require('./app/middleware/eggWdm');
  app.use(eggWdm(clientConfig));
  app.use(eggWdm(serverConfig));
};
