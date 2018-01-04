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
        }
      }
      this.ctx.body = html;
    });
  }

  async index() {
    this.ctx.body = 'hi, egg';
  }

  async login() {
    const body = this.ctx.request.body;
    if (body.username) {
      const user = await this.service.user.getByName(body.username);
      if (user && this.ctx.compare(body.password, user.password)) {
        this.app.passport.login(user);
        this.success(user);
      }
    }
    this.error('username or password is wrong');
  }

  async logout() {
    this.ctx.logout();
    this.success('logout success');
  }
}

module.exports = HomeController;
