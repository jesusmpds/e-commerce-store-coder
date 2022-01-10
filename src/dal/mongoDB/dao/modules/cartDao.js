const logger = require("../../../../utils/logger");
const { cartDTO } = require("../../dto/cart.dto");
module.exports = class {
  constructor(model) {
    this.model = model;
  }
  async getAllCartItems(userId) {
    try {
      const allItems = await this.model
        .findOne({ userId })
        .populate(["products"])
        .lean();

      return cartDTO(allItems);
    } catch (error) {
      logger.error(error);
    }
  }

  async addCart(cart) {
    try {
      const newCart = await this.model.create(cart);
      await newCart.populate(["products"]);
      return newCart;
    } catch (error) {
      logger.error(error);
    }
  }

  async updateCart(id, newProduct) {
    try {
      const cartUpdated = await this.model
        .findOneAndUpdate(
          { user: id },
          { $push: { products: newProduct } },
          {
            new: true,
          }
        )
        .populate(["products"]);

      return cartUpdated;
    } catch (error) {
      logger.error(error);
    }
  }

  async deleteCart(user) {
    try {
      const cartToDelete = await this.model.deleteOne(user);
      return cartToDelete;
    } catch (error) {
      logger.error(error);
    }
  }
};
