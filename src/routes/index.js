const productsRouter = require("./modules/products");
const vistas = require("./modules/views");
const carritoRouter = require("./modules/cart");
const chatRouter = require("./modules/chat");
const authRouter = require("./modules/auth");

const {
  cartController,
  productsController,
  chatController,
  authController,
} = require("../controllers/index");

module.exports = () => ({
  productsRouter: productsRouter(productsController),
  vistas: vistas(productsController, cartController),
  authRouter: authRouter(authController),
  carritoRouter: carritoRouter(cartController),
});
