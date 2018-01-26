const Service = require('egg').Service;

class UserService extends Service {
  async create(user) {
    const model = this.app.model('User');
    return (await model({
      username: user.username,
      password: await this.ctx.genHash(user.password),
      name: user.name,
    }).save()).toObject();
  }
  async getById(id) {
    const model = this.app.model('User');
    return model.findOne({
      _id: id,
    });
  }
  async getByName(username) {
    const model = this.app.model('User');
    return model.findOne({
      username,
    }).lean();
  }
  async updatePasswordByOldPassword(id, oldPassword, newPassword) {
    const model = this.app.model('User');
    return model.findOneAndUpdate({
      _id: id,
      password: await this.ctx.genHash(oldPassword),
    }, {
      password: await this.ctx.genHash(newPassword),
    }, { new: true }).lean();
  }
  async delete(id) {
    const model = this.app.model('User');
    return model.remove({
      _id: id,
    });
  }
  async deleteByName(username) {
    const model = this.app.model('User');
    return model.remove({
      username,
    });
  }


}

module.exports = UserService;
