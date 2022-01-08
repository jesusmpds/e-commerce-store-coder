module.exports = class {
  constructor(chatService) {
    this.chatService = chatService;
  }

  async saveMessage(socket, mensaje) {
    try {
      let messages = await this.chatService.saveMessage(mensaje);
      //Emitir nuevo mensaje al cliente
      socket.emit("newMessage", messages);
    } catch (error) {
      console.log(error);
    }
  }

  async getAllMessages() {
    try {
      const allMessages = await this.chatService.getAllMessages();
      return allMessages;
    } catch (error) {
      console.log(error);
    }
  }

  // async editMessage = async (req,res,next) =>{
  //     try {
  //         const {body, params} = req
  //         const editMessage = await message.editMessage(params.id, body)
  //         res.json(editMessage)
  //     } catch (error) {
  //         res.json(error)
  //     }
  // }

  // async deleteMessage = async (req,res,next) =>{
  //     try {
  //         const deletedMessage = await message.deleteMessage(req.params.id)
  //         res.json(deletedMessage)
  //     } catch (error) {
  //         res.json(error)
  //     }
  // }
};
