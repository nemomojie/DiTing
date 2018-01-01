'use strict';

const { Controller } = require('egg');

class BaseController extends Controller {
  created(data) {
    this.ctx.body = data;
    this.ctx.status = 201;
  }

  success(data) {
    this.ctx.body = data;
    this.ctx.status = 200;
  }

  error(msg) {
    msg = msg || 'Server Error';
    this.ctx.throw(500, msg);
  }

  badRequest(msg) {
    msg = msg || 'Bad Request';
    this.ctx.throw(400, msg);
  }

  notFound(msg) {
    msg = msg || 'Not Found';
    this.ctx.throw(404, msg);
  }
}
module.exports = BaseController;