'use strict';

module.exports = app => {
  const options = app.config.eggVueWebpack;

  const clientConfig = options.client.config;
  const serverConfig = options.server.config;
  const webpack = require('webpack');
  const clientCompiler = webpack(clientConfig);
  const serverCompiler = webpack(serverConfig);

  clientCompiler.outputFileSystem = app.fileSystem;
  serverCompiler.outputFileSystem = app.fileSystem;

  serverCompiler.plugin('done', () => {
    app.clearServerBundle();
  });
  clientCompiler.plugin('done', () => {
    app.clearClientManifest();
  });

  return {
    clientCompiler,
    serverCompiler,
  };

};
