'use strict';

module.exports = (options, app) => {
  const wdm = options.wdm;
  const pattern = options.match;

  async function eggWdm(ctx, next) {
    if (pattern.test(ctx.req.url)) {
      // egg set statusCode=404 at the beginning
      const tempStatusCode = ctx.res.statusCode;
      // clear statusCode
      ctx.res.statusCode = null;
      // init locals
      ctx.res.locals = ctx.res.locals || {};

      await wdm(ctx.req, ctx.res, next);

      ctx.res.statusCode = ctx.res.statusCode || tempStatusCode;
    } else {
      await next();
    }
  }

  return eggWdm;
};
