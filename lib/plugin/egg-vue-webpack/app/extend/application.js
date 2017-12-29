'use strict';

const Engine = require('../../lib/engine');
const EGG_VUE_WEBPACK = Symbol('Application#EggVueWebpack');

module.exports = {
  get eggVueWebpack() {
    if (!this[EGG_VUE_WEBPACK]) {
      this[EGG_VUE_WEBPACK] = Engine(this);
    }
    return this[EGG_VUE_WEBPACK];
  },
};
