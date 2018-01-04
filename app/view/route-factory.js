'use strict';

import Vue from 'vue';
import Router from 'vue-router';
import LoginPage from './pages/LoginPage.vue';
import B from './components/B.vue';

Vue.use(Router);

export function createRouter () {
    return new Router({
        mode: 'history',
        routes: [
            {
                path: '/login',
                component: LoginPage,
            },
            {
                path: '/main',
                component: B,
            }
        ],
        base: '/app/'
    })
}