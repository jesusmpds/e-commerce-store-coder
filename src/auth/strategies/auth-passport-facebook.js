const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const { FACEBOOK_APP_ID, FACEBOOK_SECRET_ID } = require("../config/globals");
const {
  etherealSendMail,
  gmailSendMail,
} = require("../controller/modules/emailController");
const dayjs = require("dayjs");

module.exports = (userModel) => {
  const facebookOptions = {
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_SECRET_ID,
    callbackURL: "/auth/facebook/callback",
    profileFields: ["id", "name", "picture", "email"],
  };

  const verifyCallback = async (accessToken, refreshToken, profile, done) => {
    try {
      const user = await userModel.findOne({ facebookID: profile.id }).lean();
      const { id, last_name, first_name, picture, email } = profile._json;
      const dataForEmail = {
        username: email,
        date: dayjs().format("[(]DD/MM/YYYY hh[:]mm[:]ss[)]"),
        message: `${first_name}, logged in`,
        picture: picture.data.url,
      };

      if (!user) {
        const data = {
          facebookID: id,
          last_name: last_name,
          first_name: first_name,
          age: "",
          phone: "",
          address: "",
          avatarUrl: picture.data.url,
          email: email,
          password: "",
        };

        const newUser = await userModel.create(data);
        etherealSendMail(dataForEmail);
        gmailSendMail(dataForEmail);
        return done(null, newUser);
      }
      etherealSendMail(dataForEmail);
      gmailSendMail(dataForEmail);
      return done(null, user);
    } catch (error) {
      done(error);
    }
  };
  const loginStrategy = new FacebookStrategy(facebookOptions, verifyCallback);

  passport.use(loginStrategy);
};
