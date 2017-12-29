'use strict';
const Service = require('egg').Service;
const Controller = require('egg').Controller;
const mongoose = require('mongoose');
const Model = mongoose.Model;

class RestService extends Service {
  async getById(id) {
    return id;
  }
}

Model.registerService = function(BaseService) {
  if (!BaseService) {
    BaseService = Service;
  }
  this.service = RestService;
  Object.setPrototypeOf(this.service, BaseService);
  this.hasService = true;
};

Model.registerController = function(BaseController) {
  if (!BaseController) {
    BaseController = Controller;
  }
};

Model.mount = function(newMethods) {
  if (!Array.isArray(newMethods)) {
    newMethods = [ newMethods ];
  }

  this.allowedMethods = [];
  this.METHODS.forEach(function(method) {
    delete this.routes[method];
  }.bind(this));

  newMethods.forEach(function(meth) {
    let method = meth.method;
    if (typeof meth === 'string') {
      method = meth;
      meth = {};
    }
    if (!method) throw new Error('Method object must have a method property');
    this.allowedMethods.push(method);

    // meth.handler = handlers[method];
    meth.detail = (method !== 'get' && method !== 'post');
    // self.route(method, meth);
  }.bind(this));
  return this;
};
