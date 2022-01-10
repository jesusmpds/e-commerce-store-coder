const router = require("express").Router();
const upload = require("../../utils/fileUpload");

module.exports = (productsController) => {
  router
    .get("/", (req, res, next) =>
      productsController.getAllProducts(req, res, next)
    )
    .post("/", upload.single("thumbnail"), (req, res, next) =>
      productsController.addProduct(req, res, next)
    )
    .patch("/:id", (req, res, next) =>
      productsController.updateProduct(req, res, next)
    )
    .delete("/:id", (req, res, next) =>
      productsController.deleteProduct(req, res, next)
    )
    .get("/:id", (req, res, next) =>
      productsController.getProduct(req, res, next)
    );

  return router;
};
