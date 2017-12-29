'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '123456';

  // add your config here
  config.middleware = [];

  // mongo config
  config.mongoRest = {
    url: 'mongodb://127.0.0.1/di-ting',
  };


  return config;
};
