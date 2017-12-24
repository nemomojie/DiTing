const Service = require('egg').Service;

class UserService extends Service {
  async create (user) {
    return (await this.ctx.model.User({
      username: user.username,
      password: ctx.genHash(user.password),
      name: user.name
    }).save()).toObject()
  };
  async getByName (username) {
    return this.ctx.model.User.findOne({
      username
    }).lean();
  };
  async getById (id) {
    return this.ctx.model.User.findOne({
      _id: id
    })
  };
  async updatePassword (username, password) {
    return this.ctx.model.User.findOneAndUpdate({
      username
    }, {
      password: ctx.genHash(password),
      modifiedTime: new Date()
    }, { new: true }).lean()
  }
  async updatePasswordByOldPassword (oldPassword, newPassword) {
    return this.ctx.model.User.findOneAndUpdate({
      _id: this.ctx.authUser._id,
      password: ctx.genHash(oldPassword)
    }, {
      password: ctx.genHash(newPassword),
      modifiedTime: new Date()
    }, { new: true }).lean()
  }
  async update (user) {
    const authId = this.ctx.authUser._id
    return this.ctx.model.User.findOneAndUpdate({
      _id: authId
    }, {
      name: user.name,
      username: user.username,
      modifiedTime: new Date()
    }, { new: true }).lean()
  }
}

module.exports = UserService;