'use strict';

const { PassThrough } = require('stream');

module.exports = (options, app) => {
  const whm = options.whm;

  async function eggWhm(ctx, next) {
    const stream = new PassThrough();
    await whm(ctx.req, {
      write: stream.write.bind(stream),
      writeHead: (status, headers) => {
        ctx.body = stream;
        ctx.status = status;
        ctx.set(headers);
      },
    }, next);
  }

  return eggWhm;
};
