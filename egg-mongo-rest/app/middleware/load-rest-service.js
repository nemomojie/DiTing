'use strict';

module.exports = () => {
  return async function loadRestService(ctx, next) {
    const mongoRest = ctx.app.mongoRest;
    const services = mongoRest.getServices();
    for (const serviceName in services) {
      ctx.service[serviceName] = new services[serviceName](ctx);
    }
    await next();
  };
};
