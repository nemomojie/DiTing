'use strict';

import {createApp} from '../factory/app-factory'

export default context => {
  return new Promise((resolve, reject) => {
    const {app, router, store} = createApp();

    injectInitialData(store, context);
    initRouter(router, context);

    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents();
      // 匹配不到的路由，执行 reject 函数，并返回 404
      if (!matchedComponents.length) {
        return reject({
          code: 404,
          message: 'fail to match vue router',
        });
      } else {
        // 对所有匹配的路由组件调用 `asyncData()`
        Promise.all(matchedComponents.map(Component => {
          if (Component.asyncData) {
            return Component.asyncData({
              store,
              route: router.currentRoute
            })
          }
        })).then(() => {
          // 在所有预取钩子(preFetch hook) resolve 后，
          // 我们的 store 现在已经填充入渲染应用程序所需的状态。
          // 当我们将状态附加到上下文，
          // 并且 `template` 选项用于 renderer 时，
          // 状态将自动序列化为 `window.__INITIAL_STATE__`，并注入 HTML。
          context.state = store.state;
          resolve(app);
        }).catch(reject);
      }
    }, reject);
  });
}

function injectInitialData(store, context) {
  const userInfo = {
    username: null,
    isLogin: context.isAuthenticated()
  };
  if (userInfo.isLogin) {
    userInfo.username = context.user.username;
  }
  store.commit('login', userInfo);
}

function initRouter(router, context) {
  let targetUrl = context.url.replace('/app', '');
  // router.push(targetUrl);
  const auth = context.isAuthenticated();

  if (auth && targetUrl === '/login') {
    router.push('/main');
  } else if (!auth && targetUrl !== '/login') {
    router.push('/login');
  } else {
    router.push(targetUrl);
  }
}