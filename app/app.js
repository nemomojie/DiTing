'use strict';

import webpack from 'webpack';
import wdm from 'webpack-dev-middleware';
import clientConfig from '../config/webpack/client-config';

const clientCompiler = webpack(clientConfig);

module.exports = app => {
    app.use(wdm(clientCompiler, {publicPath: 'dist'}));
};