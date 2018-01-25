'use strict';

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export function createStore() {
  return new Vuex.Store({
    state: {
      userInfo: {
        username: null,
        isLogin: false,
      },
    },

    mutations: {
      login(state, user) {
        state.userInfo.isLogin = true;
        Object.assign(state.userInfo, user);
      }
    }
  })
}