const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
// Load User model
const User = require('../model/User');

module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'username' }, (username , password, done) => {
      // Match user
      User
      .findOne({ username : username })
      .lean()
      .then(user => {
        if (!user) {
          return done(null, false);
        }

        // Match password
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        });
      });
    })
  );


  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    User.findOne({ _id: id})
    .lean()
    .select("-password")
    .then(user => done(null, user))
    .catch(err => done(err, null))
  });
};