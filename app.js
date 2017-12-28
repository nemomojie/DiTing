'use strict';

module.exports = app => {
  const isProd = app.config.env === 'prod';

  if (!isProd) {
    const eggWdmConfig = app.config.eggWdm;
    const eggWdm = require('./app/middleware/eggWdm');
    app.use(eggWdm(eggWdmConfig));
  }
};
