const passport = require("passport");
const upload = require("../../utils/fileUpload");
const router = require("express").Router();

module.exports = ({
  logIn,
  logOut,
  signUp,
  newUserSignup,
  failureSignUp,
  failureLogIn,
}) => {
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
      }),
      (req, res) => newUserSignup(req, res)
    )
    .get("/login", (req, res) => logIn(req, res))
    .get("/logout", (req, res) => logOut(req, res))
    .get("/signup", (req, res) => signUp(req, res))
    .get("/user-exist", (req, res) => failureSignUp(req, res))
    .get("/wrong-login", (req, res) => failureLogIn(req, res));

  return router;
};
