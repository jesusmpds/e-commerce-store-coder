const logger = require("../../utils/logger");
const { orderTotal } = require("../../utils/orderTotal");

module.exports = class {
  constructor(productsService, cartService) {
    this.productsService = productsService;
    this.cartService = cartService;
  }
  // ------------------- Product Controllers -------------/
  async getAllProducts(req, res, next) {
    try {
      const userInfo = req.user.toJSON();
      let listaDeProductos = await this.productsService.getAllProducts();

      res.render("pages/productos", { listaDeProductos, userInfo });
      return;
    } catch (error) {
      logger.error(`Error: ${error}`);
      next(error);
    }
  }

  async getProduct(req, res, next) {
    try {
      const userInfo = req.user.toJSON();
      let listaDeProductos = await this.productsService.getProduct(
        req.params.id
      );

      res.render("pages/productoDetails", {
        listaDeProductos: listaDeProductos,
        userInfo,
      });
      return;
    } catch (error) {}
  }

  async getProductByCategory(req, res, next) {
    try {
      const userInfo = req.user.toJSON();
      let listaDeProductos = await this.productsService.getProductByCategory(
        req.params.categoria
      );

      res.render("pages/productos", {
        listaDeProductos,
        userInfo,
      });
      return;
    } catch (error) {
      logger.error(`Error: ${error}`);
      next(error);
    }
  }

  // ------------------- Cart Controllers -------------/
  async getCartByUserId(req, res, next) {
    try {
      const userInfo = req.user.toJSON();
      let listaDeProductosEnCarro = await this.cartService.getAllCartItems(
        req.user._id
      );

      const total = orderTotal(listaDeProductosEnCarro);
      if (listaDeProductosEnCarro === null) {
        res.render("pages/carrito", {
          listaDeProductosEnCarro: false,
          total,
          userInfo,
        });
        return;
      }
      res.render("pages/carrito", {
        listaDeProductosEnCarro,
        total,
        userInfo,
      });
      return;
    } catch (error) {
      logger.error(error);
      next(error);
    }
  }
};
