const router = require("express").Router();

module.exports = (cartController) => {
  router
    .get("/", (req, res, next) =>
      cartController.getCartByUserId(req, res, next)
    )
    .post("/", (req, res, next) =>
      cartController.addShoppingCartByUserId(req, res, next)
    )
    .put("/", (req, res, next) =>
      cartController.updateorCreateShoppingCartByUserId(req, res, next)
    )
    .patch("/:id", (req, res, next) =>
      cartController.updateorCreateShoppingCartByUserId(req, res, next)
    )
    .delete("/", (req, res, next) =>
      cartController.deleteShoppingCartByUserId(req, res, next)
    )
    .post("/checkout", (req, res, next) =>
      cartController.checkout(req, res, next)
    );
  return router;
};
