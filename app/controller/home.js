'use strict';

const RestController = require('../core/base-controller');
const Vue = require('vue');
const renderer = require('vue-server-renderer').createRenderer();

class HomeController extends RestController {
  async index() {
    const app = new Vue({
      data: {
        name: 'Momojie'
      },
      template: `<div>Hello: {{ name }}</div>`
    });
    renderer.renderToString(app, (err, html) => {
      this.ctx.res.end(`
      <!DOCTYPE html>
      <html lang="en">
        <head><title>Hello</title></head>
        <body>${html}</body>
      </html>
    `);
    })
  };

  async login() {
    const body = this.ctx.request.body;
    if (body.username) {
      const user = await this.service.user.getByName(body.username);
      if (user && this.ctx.compare(body.password, user.password)) {
        this.app.passport.login(user);
        this.success(user);
      }
    }
    this.error();
  }

  async logout() {
    this.ctx.logout();
    this.success('logout success');
  }
}

module.exports = HomeController;
