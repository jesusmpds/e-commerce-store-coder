const cartService = require("./modules/cartService");
const chatService = require("./modules/chatService");
const productsService = require("./modules/productsService");
const notificationService = require("./modules/notificationService");
const ordersService = require("./modules/ordersService");
const PersistenceFactory = require("../dal/indexFactory");
const { MEM_TYPE } = require("../config/globals");

const { productDao, cartDao, chatDao, ordersDao } =
  PersistenceFactory.get(MEM_TYPE);

module.exports = {
  cartService: new cartService(cartDao),
  chatService: new chatService(chatDao),
  productsService: new productsService(productDao),
  notificationService: notificationService(),
  ordersService: new ordersService(ordersDao),
};
