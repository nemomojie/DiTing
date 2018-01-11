'use strict';

// had enabled by egg
// exports.static = true;
exports.mongoose = {
  enable: true,
  package: 'egg-mongoose',
};

exports.redis = {
  enable: true,
  package: 'egg-redis',
};

exports.sessionRedis = {
  enable: false,
  package: 'egg-session-redis',
};

exports.bcrypt = {
  enable: true,
  package: 'egg-bcrypt',
};

exports.oAuth2Server = {
  enable: true,
  package: 'egg-oauth2-server',
};

exports.passport = {
  enable: true,
  package: 'egg-passport',
};

exports.validate = {
  enable: true,
  package: 'egg-validate',
};
