'use strict';

module.exports = options => {
  return async function loginAuth(ctx, next) {
    const hasLogin = await ctx.isAuthenticated();
    if (!hasLogin) {
      ctx.throw(401, 'Please login.');
    }
    return await next();
  }
};
