'use strict';

const MemoryFileSystem = require('memory-fs');

module.exports = app => {
  const options = app.config.eggVueWebpack;

  const clientConfig = options.clientConfig;
  const serverConfig = options.serverCOnfig;
  const webpack = require('webpack');
  const compiler = webpack([ clientConfig, serverConfig ]);

  let fileSystem;

  const isMemoryFs = !compiler.compilers && compiler.outputFileSystem instanceof MemoryFileSystem;
  if (!isMemoryFs) {
    fileSystem = new MemoryFileSystem();
    compiler.outputFileSystem = fileSystem;
  } else {
    fileSystem = compiler.outputFileSystem;
  }

  // TODO: handle watch callback
  const watching = compiler.watch(options.watchOptions, () => {});

  return {
    compiler,
    fileSystem,
    watching,
  };

};
