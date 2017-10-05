'use strict';

const jwts = require('../../src/auth/jwts.es6');
const expect = require('chai').expect;

describe('jwts', () => {
  it('should generate a valid token', done => {
    const user = {
      email: 'meow@mix.com',
      role: 'admin'
    };
    const secret = 'this here is a secret, don\'t tell';
    const token = jwts.generateToken(user, secret);
    jwts.validateToken(token, secret)
      .then(validToken => {
        expect(validToken.email).to.be.equal(user.email);
        expect(validToken.role).to.be.equal(user.role);
        done();
      })
      .catch(done)
  })
})
