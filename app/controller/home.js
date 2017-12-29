'use strict';

const Controller = require('egg').Controller;
const { createBundleRenderer } = require('vue-server-renderer');
const template = require('fs').readFileSync('app/public/pages/mo.html', 'utf-8');
const clientManifest = require('../public/dist/vue-ssr-client-manifest.json');
const serverBundle = require('../public/dist/vue-ssr-server-bundle.json');

class HomeController extends Controller {
  async mo() {
    const renderer = createBundleRenderer(serverBundle, { template, clientManifest });
    renderer.renderToString(this.ctx, (err, html) => {
      if (err) throw err;
      this.ctx.body = html;
    });
  }

  async index() {
    this.ctx.body = 'hi, egg';
  }
}

module.exports = HomeController;
