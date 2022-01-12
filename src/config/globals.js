if (process.env.NODE_ENV === "development") require("dotenv").config();

module.exports = {
  PORT: process.env.PORT ? Number(process.env.PORT) : 8080,
  NODE_ENV: process.env.NODE_ENV || "development",
  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/myapp",
  JWT_SECRET: process.env.SECRET || "PasSwoRd123",
  MEM_TYPE: process.env.MEM_TYPE || "MEM",
  SECRET: process.env.SECRET,
  USERNAME_GMAIL: process.env.USERNAME_GMAIL,
  PASS_GMAIL: process.env.PASS_GMAIL,
  NODEMAILER_EMAIL: process.env.NODEMAILER_EMAIL,
  NODEMAILER_EMAIL_PASSW: process.env.NODEMAILER_EMAIL_PASSW,
  SESSION_EXP_TIME: Number(process.env.SESSION_EXP_TIME) || 600000,
};
