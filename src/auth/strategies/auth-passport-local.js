const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { validPassword, createPassword } = require("../../utils/passwordUtil");

module.exports = (usersDao) => {
  const customFields = {
    usernameField: "email",
    passReqToCallback: true,
  };

  const loginCallback = async (req, email, password, done) => {
    try {
      const user = await usersDao.findUserByEmail(email);
      if (!user) {
        return done(null, false);
      }

      const isValid = await validPassword(password, user.password);

      if (isValid) {
        return done(null, user);
      } else {
        console.log("Contraseña incorrecta");
        return done(null, false);
      }
    } catch (err) {
      done(err);
    }
  };

  const signUpCallback = async (req, email, password, done) => {
    try {
      const user = await usersDao.findUserByEmail(email);

      if (user) {
        return done(
          null,
          false,
          console.log("mensaje:", "Hay un usuario registrado con su mail")
        );
      } else {
        const { firstName, lastName, email, phone, address } = req.body;

        const newUser = {
          email: email,
          first_name: firstName,
          last_name: lastName,
          phone: phone,
          address: address,
          password: await createPassword(password),
        };
        const newCreatedUser = await usersDao.addUser(newUser);

        return done(null, newCreatedUser);
      }
    } catch (err) {
      done(err);
    }
  };

  const loginStrategy = new LocalStrategy(customFields, loginCallback);
  const signUpStrategy = new LocalStrategy(customFields, signUpCallback);

  passport.use("login", loginStrategy);
  passport.use("signup", signUpStrategy);
};
