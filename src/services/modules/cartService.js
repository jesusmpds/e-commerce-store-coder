const logger = require("../../utils/logger");

module.exports = class {
  constructor(cartDao) {
    this.cartDao = cartDao;
  }
  async getAllCartItems(userId) {
    try {
      const cart = await this.cartDao.getAllCartItems(userId);
      return cart;
    } catch (error) {
      logger.error(error);
    }
  }

  async addCart(cart) {
    try {
      const newCart = await this.cartDao.addCart(cart);
      return newCart;
    } catch (error) {
      logger.error(error);
    }
  }

  async updateCart(id, newProduct) {
    try {
      const cartUpdated = await this.cartDao.updateCart(id, newProduct);
      return cartUpdated;
    } catch (error) {
      logger.error(error);
    }
  }

  async deleteCart(user) {
    try {
      const cartToDelete = await this.cartDao.deleteCart(user);
      return cartToDelete;
    } catch (error) {
      logger.error(error);
    }
  }
};
