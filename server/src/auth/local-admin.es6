const { Strategy } = require('passport-local');
const util = require('../services/util.es6');

const localAdminStrategy = (loginUrl) => {
  const strategy = new Strategy({ usernameField: 'email' }, (email, password, done) => {
    if (email && password && email === 'test@test.com') {
      const username = 'FS_Open-Forest_arp_POC2^FS_Open-Forest_flathead_POC2^FS_Open-Forest_mbs_POC1';
      return done(null, {
        adminUsername: username,
        email: 'admin@example.com',
        role: 'admin',
        forests: util.getEauthForests(username),
        poc1_forests: util.getPOC1Forests(username),
        poc2_forests: util.getPOC2Forests(username)
      });
    }
    return done(null, false);
  });

  strategy.authenticate = function _authenticate(req, options) {
    if (req.method === 'POST' && req.body) {
      return Strategy.prototype.authenticate.call(this, req, options);
    }
    return this.redirect(loginUrl);
  };

  return strategy;
};

module.exports = localAdminStrategy;
