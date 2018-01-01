'use strict';

module.exports = appInfo => {
  const config = {};

  config.eggVueWebpack = {
    clientManifest: require('../app/public/dist/vue-ssr-client-manifest.json'),
    serverBundle: require('../app/public/dist/vue-ssr-server-bundle.json'),
  };

  return config;
};
