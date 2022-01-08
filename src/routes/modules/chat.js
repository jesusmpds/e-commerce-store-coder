module.exports = (io, chatController) => {
  //Chat
  io.on("connection", async (socket) => {
    console.log("¡Nuevo cliente conectado!");

    // Enviar todos los mensajes al chat general
    let messages = await chatController.getAllMessages();
    socket.emit("allMessages", messages);

    //Recibir nuevo mensaje
    socket.on("newMessage", async (mensaje) => {
      let messages = await chatController.saveMessage(socket, mensaje);
    });
  });
};
