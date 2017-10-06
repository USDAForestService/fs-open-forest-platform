'use strict';

const jwt = require('jsonwebtoken');
const uuidV4 = require('uuid/v4');

const vcapConstants = require('../vcap-constants.es6');
const util = require('../util.es6');

const issuer = 'fs-intake-module';
const subject = 'permit applications';
const audience = 'fs-intake-module-users';

const generateToken = function(user, jwtSecretKey) {
  const claims = {
    expiresIn: 120 * 60,
    notBefore: 0,
    jwtid: uuidV4(),
    issuer,
    subject,
    audience
  };

  return jwt.sign(user, jwtSecretKey, claims);
};

const validateToken = function(token, jwtSecretKey) {
  const claims = {
    issuer,
    subject,
    audience
  };
  return new Promise((resolve, reject) => {
    jwt.verify(token, jwtSecretKey, claims, (err, decoded) => {
      if (err) return reject(err);
      resolve(decoded);
    });
  });
};

/**
 * Creates JWT to return to user
 * @param  {Object}   req - Request object
 * @param  {Object}   res - Response object
 * @param  {Function} next - What to call after creating JWT
 */
const generateTokenMiddleware = function(req, res, next) {
  req.token = generateToken(req.user, vcapConstants.jwtSecret);
  next();
};

/**
 * Verifies that token is a valid token
 * @param  {Object}   req - Request object
 * @param  {Object}   res - Response object
 * @param  {Function} next - What to call after verifying token
 */
const validateTokenMiddleware = function(req, res, next) {
  if (util.isLocalOrCI()) {
    util.getUser(req);
    return next();
  }

  const token = req.headers['x-access-token'];

  if (!token) {
    return res.status(403).send({ errors: ['No token provided.'] });
  }

  validateToken(token, vcapConstants.jwtSecret)
    .then(decoded => {
      req.user = decoded;
      return next();
    })
    .catch(() => {
      res.status(401).send({ errors: ['Failed to authenticate token.'] });
    });
};

module.exports = { generateTokenMiddleware, generateToken, validateTokenMiddleware, validateToken };
