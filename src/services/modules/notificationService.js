const nodemailer = require("nodemailer");
const {
  NODEMAILER_EMAIL,
  NODEMAILER_EMAIL_PASSW,
} = require("../../config/globals");
const { newUserEmailContent } = require("../../utils/emailHTML");

const transporterEthereal = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false,
  auth: {
    user: NODEMAILER_EMAIL,
    pass: NODEMAILER_EMAIL_PASSW,
  },
});

const sendMailSignup = async (user) => {
  await transporterEthereal.sendMail({
    from: " Taberna",
    to: user.email,
    subject: `Nuevo registro`,
    html: newUserEmailContent(user),
  });
};

const sendMailOrder = async (first_name, email, total, products) => {
  try {
    await transporterEthereal.sendMail({
      from: "Taberna",
      to: email,
      subject: `Nuevo pedido de ${first_name} (${email})`,
      html: `<h3>Detalle de compra: </h3>
                <p>Valor total: $${total}</p>
                <ul>Productos: 
                    ${products.map((product) => {
                      return `<li>Nombre: ${product.name}</li>
                      <li>Descripción: ${product.description}</li>
                      <li>Precio: ${product.price}</li>
                      <li>Cantidad: ${product.qty}</li>
                      <br>`;
                    })}
                </ul>    
            `,
    });
    console.log("Alerta de mail enviada");
  } catch (error) {
    console.log(`Error al enviar mail: ${error}`);
  }
};

module.exports = notificationService = () => ({
  async alertNewUser(userData) {
    try {
      await sendMailSignup(userData);
    } catch (error) {
      console.log(error);
    }
  },

  async alertNewOrder(order) {
    const { first_name, email, phone } = order.user;
    const { total, products } = order;
    try {
      await sendMailOrder(first_name, email, total, products);
    } catch (error) {
      console.log(error);
    }
  },
});
