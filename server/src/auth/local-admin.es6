const { Strategy } = require('passport-local');
const treesDb = require('../models/trees-db.es6');
const util = require('../services/util.es6');

const localAdminStrategy = (loginUrl) => {
  const strategy = new Strategy({ usernameField: 'email' }, async (email, password, done) => {
    if (email && password && email === 'test@test.com') {
      const username = 'TEST_USER';
      let userData = {};
      try {
        const forestsData = await treesDb.christmasTreesForests.findAll();
        userData = {
          adminUsername: username,
          email: 'admin@example.com',
          role: 'admin',
          forests: util.getEauthForests('Super', forestsData),
          poc1_forests: util.getPOC1Forests('Super', forestsData),
          poc2_forests: util.getPOC2Forests('Super', forestsData)
        };
      } catch (error) {
        userData = {
          adminUsername: username,
          email: 'admin@example.com',
          role: 'admin',
          forests: ['all'],
          poc1_forests: ['all'],
          poc2_forests: ['all']
        };
      }
      return done(null, userData);
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
