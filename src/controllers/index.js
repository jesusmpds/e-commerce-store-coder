const cartController = require("./modules/cartController");
const chatController = require("./modules/chatController");
const productsController = require("./modules/productsController");
const authController = require("./modules/authController");
const {
  cartService,
  chatService,
  productsService,
} = require("../services/index");

module.exports = {
  productsController: new productsController(productsService),
  cartController: new cartController(cartService),
  chatController: new chatController(chatService),
  authController,
};
