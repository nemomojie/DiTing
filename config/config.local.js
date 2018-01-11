'use strict';

module.exports = appInfo => {

  const config = {};

  config.eggVueWebpack = {
    client: {
      config: require('../build/webpack/client-config-dev'),
      publicPath: '/public/dist/',
      manifestName: '/public/dist/vue-ssr-client-manifest.json',
    },
    server: {
      config: require('../build/webpack/server-config-dev'),
      publicPath: '/public/dist/',
      bundleName: '/public/dist/vue-ssr-server-bundle.json',
    },
  };

  config.development = {
    ignoreDirs: [ '../app/view' ],
  };

  // disable csrf to test on post man
  config.security = {
    csrf: {
      enable: false,
    },
  };

  return config;
};
