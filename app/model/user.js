module.exports = app => {
  const mongoose = app.mongoose;
  const { ObjectId } = mongoose.Schema.Types;
  const UserSchema = new mongoose.Schema({
    username: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    createTime: {
      type: Date,
      default: Date.now
    },
    modifiedTime: {
      type: Date,
      default: Date.now
    }
  });
  return mongoose.model('User', UserSchema)
};
