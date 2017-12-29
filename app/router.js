'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, oAuth2Server } = app;

  const loginAuth = app.middlewares.loginAuth();

  // index
  router.get('/', controller.home.index);

  // user
  router.get('/user/:id', controller.user.getById);
  router.get('/user/:username', controller.user.getByName);
  router.post('/user', controller.user.create);

  // client
  router.get('/client/:clientId', controller.client.getById);
  router.post('/client', controller.client.create);
  router.patch('/client', controller.client.update);

  // oauth
  // router.get('/login', controller.home.loginPage);
  router.post('/login', app.passport.authenticate('local', { successRedirect: '/authCallback' }));
  // TODO callback after login
  router.get('/authCallback', controller.home.index);
  router.get('/logout', controller.home.logout);
  router.post('/oauth/token', oAuth2Server.token());

  // test route
  router.get('/login/test', loginAuth, controller.home.index);
  router.get('/oauth/test', oAuth2Server.authenticate(), controller.home.index);
};
