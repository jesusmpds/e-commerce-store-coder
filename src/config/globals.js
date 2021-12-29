let envFile;
if (NODE_ENV.trim() == "development") {
  envFile = require("dotenv").config();
}

module.exports = {
  PORT: process.env.PORT ? Number(process.env.PORT) : 8080,
  NODE_ENV: process.env.NODE_ENV || "development",
  MONGO_URI: process.env.MONGO_URI || "",
  JWT_SECRET: process.env.SECRET || "PasSwoRd123",
};
