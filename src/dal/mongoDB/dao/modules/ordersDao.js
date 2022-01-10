const { cartDTO } = require("../../dto/cart.dto");

module.exports = class {
  constructor(model) {
    this.model = model;
  }

  async createOrder(order) {
    const products = cartDTO(order);
    order.products = products;
    const newOrder = await this.model.create(order);
    await newOrder.populate(["user"]);
    return newOrder;
  }

  async getNumOrders() {
    const orders = await this.model.find();
    return orders.length;
  }
};
