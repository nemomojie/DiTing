'use strict';

module.exports = (options, app) => {
  return async function testmid(ctx, next) {
    await next();

    console.log(ctx.body);
    console.log(options);
    console.log(app);
  };
};
