const compression = require("compression");
const express = require("express");
const router = express.Router();
const cors = require("cors");
const cookieParser = require("cookie-parser");

module.exports = (modules) => {
  // Middleware Routes
  router
    .use(express.json())
    .use(express.urlencoded({ extended: false }))
    .use(cors())
    .use(compression())
    .use("/static", express.static("./src/public"))
    .use(cookieParser());

  // Api Inyection
  router
    .use("/api/productos", modules.productsRouter)
    .use("/carrito", modules.carritoRouter)
    .use(modules.vistas)
    .use(modules.authRouter);

  return router;
};
