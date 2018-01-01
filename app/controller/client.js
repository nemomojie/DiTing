'use strict';

const BaseController = require('../core/base-controller');

class ClientController extends BaseController {
  async create () {
    const body = this.ctx.request.body;
    const client = await this.service.client.getById(body.clientId)
    if (client) {
      this.error('This client has been signed up');
    }
    const newClient = await this.service.client.create(body);
    this.created(newClient);
  }

  async getById () {
    const client = await this.service.client.getById(ctx.params.id)
    if (client === null) {
      this.error({
        code: 401,
        msg: 'client id is wrong'
      })
    }
    this.success(client)
  }

  async update () {
    const body = this.ctx.request.body;
    const updateClient = await this.service.client.update(body);
    this.success(updateClient);
  }
}

module.exports = ClientController;
