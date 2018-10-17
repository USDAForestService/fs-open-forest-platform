'use strict';

/**
 * Module for local stub authentication in development and test. This
 * middleware adds a user to every request, skipping any authentication checks.
 * @module auth/local
 */

const util = require('../services/util.es6');

function localAuth(req, res, next) {
  // Test authentication is enabled e.g do nothing and use production
  // authentication
  if (util.isTestProductionAuthenticationEnabled()) {
    return next();
  }

  req.user = {
    adminUsername: 'TEST_USER',
    email: 'test@test.com',
    role: util.localUser(),
    forests: util.getAdminForests('TEST_USER')
  };

  next();
}

module.exports = localAuth;
