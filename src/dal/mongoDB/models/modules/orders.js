const {
  Schema,
  model,
  Types: { ObjectId },
} = require("mongoose");
const orderSchema = new Schema(
  {
    products: [],
    total: Number,
    orderNumber: Number,
    date: { type: Date, default: Date.now },
    state: { type: String, default: "generada" },
    user: {
      type: ObjectId,
      ref: "User",
    },
  },
  { collection: "ordenes" }
);

module.exports = model("Order", orderSchema);
