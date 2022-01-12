const { chatController } = require("../../controllers/index");

module.exports = (io) => {
  //Chat
  io.on("connection", async (socket) => {
    console.log("¡Nuevo cliente conectado!");

    //Recibir nuevo mensaje
    socket.on("newMessage", async (mensaje) => {
      let messages = await chatController.saveMessage(socket, mensaje);
    });
  });
};
