const {
  sendSMS,
  sendWhatsApp,
} = require("../../services/modules/notificationService");
const { gmailSendMail } = require("./emailController");
const logger = require("../../utils/logger");

module.exports = class {
  constructor(cartService) {
    this.cartService = cartService;
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
    const { _id } = req.user;
    const products = req.body;
    console.log(products);
    const shoppingCartUpdated = await this.cartService.updateCart(
      _id,
      products
    );
    res.send(shoppingCartUpdated);
  }

  async deleteShoppingCartByUserId(req, res, next) {
    const { _id } = req.user;
    const deleted = await this.cartService.deleteCart(_id);
    res.send(deleted);
  }

  async checkout(req, res, next) {
    const { _id, name, email, phone } = req.user;

    const shoppingCart = await this.cartService.getAllCartItems(_id);

    const emailContent = `<h1>pedido de ${name}</h1><br/>
                        ${shoppingCart.products.map(
                          ({ nombre }) => `${nombre}<br/>`
                        )}`;
    let whatsappContent = `_orden de ${name} - ${phone}_
  `;
    whatsappContent += shoppingCart.products.map(
      ({ codigo, nombre }) => `-${nombre}[${codigo}]
  `
    );
    await sendWhatsApp(whatsappContent);
    await gmailSendMail(emailContent);

    const deleted = await this.cartService.deleteCart(_id);
    res.send(deleted);
  }
};
