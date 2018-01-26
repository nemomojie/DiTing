'use strict';

const mongoose = require('mongoose');
const assert = require('assert');
const path = require('path');

module.exports = app => {
  mongoose.set('bufferCommands', false);
  const config = app.config.mongoose;
  if (!config.promiseLibrary) {
    config.promiseLibrary = Promise;
  }

  assert(config.url, '[egg-mongoose-plugin] url is required on config');

  const dir = path.join(app.config.baseDir, 'app/schema');
  app.loader.loadToApp(dir, 'schema', {
    inject: app,
    caseStyle: 'upper',
    filter(schema) {
      return schema instanceof mongoose.Schema;
    },
  });
  app.makeConnection(config);
};
