'use strict';

const merge = require('webpack-merge');
const serverBase = require('./server-config.js');
const prodBase = require('./base-config-prod');

module.exports = merge(serverBase, prodBase);
