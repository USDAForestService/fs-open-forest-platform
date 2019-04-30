const { Strategy } = require('passport-local');

const localPublicStrategy = (loginUrl) => {
  const strategy = new Strategy({ usernameField: 'email' }, (email, password, done) => {
    if (email && password) {
      return done(null, {
        email,
        role: 'user',
        // the token is required to logout of login.gov
        token: 'ABC123'
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

module.exports = localPublicStrategy;
