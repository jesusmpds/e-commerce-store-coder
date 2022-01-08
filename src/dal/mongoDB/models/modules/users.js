const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
  },
  address: String,
  first_name: String,
  last_name: String,
  phone: String,
  password: String,
});

module.exports = model("User", userSchema);
