'use strict';

import Vue from 'vue';
import Router from 'vue-router';
import A from './components/A.vue';
import B from './components/B.vue';

Vue.use(Router);

export function createRouter () {
    return new Router({
        mode: 'history',
        routes: [
            {
                path: '/A',
                component: A,
            },
            {
                path: '/B',
                component: B,
            }
        ],
        base: '/app/'
    })
}