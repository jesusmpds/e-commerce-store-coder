const passport = require("passport");
const upload = require("../../utils/fileUpload");
const router = require("express").Router();

module.exports = ({ logIn, logOut, signUp, failureSignUp, failureLogIn }) => {
  router
    .post(
      "/login",
      passport.authenticate("login", {
        failureRedirect: "/wrong-login",
        successRedirect: "/productos",
      })
    )
    .post(
      "/signup",
      passport.authenticate("signup", {
        failureRedirect: "/user-exist",
        successRedirect: "/productos",
      })
    )
    .get("/login", logIn)
    .get("/logout", logOut)
    .get("/signup", signUp)
    .get("/user-exist", failureSignUp)
    .get("/wrong-login", failureLogIn);

  return router;
};
