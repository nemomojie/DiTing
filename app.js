'use strict';

const LocalStrategy = require('passport-local').Strategy;

module.exports = app => {
  const isProd = app.config.env === 'prod';

  if (app.passport) {
    // init passport
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
        if (existsUser) {
          const rightPassword = await ctx.compare(user.password, existsUser.password);
          if (rightPassword) {
            return existsUser;
          }
        }
      }
      return null;
    });

    app.passport.serializeUser(async (ctx, user) => {
      return {
        username: user.username,
      };
    });
    app.passport.deserializeUser(async (ctx, user) => {
      const existUser = await ctx.service.user.getByName(user.username);
      return existUser;
    });
  }
};
