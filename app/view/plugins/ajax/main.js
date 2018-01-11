'use strict';

import axios from 'axios';

export default {
  install(Vue) {
    Vue.prototype.$ajax = axios;
  }
}