'use strict';

module.exports = appInfo => {
  const config = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1513774152400_3296';

  // middleware
  config.middleware = [
  ];

  // mongo config
  config.mongo = {
    host: '',
    port: '',
  };

  // redis config
  config.redis = {
    host: '',
    port: '',
  };

  return config;
};
