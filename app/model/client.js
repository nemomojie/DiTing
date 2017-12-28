'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const ClientSchema = new mongoose.Schema({
    clientId: {
      type: String,
      unique: true,
      required: true,
      index: true
    },
    clientSecret: {
      type: String,
      required: true
    },
    grants: [{
      type: String
    }],
    redirectUris: [{
      type: String
    }],
    username: {
      type: String
    }
  });
  return mongoose.model('Client', ClientSchema)
};
