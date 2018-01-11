'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const ClientSchema = new mongoose.Schema({
    clientId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    clientSecret: {
      type: String,
      required: true,
    },
    grants: [{
      type: String,
    }],
    redirectUris: [{
      type: String,
    }],
    username: {
      type: String,
    },
  }, {
    timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' },
  });
  return mongoose.model('Client', ClientSchema);
};
