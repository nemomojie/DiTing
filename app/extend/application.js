'use strict'

module.exports = {

  /**
   *
   * mount restful api on router
   * @param pathName path name of resource
   * @param methods allow HTTP method: get, post, put, delete (Or use 'all' to allow all)
   * @param args contain middlewares and controller and options
   *  middlewares: the middlewares want to use in restful api
   *  controller: the rest controller of resource
   *  options = {
   *    routerName: string,
   *    pathPrefix: string,
   *    enableOauth2: boolean,
   *    enableLoginAuth: boolean
   */
  restful(pathName, methods, ...args) {
    let controllerIndex = args.length - 1;
    let option = args[args.length - 1];
    if (Object.getOwnPropertySymbols(args[args.length - 1]).length > 0) {
      controllerIndex = args.length;
      option = {};
    }
    const middlewares = args.slice(0, controllerIndex);
    const controller = middlewares.pop();

    const router = this.router;
    const routerName = option.routerName || pathName;
    const url = (option.pathPrefix ? option.pathPrefix : '') + '/' + pathName;

    if (option.enableOauth2) {
      middlewares.unshift(this.oAuth2Server.authenticate());
    }
    if (option.enableLoginAuth) {
      middlewares.unshift(this.middlewares.loginAuth());
    }

    let routerArgs;
    if (methods.indexOf('all') >= 0) {
      routerArgs = generateArgs(routerName, url, middlewares, controller);
      router.resources.apply(router, routerArgs);

      routerArgs = generateArgs(routerName, url + '/:id/:refName', middlewares, controller.createRef);
      router.post.apply(router, routerArgs);
      routerArgs = generateArgs(routerName, url + '/:id/:refName', middlewares, controller.getRef);
      router.get.apply(router, routerArgs);
      routerArgs = generateArgs(routerName, url + '/:id/:refName', middlewares, controller.updateRef);
      router.put.apply(router, routerArgs);
      routerArgs = generateArgs(routerName, url + '/:id/:refName', middlewares, controller.destroyRef);
      router.delete.apply(router, routerArgs);
    } else {
      for(const method in methods) {
        switch (method) {
          case 'post':
            routerArgs = generateArgs(routerName, url, middlewares, controller.create);
            router.post.apply(router, routerArgs);

            routerArgs = generateArgs(routerName, url + '/:id/:refName', middlewares, controller.createRef);
            router.post.apply(router, routerArgs);
            break;
          case 'get':
            routerArgs = generateArgs(routerName, url, middlewares, controller.index);
            router.get.apply(router, routerArgs);
            routerArgs = generateArgs(routerName, url + '/:id', middlewares, controller.show);
            router.get.apply(router, routerArgs);

            routerArgs = generateArgs(routerName, url + '/:id/:refName', middlewares, controller.getRef);
            router.get.apply(router, routerArgs);
            break;
          case 'put':
            routerArgs = generateArgs(routerName, url + '/:id', middlewares, controller.update);
            router.put.apply(router, routerArgs);

            routerArgs = generateArgs(routerName, url + '/:id/:refName', middlewares, controller.updateRef);
            router.put.apply(router, routerArgs);
            break;
          case 'delete':
            routerArgs = generateArgs(routerName, url + '/:id', middlewares, controller.destroy);
            router.delete.apply(router, routerArgs);

            routerArgs = generateArgs(routerName, url + '/:id/:refName', middlewares, controller.destroyRef);
            router.delete.apply(router, routerArgs);
            break;
        }
      }
    }
  }

};

/**
 *
 * @param routerName
 * @param url
 * @param middlewares
 * @param controller
 * @return args
 */
const generateArgs = function(routerName, url, middlewares, controller) {
  const args = middlewares.slice();
  args.unshift(url);
  args.unshift(routerName);
  args.push(controller);
  return args;
};