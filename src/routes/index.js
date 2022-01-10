const {
  cartController,
  productsController,
  chatController,
  authController,
  viewController,
  ordersController,
} = require("../controllers/index");

const productsRouter = require("./modules/products");
const vistas = require("./modules/views");
const carritoRouter = require("./modules/cart");
const chatRouter = require("./modules/chat");
const authRouter = require("./modules/auth");
const ordersRouter = require("./modules/orders");

module.exports = (io) => ({
  ordersRouter: ordersRouter(ordersController),
  productsRouter: productsRouter(productsController),
  vistas: vistas(viewController),
  authRouter: authRouter(authController),
  carritoRouter: carritoRouter(cartController),
  chatRouter: chatRouter(io, chatController),
});
