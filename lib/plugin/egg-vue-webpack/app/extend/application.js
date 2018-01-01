'use strict';

const FileSystem = require('fs');
const FILE_SYSTEM = Symbol('Application#fileSystem');
const VUE_SERVER_BUNDLE = Symbol('Application#vueServerBundle');
const VUE_CLIENT_MANIFEST = Symbol('Application#vueClientManifest');

module.exports = {

  get fileSystem() {
    if (!this[FILE_SYSTEM]) {
      this[FILE_SYSTEM] = FileSystem;
    }
    return this[FILE_SYSTEM];
  },

  get vueServerBundle() {
    if (!this[VUE_SERVER_BUNDLE]) {
      this[VUE_SERVER_BUNDLE] = this.config.eggVueWebpack.serverBundle;
    }
    return this[VUE_SERVER_BUNDLE];
  },

  get vueClientManifest() {
    if (!this[VUE_CLIENT_MANIFEST]) {
      this[VUE_CLIENT_MANIFEST] = this.config.eggVueWebpack.clientManifest;
    }
    return this[VUE_CLIENT_MANIFEST];
  },
};
