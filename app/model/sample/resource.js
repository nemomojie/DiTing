'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const ResourceSchema = new Schema({
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
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  }, {
    timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
  });
  return mongoose.model('Resource', ResourceSchema)
};
