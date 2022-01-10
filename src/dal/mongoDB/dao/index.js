const productDao = require("./modules/productDao");
const cartDao = require("./modules/cartDao");
const chatDao = require("./modules/chatDao");
const usersDao = require("./modules/usersDao");
const ordersDao = require("./modules/ordersDao");
let {
  productsModel,
  cartModel,
  messagesModel,
  usersModel,
  ordersModel,
} = require("../models/index");

module.exports = {
  productDao: new productDao(productsModel),
  cartDao: new cartDao(cartModel),
  chatDao: new chatDao(messagesModel),
  usersDao: new usersDao(usersModel),
  ordersDao: new ordersDao(ordersModel),
};
