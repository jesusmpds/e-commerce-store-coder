const passport = require("passport");
const { usersModel } = require("../dal/models/index");

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((userId, done) => {
    usersModel
      .findById(userId)
      .then((user) => {
        done(null, user);
      })
      .catch((err) => done(err));
  });

  // Passport Strategies
  require("./auth-passport-facebook")(usersModel);
  require("./auth-passport-local")(usersModel);
};
