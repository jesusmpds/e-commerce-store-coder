const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { validPassword, createPassword } = require("../utils/passwordUtil");
const {
  etherealNewUserSendMail,
} = require("../controller/modules/emailController");

module.exports = (userModel) => {
  const customFields = {
    usernameField: "email",
    passReqToCallback: true,
  };

  const loginCallback = async (req, email, password, done) => {
    try {
      const user = await userModel.findOne({ email: email }).lean();

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
      const user = await userModel.find({ email: email }).lean();
      console.log(user);
      if (user.length) {
        return done(
          null,
          false,
          console.log("mensaje:", "Hay un usuario registrado con su mail")
        );
      } else {
        const { firstName, lastName, email, age, phone, address, password } =
          req.body;

        const newUser = {
          email: email,
          first_name: firstName,
          last_name: lastName,
          age: age,
          phone: phone,
          address: address,
          avatarUrl: `/uploads/${req.file.filename}`,
          password: await createPassword(password),
        };
        const newCreatedUser = await userModel.create(newUser);
        etherealNewUserSendMail(newUser);
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
