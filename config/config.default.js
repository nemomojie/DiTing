'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1513774152400_3296';

  // add your config here
  config.middleware = [
    'testmid',
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

  config.testmid = {
    name: 'momojie',
  };

  return config;
};
