'use strict';

const Controller = require('egg').Controller;
const Vue = require('vue');
const vr = require('vue-server-renderer');
const fs = require('fs');
const ti = require('app/public/vue/mobile-vue-text-input');

class HomeController extends Controller {
  async mo() {
    const render = vr.createRenderer({
      template: fs.readFileSync('app/public/pages/mo.html', 'utf-8'),
    });
    const app = new Vue({
      data: {
        value: 'Momojie',
      },
      template: '<mobile-vue-text-input/>',
      components: { ti },
    });
    render.renderToString(app, (err, html) => {
      this.ctx.body = html;
    });
  }

  async index() {
    this.ctx.body = 'hi, egg';
  }
}

module.exports = HomeController;
