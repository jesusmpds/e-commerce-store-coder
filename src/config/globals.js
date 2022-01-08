require("dotenv").config();

module.exports = {
  PORT: process.env.PORT ? Number(process.env.PORT) : 8080,
  NODE_ENV: process.env.NODE_ENV || "development",
  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/myapp",
  JWT_SECRET: process.env.SECRET || "PasSwoRd123",
  MEM_TYPE: process.env.MEM_TYPE || "MEM",
  SECRET: process.env.SECRET,
};
