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
      actions.forEach(key => {
        obj = obj[key];
        if (!obj) this.error(`service '${this.controllerName}' not exists`);
      });
      service = obj;
    }
    if (!service) this.error('service not exists');
    this.restService = service;
  }

  async index() {
    const resources = await this.restService.getByQuery();
    this.resolveRespond(resources);
  }

  async show(id) {
    this.check(this.ctx.params.id, 'Params id is missing');
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
    this.check(this.ctx.params.id, 'Params id is missing');
    // Remove ObjectId from update object
    if (this.req.body._id && this.req.body._id === this.ctx.params.id) {
      delete this.req.body._id;
    }
    const result = await this.restService.updateById(this.ctx.params.id, this.req.body);
    this.resolveRespond(result);
  }

  async destroy() {
    this.check(this.ctx.params.id, 'Params id is missing');
    const result =  await this.restService.deleteById(this.ctx.params.id);
    this.resolveRespond(result);
  }

  async getRef() {
    this.check(this.ctx.params.id, 'Params id is missing');
    this.check(this.ctx.params.refName, 'Params refName is missing');
    const reference = await this.restService.getWithRef(this.ctx.params.id, this.ctx.params.refName);
    this.resolveRespond(reference);
  }

  async createRef() {
    this.check(this.ctx.params.id, 'Params id is missing');
    this.check(this.ctx.params.refName, 'Params refName is missing');
    const reference = await this.restService.updateWithNewRef(this.ctx.params.id, this.ctx.params.refName, this.req.body);
    this.resolveRespond(reference, true);
  }

  async updateRef() {
    this.check(this.ctx.params.id, 'Params id is missing');
    this.check(this.ctx.params.refName, 'Params refName is missing');
    await this.restService.updateWithRef(this.ctx.params.id, this.ctx.params.refName, this.req.body);
    this.resolveRespond('success');
  }

  async destroyRef() {
    this.check(this.ctx.params.id, 'Params id is missing');
    this.check(this.ctx.params.refName, 'Params refName is missing');
    await this.restService.deleteWithRef(this.ctx.params.id, this.ctx.params.refName);
    this.resolveRespond('success');
  }
}
module.exports = RestController;
