const compression = require("compression");
const express = require("express");
const router = express.Router();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

module.exports = (modules) => {
  // Middleware Routes
  router
    .use(express.json())
    .use(express.urlencoded({ extended: false }))
    .use(cors())
    .use(compression())
    .use(express.static(path.join("./src/public")))
    .use(cookieParser());

  // Api Inyection
  router.use("/api/ordenes", modules.ordersRouter);
  router.use("/api/productos", modules.productsRouter);
  router.use("/api/carrito", modules.carritoRouter);
  router.use(modules.vistas);
  router.use(modules.authRouter);

  return router;
};
