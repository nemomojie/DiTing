'use strict';
import Vue from 'vue';
import App from './App.vue';
import { createRouter } from './route-factory';

// 导出一个工厂函数，用于创建新的
// 应用程序、router 和 store 实例
export function createApp () {
    const router = createRouter();
    const app = new Vue({
        router,
        // 根实例简单的渲染应用程序组件。
        render: h => h(App)
    });
    return { app, router };
}