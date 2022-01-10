const logger = require("../../utils/logger");

module.exports = class {
  constructor(productsService) {
    this.productsService = productsService;
  }

  async addProduct(req, res, next) {
    try {
      req.body.imageURL = `/images/products/${req.file.filename}`;

      const newProduct = await this.productsService.addProduct(req.body);
      return res.status(201).json(newProduct);
    } catch (error) {
      next(error);
    }
  }

  async getAllProducts(req, res, next) {
    try {
      const allProducts = await this.productsService.getAllProducts();
      return res.json(allProducts);
    } catch (error) {
      logger.error(`Error: ${error}`);
      next(error);
    }
  }

  async getProduct(req, res, next) {
    try {
      const oneProduct = await this.productsService.getProduct(req.params.id);
      return res.json(oneProduct);
    } catch (error) {
      logger.error(`Error: ${error}`);
      next(error);
    }
  }

  async getProductByCategory(req, res, next) {
    try {
      const products = await this.productsService.getProductByCategory(
        req.params.category
      );
      return res.json(products);
    } catch (error) {
      logger.error(`Error: ${error}`);
      next(error);
    }
  }

  async updateProduct(req, res, next) {
    try {
      const { body, params } = req;
      const updateProduct = await this.productsService.updateProduct(
        params.id,
        body
      );
      res.json(updateProduct);
    } catch (error) {
      logger.error(`Error: ${error}`);
      next(error);
    }
  }

  async deleteProduct(req, res, next) {
    try {
      const productDeleted = await this.productsService.deleteProduct(
        req.params.id
      );
      res.json(productDeleted);
    } catch (error) {
      logger.error(`Error: ${error}`);
      next(error);
    }
  }
};
