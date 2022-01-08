const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    timestamp: { type: Date, default: Date.now },
    name: String,
    description: String,
    category: String,
    imageURL: String,
    price: Number,
    stock: Number,
  },
  { collection: "productos" }
);

module.exports = model("Product", productSchema);
