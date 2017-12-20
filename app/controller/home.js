'use strict';

const Controller = require('egg').Controller;
const Vue = require('vue');
const renderer = require('vue-server-renderer').createRenderer();

class HomeController extends Controller {
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
  }
}

module.exports = HomeController;
