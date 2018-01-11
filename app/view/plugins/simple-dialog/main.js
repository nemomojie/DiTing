'use strict';

import Hub from '../../utils/eventhub';

export default {
  install(Vue) {
    Vue.prototype.$alert = options => {
      Hub.$emit('alert', options);
    };
  }
}