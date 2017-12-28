const Service = require('egg').Service;

class UserService extends Service {
  async create (user) {
    return (await this.app.model.User({
      username: user.username,
      password: await this.ctx.genHash(user.password),
      name: user.name
    }).save()).toObject();
  };
  async getById (id) {
    return this.app.model.User.findOne({
      _id: id
    });
  };
  async getByName (username) {
    return this.app.model.User.findOne({
      username
    }).lean();
  };
  async updatePasswordByOldPassword (id, oldPassword, newPassword) {
    return this.app.model.User.findOneAndUpdate({
      _id: id,
      password: await this.ctx.genHash(oldPassword)
    }, {
      password: await this.ctx.genHash(newPassword)
    }, { new: true }).lean();
  };
  async delete (id) {
    return this.app.model.User.remove({
      _id: id
    });
  };
  async deleteByName (username) {
    return this.app.model.User.remove({
      username: username
    });
  }
}

module.exports = UserService;