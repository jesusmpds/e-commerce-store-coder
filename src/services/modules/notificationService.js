const nodemailer = require("nodemailer");
const { PASS_GMAIL } = require("../../config/globals");

exports.transporterEthereal = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false,
  auth: {
    user: "rachael.connelly@ethereal.email",
    pass: "fmQfpubfyZfkbCBtc9",
  },
});

exports.transporterGmail = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "jmpdscode@gmail.com",
    pass: PASS_GMAIL,
  },
});
