'use strict';

module.exports = app => {
  const wdm = require('webpack-dev-middleware');
  const clientConfig = {
    wdm: wdm(app.eggVueWebpack.clientCompiler, { publicPath: '/public/dist/', serverSideRender: true }),
    match: /^\/public\/dist\//,
  };
  const serverConfig = {
    wdm: wdm(app.eggVueWebpack.serverCompiler, { publicPath: '/public/dist/', serverSideRender: true }),
    match: /^\/public\/dist\//,
  };
  const eggWdm = require('./app/middleware/eggWdm');
  app.use(eggWdm(clientConfig));
  app.use(eggWdm(serverConfig));

  const whm = require('webpack-hot-middleware');
  const eggWhm = require('./app/middleware/eggWhm');
  const eggWhmConfig = {
    whm: whm(app.eggVueWebpack.clientCompiler),
    match: /^__webpack_hmr$/,
  };
  app.use(eggWhm(eggWhmConfig));
};
