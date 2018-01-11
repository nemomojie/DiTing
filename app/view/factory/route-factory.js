'use strict';

import Vue from 'vue';
import Router from 'vue-router';
import LoginPage from '../pages/LoginPage.vue';
import Hello from '../components/Hello.vue';

Vue.use(Router);

export function createRouter() {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/login',
        component: LoginPage,
      },
      {
        path: '/main',
        component: Hello,
      }
    ],
    base: '/app/',
  });
}