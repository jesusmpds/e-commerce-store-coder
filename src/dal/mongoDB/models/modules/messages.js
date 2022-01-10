const { Schema, model } = require("mongoose");

const messageSchema = new Schema(
  {
    date: { type: Date, default: Date.now },
    author: {
      email: String,
      isAdmin: { type: Boolean, default: false },
      firstName: String,
      lastName: String,
    },
    body: String,
  },
  { collection: "mensajes" }
);

module.exports = model("Message", messageSchema);
