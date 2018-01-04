'use strict';

const merge = require('webpack-merge');
const clientBase = require('./client-config.js');
const prodBase = require('./base-config-prod');

module.exports = merge(clientBase, prodBase);
