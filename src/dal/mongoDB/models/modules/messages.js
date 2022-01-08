const { Schema, model } = require("mongoose");

const messageSchema = new Schema(
  {
    date: { type: Date, default: Date.now },
    author: {
      email: String,
      type: String,
    },
    body: String,
  },
  { collection: "mensajes" }
);

module.exports = model("Message", messageSchema);
