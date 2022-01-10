const {
  cartService,
  chatService,
  productsService,
  notificationService,
  ordersService,
} = require("../services/index");

const cartController = require("./modules/cartController");
const chatController = require("./modules/chatController");
const productsController = require("./modules/productsController");
const viewController = require("./modules/viewController");
const authController = require("./modules/authController");
const ordersController = require("./modules/ordersController");

module.exports = {
  productsController: new productsController(productsService),
  cartController: new cartController(cartService, notificationService),
  chatController: new chatController(chatService),
  viewController: new viewController(productsService, cartService, chatService),
  ordersController: ordersController(ordersService, notificationService),
  authController: authController(notificationService),
};
