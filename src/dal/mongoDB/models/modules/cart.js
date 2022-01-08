const {
  Schema,
  model,
  Types: { ObjectId },
} = require("mongoose");

const CartSchema = new Schema(
  {
    date: { type: Date, default: Date.now },
    user: {
      type: ObjectId,
      ref: "User",
    },
    products: [
      {
        type: ObjectId,
        ref: "Product",
      },
    ],
  },
  { timestamps: true, collection: "carrito" }
);
CartSchema.set("toJSON", { virtuals: true });

module.exports = model("Cart", CartSchema);
