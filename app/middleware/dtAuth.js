'use strict';

module.exports = options => {

  const pattern = options.match;
  const rediectUrl = options.redirectUrl;

  return async function dtAuth(ctx, next) {
    if (pattern.test(ctx.req.url)) {
      const hasLogin = await ctx.isAuthenticated();
      if (!hasLogin) {
        // ctx.redirect(rediectUrl);
      }
    }
    return await next();
  };
};
