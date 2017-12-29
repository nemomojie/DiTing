'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const test = await this.service.model.getById('test');
    this.ctx.body = 'hi, ' + this.app.plugins.mongoRest.name + test;
  }
}

module.exports = HomeController;
