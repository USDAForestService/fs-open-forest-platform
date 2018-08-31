const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const vcapConstants = require('../vcap-constants.es6');

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = vcapConstants.PERMIT_SECRET;
opts.issuer = 'accounts.examplesoft.com';
opts.audience = 'yoursite.net';

passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    
//   User.findOne({ id: jwt_payload.sub }, function (err, user) {
//     if (err) {
//       return done(err, false);
//     }
//     if (user) {
//       return done(null, user);
//     } else {
//       return done(null, false);
//       // or you could create a new account
//     }
//   });
}));