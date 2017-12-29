'use strict';

module.exports = app => {
  require('./lib/mongo-rest')(app);
};

