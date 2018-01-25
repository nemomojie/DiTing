'use strict';

const BaseController = require('../core/base-controller');

class UserController extends BaseController {
  async create() {
    const body = this.ctx.request.body;
    const user = await this.service.user.getByName(body.username);
    if (user) {
      this.error('This username has been signed up');
    }
    const newUser = await this.service.user.create(body);
    delete newUser.password;
    this.created(newUser);
  }

  async getById() {
    const user = await this.service.user.getById(ctx.params.id);
    if (user === null) {
      this.error({
        code: 401,
        msg: 'user id is wrong',
      });
    }
    this.success(user);
  }

  async getByName() {
    const user = await this.service.user.getByName(ctx.params.username);
    if (user === null) {
      this.error({
        code: 401,
        msg: 'username is wrong',
      });
    }
    this.success(user);
  }
}

module.exports = UserController;
