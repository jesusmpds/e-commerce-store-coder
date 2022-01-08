const router = require("express").Router();
const upload = require("../../utils/fileUpload");

module.exports = (productsController) => {
  router
    .get("/", productsController.getAllProducts)
    .post("/", upload.single("thumbnail"), productsController.addProduct)
    .patch("/:id", productsController.updateProduct)
    .delete("/:id", productsController.deleteProduct)
    .get("/categoria/:categoria", productsController.getProductByCategory)
    .get("/:id", productsController.getProduct);

  return router;
};
