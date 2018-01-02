'use strict';

const BaseController = require('./base-controller');
const RestService = require('./rest-service');

class RestController extends BaseController {
  constructor(ctx, options) {
    super(ctx);
    this.controllerName = this.pathName.substr('controller.'.length);

    options = options || {};
    this.createRule = options.createRule;
    this.updateRule = options.updateRule;
    let service = options.service;
    if (!service) {
      const actions = this.controllerName.split('.');
      let obj = this.service;
      actions.forEach((key, index) => {
        obj = obj[key];
        if (!obj) this.error(`service '${this.controllerName}' not exists`);
      });
      service = obj;
    }
    if (!service) this.error('service not exists');
    this.restService = service;
  };

  async index() {
    const resources = await this.restService.getByQuery();
    this.resolveRespond(resources);
  }

  async show(id) {
    if (!this.ctx.params.id) {
      this.badRequest('Params id is missing');
    }
    const resource = await this.restService.getById(this.ctx.params.id);
    this.resolveRespond(resource);
  }

  async getAll() {
    const resources = await this.restService.getAll();
    this.resolveRespond(resources);
  }

  async create() {
    if (this.createRule) {
      this.ctx.validate(this.createRule);
    }
    const newResource = await this.restService.create(this.req.body);
    this.resolveRespond(newResource, true);
  }

  async update() {
    if (this.updateRule) {
      this.ctx.validate(this.updateRule);
    }
    if (!this.ctx.params.id) {
      this.badRequest('Params id is missing');
    }
    // Remove ObjectId from update object
    if (this.req.body._id && this.req.body._id === this.ctx.params.id) {
      delete this.req.body._id;
    }
    const result = await this.restService.updateById(this.ctx.params.id, this.req.body);
    this.resolveRespond("success");
  }

  async destroy() {
    if (!this.ctx.params.id) {
      this.badRequest('Params id is missing');
    }
    const result =  await this.restService.deleteById(this.ctx.params.id);
    this.resolveRespond("success");
  }
}
module.exports = RestController;