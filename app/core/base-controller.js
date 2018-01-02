'use strict';

const { Controller } = require('egg');

class BaseController extends Controller {

  constructor(ctx) {
    super(ctx);
    this.req = ctx.req;
    this.res = ctx.res;
  }

  resolveRespond(data, isNew) {
    if (!data) {
      this.notFound('Not found exist resource');
    }
    const accept = this.req.headers['accept'] || '*/*';
    switch (accept) {
      case 'application/json':
      default:
        isNew ? this.created(data) : this.success(data);
        break;
    }
  }

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
    this.ctx.throw(500, new Error(msg));
  }

  badRequest(msg) {
    msg = msg || 'Bad Request';
    this.ctx.throw(400, new Error(msg));
  }

  notFound(msg) {
    msg = msg || 'Not Found';
    this.ctx.throw(404, new Error(msg));
  }
}
module.exports = BaseController;