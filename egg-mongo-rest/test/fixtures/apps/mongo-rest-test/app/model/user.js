'use strict';

module.exports = app => {
  const mongoRest = app.mongoRest;
  const mongoose = app.mongoose;
  const user = mongoRest.model('User', new mongoose.Schema({
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  })).registerService();
  return user;
};
