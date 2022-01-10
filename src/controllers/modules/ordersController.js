module.exports = ordersController = (orderService, notificationService) => ({
  async createOrder(req, res, next) {
    try {
      const { user, total, products } = req.body;
      const order = {
        products,
        total,
        user,
      };
      const newOrder = await orderService.createOrder(order);
      await notificationService.alertNewOrder(newOrder);
      res.json(newOrder);
    } catch (error) {
      console.log(error);
    }
  },
});
