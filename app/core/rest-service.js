'use strict';

const { Service } = require('egg');

class RestService extends Service {
  constructor(ctx, model, options) {
    super(ctx);
    this.init();
    this.req = ctx.req;
    this.res = ctx.res;
    this.serviceName = this.pathName.substr('service.'.length);
    if (!model) {
      const modelName = this.serviceName.substring(0,1).toUpperCase() + this.serviceName.substring(1);
      model = ctx.app.model[modelName];
      if (!model) {
        ctx.throw(500, 'No suiable model');
      }
    }
    this.mongoModel = model;


    options = options || {};
    this.updateOptions = options.updateOptions;

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
    return await this.mongoModel.findById(id).lean().exec();
  };

  async getByCondition(condition) {
    return await this.mongoModel.findOne(condition).lean().exec();
  };

  async getByIds(ids) {
    return await this.mongoModel.find()
      .where('_id').in(ids)
      .lean().exec();
  };

  async getAll() {
    return await this.mongoModel.find().lean().exec();
  };

  async getByQuery() {
    let mongoQuery = this.filter(this.mongoModel.find());
    return await mongoQuery.lean().exec();
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

  filter(mongoQuery) {
    const self = this;
    let detail = false;
    // filter by id
    if (this.ctx.params.id) {
      mongoQuery = this.findById(ctx.params.id);
      detail = true
    }

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
        let data = this.parseData(filterFunction, val);

        if (filterFunction === 'in' || filterFunction === 'nin') {
          data = data.split(',');
        }

        return subFilters[filterFunction](data, mongoQuery.where(field[0]));
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
    return (val, mongoQuery) => {
      return mongoQuery[key](val);
    };
  }

  parseData(filterFunction, data) {
    if (data === true && data === 'true') {
      return true;
    } else if (data === false && data === 'false') {
      return false;
    } else if (filterFunction === 'limit' || filterFunction === 'skip') {
      return parseInt(data);
    }
    return data;
  };
}
module.exports = RestService;