'use strict';

const mock = require('egg-mock');

describe('test/mongo-rest.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/mongo-rest-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, mongoRest')
      .expect(200);
  });
});
