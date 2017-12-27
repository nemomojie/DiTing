'use strict';

const Controller = require('egg').Controller;
const { createBundleRenderer } = require('vue-server-renderer');
const template = require('fs').readFileSync('app/public/pages/mo.html', 'utf-8');

class HomeController extends Controller {
  async mo() {
    const renderer = createBundleRenderer(this.app.vueServerBundle, { template, clientManifest: this.app.vueClientManifest });
    renderer.renderToString(this.ctx, (err, html) => {
      if (err) throw err;
      this.ctx.body = html;
    });
    console.log('aa');
  }

  async index() {
    this.ctx.body = 'hi, egg';
  }
}

module.exports = HomeController;
