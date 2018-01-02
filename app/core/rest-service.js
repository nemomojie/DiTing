'use strict';

const { Service } = require('egg');

class RestService extends Service {
  constructor(ctx, options) {
    super(ctx);
    this.init();
    this.req = ctx.req;
    this.res = ctx.res;
    this.serviceName = this.pathName.substr('service.'.length);

    options = options || {};
    this.updateOptions = options.updateOptions;
    let model = options.model;
    if (!model) {
      const actions = this.serviceName.split('.');
      let obj = this.app.model;
      actions.forEach((key, index) => {
        key = key.substring(0,1).toUpperCase() + key.substring(1);
        obj = obj[key];
        if (!obj) ctx.throw(500, `model '${this.serviceName}' not exists`);
      });
      model = obj;
    }
    if (!model) ctx.throw(500, 'model not exists');
    this.mongoModel = model;

    this.allFilters = this.filterable(this.populates, {});
    this.queryFilters = this.filterable(this.filters, this.subFilters);
  };

  init() {
    this.SPLIT_WORD = '__';

    this.populates = {
      'populate': this.queryFunc('populate'),
    };
    this.filters = {
      'limit': this.queryFunc('limit'),
      'skip': this.queryFunc('skip'),
      'offset': this.queryFunc('offset'),
      'select': this.queryFunc('select'),
      'sort': this.queryFunc('sort'),
    };
    this.subFilters = {
      'equals': this.queryFunc('equals'),
      'gte': this.queryFunc('gte'),
      'gt': this.queryFunc('gt'),
      'lt': this.queryFunc('lt'),
      'lte': this.queryFunc('lte'),
      'ne': this.queryFunc('ne'),
      'regex': this.queryFunc('regex'),
      'in': this.queryFunc('in'),
      'nin': this.queryFunc('nin'),
    };
  };

  async create(model) {
    return (await this.mongoModel.create(model)).toObject();
  };

  async getById(id) {
    return await this.filter(this.mongoModel.findById(id), true).lean().exec();
  };

  async getByCondition(condition) {
    return await this.filter(this.mongoModel.findOne(condition), true).lean().exec();
  };

  async getByIds(ids) {
    return await this.filter(this.mongoModel.find().where('_id').in(ids), true)
      .lean().exec();
  };

  async getAll() {
    return await this.filter(this.mongoModel.find(), true).lean().exec();
  };

  async getByQuery() {
    return await this.filter(this.mongoModel.find(), false).lean().exec();
  }

  async updateById(id, update, option) {
    const updateOptions = option || this.updateOptions;
    return await this.mongoModel.findByIdAndUpdate(id, update, updateOptions);
  };

  async updateByCondition(condition, update, option) {
    const updateOptions = option || this.updateOptions;
    return await this.mongoModel.updateMany(condition, update, updateOptions);
  };

  async deleteById(id) {
    return await this.mongoModel.findByIdAndRemove(id);
  };
  async deleteByCondition(condition) {
    return await this.mongoModel.remove(condition);
  };

  filter(mongoQuery, detail) {
    const self = this;

    const reqDatas = [this.req.body, this.req.query, this.req.headers];
    reqDatas.forEach((reqData) => {
      Object.keys(reqData).filter((validKey) => {
        return self.allFilters.contains(validKey, mongoQuery);
      }).forEach(function(validKey) {
        mongoQuery = self.allFilters.filter(validKey, reqData[validKey], mongoQuery);
      });
    });

    if (!detail) {
      reqDatas.forEach(function(reqData) {
        Object.keys(reqData).filter((validKey) => {
          return self.queryFilters.contains(validKey, mongoQuery);
        }).forEach((validKey) => {
          mongoQuery = self.queryFilters.filter(validKey, reqData[validKey], mongoQuery);
        });
      });
    }
    return mongoQuery;
  };

  filterable(filters, subFilters) {
    return {
      filter: (key, val, mongoQuery) => {
        if (filters[key]) {
          return filters[key](this.parseData(key, val), mongoQuery);
        }
        const field = key.split(this.SPLIT_WORD);
        const filterFunction = field[1] || 'equals';
        return subFilters[filterFunction](this.parseData(filterFunction, val), mongoQuery.where(field[0]));
      },
      contains: (key, mongoQuery) => {
        if (key in filters) return true;
        const field = key.split(this.SPLIT_WORD);
        const filterFunction = field[1] || 'equals';
        return field[0] in mongoQuery.model.schema.paths && filterFunction in subFilters;
      }
    }
  };

  queryFunc(key) {
    return (args, mongoQuery) => {
      if (!(args instanceof Array)) {
        args = [args];
      }
      return mongoQuery[key].apply(mongoQuery, args);
    };
  }

  parseData(filterFunction, data) {
    if (data === true && data === 'true') {
      return [true];
    } else if (data === false && data === 'false') {
      return [false];
    } else if (filterFunction === 'limit' || filterFunction === 'skip') {
      return [parseInt(data)];
    } else if (filterFunction === 'populate') {
      const leftIndex = data.indexOf('[');
      const rightIndex = data.indexOf(']');
      if (leftIndex >= 0 && rightIndex >= 0) {
        return [data.substring(0, leftIndex), data.substring(leftIndex + 1, rightIndex)]
      } else {
        return [data];
      }
    } else if (filterFunction === 'in' || filterFunction === 'nin') {
      return [data.split(',')];
    }
    return [data];
  };
}
module.exports = RestService;