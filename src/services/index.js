const cartService = require("./modules/cartService");
const chatService = require("./modules/chatService");
const productsService = require("./modules/productsService");
const PersistenceFactory = require("../dal/indexFactory");
const { MEM_TYPE } = require("../config/globals");

const dao = PersistenceFactory.get(MEM_TYPE);
module.exports = {
  cartService: new cartService(dao.cartDao),
  chatService: new chatService(dao.chatDao),
  productsService: new productsService(dao.productDao),
};
