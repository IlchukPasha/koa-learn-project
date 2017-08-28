const assert = require('assert');
const app = require('./../app');
const agent = require('supertest').agent(app);
let models = require('../models');

const urls = {
  auth: '/api/v1/signin'
};

describe('Authorize controller', () => {
  before(done => {
    require('./TestCase')(models, done);
  });

  it('auth', done => {
    agent
      .post(urls.auth)
      .send({
        email: 'firstemail@email.com',
        password: 'password'
      })
      .end((err, res) => {
        assert.equal(200, res.statusCode);
        assert.notEqual(null, res.body.token);
        done();
      });
  });
});
