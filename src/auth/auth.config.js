const PersistenceFactory = require("../dal/indexFactory");
const { MEM_TYPE } = require("../config/globals");

const { usersDao } = PersistenceFactory.get(MEM_TYPE);

module.exports = (passport) => {
  // Passport Strategies
  require("./strategies/auth-passport-local")(usersDao);

  // Serialization
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((userId, done) => {
    usersDao
      .findUserByID(userId)
      .then((user) => {
        done(null, user);
      })
      .catch((err) => done(err));
  });
};
