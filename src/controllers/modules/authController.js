const { etherealSendMail } = require("./emailController");
const dayjs = require("dayjs");

exports.logIn = (req, res, next) => {
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
};

exports.logOut = (req, res, next) => {
  try {
    console.log("Ingresó a Logout");

    const dataForEmail = {
      username: req.user.email,
      date: dayjs().format("[(]DD/MM/YYYY hh[:]mm[:]ss[)]"),
      message: `${req.user.first_name}, logged out`,
    };
    etherealSendMail(dataForEmail);
    req.logout();

    res.render("partials/logOut");
  } catch (error) {
    console.log(error);
  }
};

exports.signUp = (req, res, next) => {
  res.render("pages/signUp");
};

exports.failureSignUp = (req, res, next) =>
  res.render("partials/failureSignUp");

exports.failureLogIn = (req, res, next) => res.render("partials/failureLogIn");
