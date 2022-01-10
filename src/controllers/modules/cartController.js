const logger = require("../../utils/logger");
module.exports = class {
  constructor(cartService, notificationService) {
    this.cartService = cartService;
    this.notificationService = notificationService;
  }
  async getCartByUserId(req, res, next) {
    try {
      const { _id } = req.user;
      const shoppingCart = await this.cartService.getAllCartItems(_id);
      return shoppingCart;
    } catch (error) {
      logger.error(error);
    }
  }

  async addShoppingCartByUserId(req, res, next) {
    try {
      const { _id } = req.user;
      const product = req.body;
      const shoppingCartCreated = await this.cartService.addCart({
        user: _id,
        products: product,
      });
      res.send(shoppingCartCreated);
    } catch (error) {
      logger.error(error);
    }
  }

  async updateorCreateShoppingCartByUserId(req, res, next) {
    try {
      const { _id } = req.user;
      const products = req.body;
      const shoppingCartUpdated = await this.cartService.updateCart(
        _id,
        products
      );
      res.send(shoppingCartUpdated);
    } catch (error) {
      logger.error(error);
    }
  }

  async deleteShoppingCartByUserId(req, res, next) {
    try {
      const { _id } = req.user;
      const deleted = await this.cartService.deleteCart(_id);
      res.send(deleted);
    } catch (error) {
      logger.error(error);
    }
  }
};
