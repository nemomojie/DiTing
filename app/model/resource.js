'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const ResourceSchema = new mongoose.Schema({
    name: {
      type: String,
      unique: true,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    }
  }, {
    timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
  });
  return mongoose.model('Resource', ResourceSchema)
};
