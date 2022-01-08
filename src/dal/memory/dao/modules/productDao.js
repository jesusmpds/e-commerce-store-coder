module.exports = class {
  constructor() {
    this.db = [];
  }
  async getProduct(id) {
    return this.db.find((product) => product.id === id);
  }

  async getProductByCategory(category) {
    return this.db.find((product) => product.category === category);
  }

  async getAllProducts() {
    return this.db;
  }
  async addProduct(product) {
    const { id, name, description, category, price, stock } = product;
    const newProduct = {
      id: id,
      name: name,
      description: description,
      category: category,
      price: price,
      stock: stock,
    };
    this.db.push(newProduct);
    return newProduct;
  }
  async updateProduct(id, updatedProduct) {
    const { name, description, category, price, stock } = updatedProduct;
    const productToEdit = this.db.find((product) => product.id === id);
    if (productToEdit) {
      productToEdit.name = name;
      productToEdit.description = description;
      productToEdit.category = category;
      productToEdit.price = price;
      productToEdit.stock = stock;

      return productToEdit;
    } else {
      return `Producto no encontrado`;
    }
  }
  async deleteProduct(id) {
    const dbUpdated = this.db.filter((product) => product.id !== id);
    return dbUpdated;
  }
};
