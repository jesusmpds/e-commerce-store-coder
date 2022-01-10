const isAuthenticated = require("../../middleware/isAuthenticated");
const logger = require("../../utils/logger");
const router = require("express").Router();

// --------------------------Product Views---------------------------//
module.exports = (viewController) => {
  router.get("/", isAuthenticated, (req, res) => {
    res.redirect("/productos");
    return;
  });

  router.get("/productos", isAuthenticated, (req, res, next) =>
    viewController.getAllProducts(req, res, next)
  );

  router.get("/productos/:id", isAuthenticated, (req, res, next) =>
    viewController.getProduct(req, res, next)
  );

  router.get(
    "/productos/categoria/:categoria",
    isAuthenticated,
    (req, res, next) => viewController.getProductByCategory(req, res, next)
  );

  // -------------------------Cart View -------------------------------//
  router.get("/carrito", isAuthenticated, async (req, res, next) =>
    viewController.getCartByUserId(req, res, next)
  );

  // ---------------- Chat Views--------------------------------/

  // --------------- Other views------------------------------/

  router.get("/entorno", isAuthenticated, (req, res) => {
    const userInfo = req.user.toJSON();
    const {
      PORT,
      NODE_ENV,
      MONGO_URI,
      USERNAME_GMAIL,
      SESSION_EXP_TIME,
    } = require("../../config/globals");
    const envInfo = {
      PORT,
      NODE_ENV,
      MONGO_URI,
      USERNAME_GMAIL,
      SESSION_EXP_TIME,
    };
    res.render("pages/entorno", { envInfo, userInfo });
  });

  router.get("/agregar-productos", isAuthenticated, (req, res) => {
    const userInfo = req.user.toJSON();
    res.render("pages/adminPanel", { userInfo });
  });

  return router;
};
