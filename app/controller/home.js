'use strict';

const BaseController = require('../core/base-controller');
const { createBundleRenderer } = require('vue-server-renderer');
const template = require('fs').readFileSync('app/view/index.html', 'utf-8');

class HomeController extends BaseController {
  async appIndex() {
    const renderer = createBundleRenderer(this.app.vueServerBundle, { template, clientManifest: this.app.vueClientManifest });
    renderer.renderToString(this.ctx, (err, html) => {
      if (err) {
        if (err.code === 404) {
          this.notFound(err.message);
        } else {
          throw err;
        }
      }
      this.ctx.body = html;
    });
  }

  async index() {
    this.ctx.body = 'hi, egg';
  }

  async login() {
    if (this.ctx.isAuthenticated()) {
      this.success();
    } else {
      this.error('Username or password is wrong');
    }
  }

  async logout() {
    this.ctx.logout();
    this.success('logout success');
  }
}

module.exports = HomeController;
