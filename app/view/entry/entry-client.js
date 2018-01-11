'use strict';

import { createApp } from '../factory/app-factory';
// 客户端特定引导逻辑……
const { app, router, store } = createApp();

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__);
}

// 这里假定 App.vue 模板中根元素具有 `id="app"`
app.$mount('#app');