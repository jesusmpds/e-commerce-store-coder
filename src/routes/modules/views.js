const res = require("express/lib/response");
const isAuthenticated = require("../../middleware/isAuthenticated");
const { chatService } = require("../../services");
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

  router.get("/chat", isAuthenticated, (req, res) =>
    viewController.getAllMessages(req, res)
  );

  router.get("/chat/:email", isAuthenticated, (req, res) =>
    viewController.getAllMessagesByEmail(req, res)
  );
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

  router.get("/perfil", isAuthenticated, (req, res) => {
    const userInfo = req.user.toJSON();
    res.render("pages/perfil", { userInfo });
  });

  router.get("/error", (req, res) => {
    res.render("pages/error");
  });

  return router;
};
