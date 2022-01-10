const router = require("express").Router();

module.exports = (ordersController) => {
  router.post("/", (req, res, next) =>
    ordersController.createOrder(req, res, next)
  );

  return router;
};
