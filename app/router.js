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

  initPassport(app);
};

const initPassport = function(app) {
  const LocalStrategy = require('passport-local').Strategy;

  app.passport.use(new LocalStrategy({
    passReqToCallback: true,
  }, (req, username, password, done) => {
    const user = {
      provider: 'local',
      username,
      password,
    };
    app.passport.doVerify(req, user, done);
  }));

  app.passport.verify(async (ctx, user) => {
    if (user.provider === 'local') {
      const existsUser = await ctx.service.user.getByName(user.username);
      if (existsUser && ctx.compare(user.password, existsUser.password)) {
        return existsUser;
      }
    }
    return null;
  });

  app.passport.serializeUser(async (ctx, user) => {
    return {
      username: user.username
    };
  });
  app.passport.deserializeUser(async (ctx, user) => {
    const existUser = await ctx.service.user.getByName(user.username);
    return existUser;
  });
};