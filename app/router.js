'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, oAuth2Server } = app;

  // index
  router.get('/', controller.home.index);
  router.redirect('/app', '/app/main');
  router.get('/app/login', controller.home.appIndex);
  router.get('/app/main', controller.home.appIndex);

  app.restful('resources', [ 'all' ], controller.sample.resource);

  // user
  router.get('/user/:id', controller.user.getById);
  router.get('/user/:username', controller.user.getByName);
  router.post('/user', controller.user.create);

  // client
  router.get('/client/:clientId', controller.client.getById);
  router.post('/client', controller.client.create);
  router.patch('/client', controller.client.update);

  // oauth
  router.post('/login', app.passport.authenticate('local', { successRedirect: false }), controller.home.login);
  // router.post('/login', controller.home.login);

  // TODO callback after login
  router.get('/authCallback', controller.home.index);
  router.get('/logout', controller.home.logout);
  router.post('/oauth/token', oAuth2Server.token());
};
