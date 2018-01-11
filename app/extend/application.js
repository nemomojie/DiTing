'use strict';

module.exports = {
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

    const routerArgs = middlewares;
    routerArgs.unshift(url);
    routerArgs.unshift(routerName);
    if (methods.indexOf('all') >= 0) {
      routerArgs.push(controller);
      router.resources.apply(router, routerArgs);
    } else {
      for (const method in methods) {
        switch (method) {
          case 'post':
            routerArgs.push(controller.create);
            router.post.apply(router, routerArgs);
            break;
          case 'get':
            routerArgs.push(controller.index);
            router.get.apply(router, routerArgs);

            routerArgs.pop();
            routerArgs[1] += '/:id';
            routerArgs.push(controller.show);
            router.get.apply(router, routerArgs);
            break;
          case 'put':
            routerArgs[1] += '/:id';
            routerArgs.push(controller.update);
            router.put.apply(router, routerArgs);
            break;
          case 'delete':
            routerArgs.push(controller.update);
            routerArgs.push(controller.destroy);
            router.delete.apply(router, routerArgs);
            break;

        }
      }
    }
  },
};
