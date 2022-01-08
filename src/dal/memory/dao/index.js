const productDao = require("./modules/productDao");
const cartDao = require("./modules/cartDao");

const productDaoInstance = new productDao();

module.exports = {
  productDao: productDaoInstance,
  cartDao: new cartDao(productDaoInstance),
};
