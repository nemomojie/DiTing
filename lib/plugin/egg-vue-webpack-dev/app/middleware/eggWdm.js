'use strict';

module.exports = (options, app) => {
  const wdm = options.wdm;

  async function eggWdm(ctx, next) {
    // egg set statusCode=404 at the beginning
    const tempStatusCode = ctx.res.statusCode;
    // clear statusCode
    ctx.res.statusCode = null;
    // init locals
    ctx.res.locals = ctx.res.locals || {};

    await wdm(ctx.req, ctx.res, next);

    ctx.res.statusCode = ctx.res.statusCode || tempStatusCode;
  }

  return eggWdm;
};
