const router = require("express").Router();

module.exports = (cartController) => {
  router
    .get("/", cartController.getCartByUserId)
    .post("/", cartController.addShoppingCartByUserId)
    .put("/:id", cartController.updateorCreateShoppingCartByUserId)
    .delete("/", cartController.deleteShoppingCartByUserId)
    .post("/checkout", cartController.checkout);
  return router;
};
