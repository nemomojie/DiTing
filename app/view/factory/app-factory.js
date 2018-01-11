'use strict';
import Vue from 'vue';
import App from '../App.vue';
import {sync} from 'vuex-router-sync';
import {createRouter} from './route-factory';
import {createStore} from "./store-factory";

import Ajax from '../plugins/ajax/main';
import SimpleDialog from '../plugins/simple-dialog/main';

Vue.use(Ajax);
Vue.use(SimpleDialog);

// 导出一个工厂函数，用于创建新的
// 应用程序、router 和 store 实例
export function createApp() {
  const router = createRouter();
  const store = createStore();
  sync(store, router);
  const app = new Vue({
    store,
    router,
    // 根实例简单的渲染应用程序组件。
    render: h => h(App)
  });
  return {app, router, store};
}