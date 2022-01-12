export const handleChat = (urlPath) => {
  //Chat
  if (/\/(chat).*/.test(urlPath)) {
    const socket = io({ transports: ["websocket"] });
    let messages = document.getElementById("messagesContainer");
    let inputEmail = document.getElementById("emailChat");
    let inputFirstName = document.getElementById("firstName");
    let inputLastName = document.getElementById("lastName");
    let messageInput = document.getElementById("messageChat");
    let botonEnviar = document.getElementById("buttonSendMessage");

    botonEnviar.addEventListener("click", async () => {
      if (messageInput.value) {
        const message = {
          author: {
            email: inputEmail.innerText,
            firstName: inputFirstName.innerText,
            lastName: inputLastName.innerText,
          },
          body: messageInput.value,
        };

        socket.emit("newMessage", message);
        console.log(message);
        messageInput.value = "";
      } else {
        alert("Añada un mensaje");
      }
    });

    socket.on("newMessage", (msg) => {
      let item = document.createElement("div");
      const body = document.createTextNode(msg.body).wholeText;
      const date = new Date(msg.date);
      const newDate = date.toString();

      item.innerHTML = `
            <span class="badge bg-dark">${msg.author.firstName}</span>
          <div>
            <p id="messageBody" class="small p-2 ms-3 mb-1 rounded-3" style="background-color: #f5f6f7;">${body}</p>
            <p class="small me-3 mb-3 rounded-3 d-flex justify-content-end">${newDate}</p>
          </div>`;
      messages.appendChild(item);
    });
  }
};
