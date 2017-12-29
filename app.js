'use strict';

module.exports = app => {
  const isProd = app.config.env === 'prod';

  if (!isProd) {
    // load egg-dev-middleware
    const webpack = require('webpack');
    const wdm = require('webpack-dev-middleware');
    const clientConfig = require('./build/webpack/client-config');
    const serverConfig = require('./build/webpack/server-config');
    const compilers = webpack([ clientConfig, serverConfig ]);

    const eggWdmConfig = {
      wdm: wdm(compilers, { publicPath: '/public/dist/', serverSideRender: true }),
      match: '/public/dist/',
    };
    const eggWdm = require('./app/middleware/eggWdm');
    app.use(eggWdm(eggWdmConfig));
  }
};
