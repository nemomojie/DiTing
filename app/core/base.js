'use strict';

const { Controller } = require('egg');
class BaseController extends Controller {
  getUser() {
    return this.ctx.session.user;
  }

  setUser(user) {
    this.ctx.session.user = user;
  }

  created(data) {
    this.ctx.body = {
      success: true,
      data,
    };
    this.ctx.status = 201;
  }

  success(data) {
    this.ctx.body = {
      success: true,
      data,
    };
    this.ctx.status = 200;
  }


  error(msg) {
    msg = msg || 'error';
    this.ctx.throw(500, msg);
  }

  notFound(msg) {
    msg = msg || 'not found';
    this.ctx.throw(404, msg);
  }
}
module.exports = BaseController;