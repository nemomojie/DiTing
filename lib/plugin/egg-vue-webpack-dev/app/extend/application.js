'use strict';

const Engine = require('../../lib/engine');
const { getFilenameFromUrl } = require('webpack-dev-middleware/lib/util');
const MemoryFileSystem = require('memory-fs');
const EGG_VUE_WEBPACK = Symbol('Application#eggVueWebpack');
const FILE_SYSTEM = Symbol('Application#fileSystem');
const VUE_SERVER_BUNDLE = Symbol('Application#vueServerBundle');
const VUE_CLIENT_MANIFEST = Symbol('Application#vueClientManifest');

module.exports = {
  get eggVueWebpack() {
    if (!this[EGG_VUE_WEBPACK]) {
      this[EGG_VUE_WEBPACK] = Engine(this);
    }
    return this[EGG_VUE_WEBPACK];
  },

  get fileSystem() {
    if (!this[FILE_SYSTEM]) {
      this[FILE_SYSTEM] = new MemoryFileSystem();
    }
    return this[FILE_SYSTEM];
  },

  get vueServerBundle() {
    if (!this[VUE_SERVER_BUNDLE]) {
      const serverConfg = this.config.eggVueWebpack.server;
      const fullName = getFilenameFromUrl(serverConfg.publicPath, this.eggVueWebpack.serverCompiler, serverConfg.bundleName);
      this[VUE_SERVER_BUNDLE] = JSON.parse(this.fileSystem.readFileSync(fullName));
    }
    return this[VUE_SERVER_BUNDLE];
  },

  get vueClientManifest() {
    if (!this[VUE_CLIENT_MANIFEST]) {
      const clientConfg = this.config.eggVueWebpack.client;
      const fullName = getFilenameFromUrl(clientConfg.publicPath, this.eggVueWebpack.clientCompiler, clientConfg.manifestName);
      this[VUE_CLIENT_MANIFEST] = JSON.parse(this.fileSystem.readFileSync(fullName));
    }
    return this[VUE_CLIENT_MANIFEST];
  },

  clearServerBundle() {
    this[VUE_SERVER_BUNDLE] = null;
  },

  clearClientManifest() {
    this[VUE_CLIENT_MANIFEST] = null;
  },
};
