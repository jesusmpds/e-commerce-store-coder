module.exports = authController = (notificationService) => ({
  logIn(req, res, next) {
    if (req.isAuthenticated()) {
      console.log("Usuario logueado");
      const loggedUsername = req.session.user;
      console.log(loggedUsername);

      return res.redirect("/productos");
    } else {
      console.log("Usuario no logueado");
      res.render("pages/logIn");
      return;
    }
  },

  logOut(req, res, next) {
    try {
      console.log("Ingresó a Logout");
      req.logout();

      res.render("partials/logOut");
    } catch (error) {
      console.log(error);
    }
  },

  signUp(req, res, next) {
    res.render("pages/signUp");
  },

  async newUserSignup(req, res) {
    await notificationService.alertNewUser(req.user);
    res.redirect("/productos");
  },

  failureSignUp(req, res, next) {
    res.render("partials/failureSignUp");
  },

  failureLogIn(req, res, next) {
    res.render("partials/failureLogIn");
  },
});
