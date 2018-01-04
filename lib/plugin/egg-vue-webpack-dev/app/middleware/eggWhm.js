'use strict';

const { PassThrough } = require('stream');

module.exports = (options, app) => {
  const whm = options.whm;
  const pattern = options.match;

  async function eggWhm(ctx, next) {
    if (pattern.test(ctx.req.url)) {
      const stream = new PassThrough();
      await whm(ctx.req, {
        write: stream.write.bind(stream),
        writeHead: (status, headers) => {
          ctx.body = stream;
          ctx.status = status;
          ctx.set(headers);
        },
      }, next);
    } else {
      await next();
    }
  }

  return eggWhm;
};
