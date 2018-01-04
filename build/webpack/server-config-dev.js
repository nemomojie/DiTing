'use strict';

const webpack = require('webpack');
const merge = require('webpack-merge');
const serverBase = require('./server-config.js');
const devBase = require('./base-client-dev');

module.exports = merge(serverBase, devBase);
