'use strict';

import Vue from 'vue';
import Router from 'vue-router';
import LoginPage from '../pages/LoginPage.vue';
import MainPage from '../pages/MainPage.vue';

Vue.use(Router);

export function createRouter() {
  const router = new Router({
    mode: 'history',
    routes: [
      {
        path: '/login',
        component: LoginPage,
      },
      {
        path: '/main',
        component: MainPage,
      }
    ],
    base: '/app/',
  });

  return router;
}