'use strict';

const EGG_MONGOOES_MODELS = Symbol('Application#EggMongooseModels');
const EGG_MONGOOSE_CONNECTION = Symbol('Application#EggMongooseConnection');
const mongoose = require('mongoose');

module.exports = {
  get mongooseModels() {
    if (!this[EGG_MONGOOES_MODELS]) {
      this.initModels_();
    }
    return this[EGG_MONGOOES_MODELS];
  },

  get mongooseConnection() {
    return this[EGG_MONGOOSE_CONNECTION];
  },

  makeConnection(config) {
    this.initModels_();
    const connection = mongoose.createConnection(config.url, config.options);
    connection.on('disconnected', () => {
      this.coreLogger.error('[egg-mongoose-plugin] status : disconnected');
      this.clearOldConnection_();
      if (this.onMongooseDisconnected instanceof Function) {
        this.onMongooseDisconnected();
      }
    });
    connection.on('connected', () => {
      this.coreLogger.info('[egg-mongoose-plugin] status : connected');
      if (this.onMongooseConnected instanceof Function) {
        this.onMongooseConnected();
      }
    });
    connection.on('connecting', () => {
      this.coreLogger.info('[egg-mongoose-plugin] status : connecting');
      if (this.onMongooseConnecting instanceof Function) {
        this.onMongooseConnecting();
      }
    });
    connection.on('disconnecting', () => {
      this.coreLogger.info('[egg-mongoose-plugin] status : disconnecting');
      if (this.onMongooseDisconnecting instanceof Function) {
        this.onMongooseDisconnecting();
      }
    });
    this[EGG_MONGOOSE_CONNECTION] = connection;
    connection
      .then(con => {
      })
      .catch(e => {
        this.coreLogger.error('[egg-mongoose-plugin]: Fail to connect mongodb');
        this.coreLogger.error(e);
        this.clearOldConnection_();
      });
  },

  model(schemaName) {
    if (!this.mongooseConnection || this.mongooseConnection.readyState === 0) {
      this.makeConnection(this.config.mongoose);
      throw new Error('Can not connect to mongodb');
    } else if (this.mongooseConnection.readyState !== 1) {
      throw new Error('Can not connect to mongodb');
    }
    if (!this.mongooseModels[schemaName]) {
      this.mongooseModels[schemaName] = this.mongooseConnection.model(schemaName, this.schema[schemaName]);
    }
    return this.mongooseModels[schemaName];
  },

  clearOldConnection_() {
    if (this[EGG_MONGOOSE_CONNECTION]) {
      this[EGG_MONGOOSE_CONNECTION].removeAllListeners();
      this[EGG_MONGOOSE_CONNECTION].close();
      this[EGG_MONGOOSE_CONNECTION] = null;
    }
  },

  initModels_() {
    this[EGG_MONGOOES_MODELS] = {};
  },
};
