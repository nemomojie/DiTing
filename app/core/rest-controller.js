'use strict';

const BaseController = require('./base-controller');
const RestService = require('./rest-service');

class RestController extends BaseController {
  constructor(ctx, service, options) {
    super(ctx);
    this.req = ctx.req;
    this.res = ctx.res;
    this.controllerName = this.pathName.substr('controller.'.length);
    if (!service) {
      service = ctx.service[this.controllerName];
      if (!service) {
        this.error('No suiable service');
      }
      if (!(service instanceof RestService)) {
        this.error('Wrong service');
      }
    }
    this.restService = service;
  };

  async index() {
    const resources = await this.restService.getByQuery();
    this.success(resources);
  }

  async show(id) {
    if (!this.ctx.params.id) {
      this.badRequest('Params miss id');
    }
    const resource = await this.restService.getById(this.ctx.params.id);
    resource ? this.success(resource) : this.notFound('Not found exist object');
  }

  async getAll() {
    const resources = await this.restService.getAll();
    this.success(resources);
  }

  async create() {
    const newResource = await this.restService.create(this.req.body);
    this.created(newResource);
  }

  async update() {
    if (!this.ctx.params.id) {
      this.badRequest('Params miss id');
    }
    // Remove ObjectId from update object
    if (this.req.body._id && this.req.body._id === this.ctx.params.id) {
      delete this.req.body._id;
    }
    const result = await this.restService.updateById(this.ctx.params.id, this.req.body);
    result ? this.success("Update success") : this.notFound("Not found exist object");
  }

  async destroy() {
    if (!this.ctx.params.id) {
      this.badRequest('Params miss id');
    }
    const result =  await this.restService.deleteById(this.ctx.params.id);
    result ? this.success("Delete success") : this.notFound("Not found exist object");
  }
}
module.exports = RestController;