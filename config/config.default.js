'use strict';

module.exports = appInfo => {
  const config = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1513774152400_3296';

  // middleware
  config.middleware = [
  ];

  config.bcrypt = {
    saltRounds: 10
  };

  // mongo config
  config.mongoose= {
    url: 'mongodb://127.0.0.1/di-ting'
  };

  // redis config
  config.redis = {
      client: {
          port: 6379,          // Redis port
          host: '127.0.0.1',   // Redis host
          password: null,
          db: 0,
      },
  };

  return config;
};
