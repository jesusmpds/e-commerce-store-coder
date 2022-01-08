const socket = io();

const chatMessages = (urlPath) => {
  //Chat
  if (/\/(chat).*/.test(urlPath)) {
    let messages = document.getElementById("messagesContainer");
    let inputEmail = document.getElementById("emailChat");
    let inputFirstName = document.getElementById("firstName");
    let inputLastName = document.getElementById("lastName");
    let userAge = document.getElementById("userAge");
    let userAvatar = document.getElementById("userAvatar").src;
    let messageInput = document.getElementById("messageChat");
    let botonEnviar = document.getElementById("buttonSendMessage");

    botonEnviar.addEventListener("click", async () => {
      if (messageInput.value) {
        const message = {
          author: {
            email: inputEmail.innerText,
            firstName: inputFirstName.innerText,
            lastName: inputLastName.innerText,
            age: userAge.innerText || null,
            avatar: userAvatar,
          },
          text: messageInput.value,
        };

        let messageText = messageInput.value;
        if (messageText.includes("administrador")) {
          console.log("post init");
          const data = {
            email: inputEmail.value,
            message: messageInput.value,
          };
          try {
            const response = await fetch("/send-sms", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            });
          } catch (error) {
            console.log(error);
          }
        }

        socket.emit("newMessage", message);
        messageInput.value = "";
      } else {
        alert("Añada un mesnaje");
      }
    });

    // Receive message and add them to the chat
    socket.on("allMessages", (msgs) => {
      msgs.forEach((msg) => {
        let item = document.createElement("div");
        item.innerHTML = `<img src="${msg.author.avatar}" class="rounded-circle" alt="Avatar del usuario"
            style="width: 45px; height: 45px;">
            <span class="badge bg-dark">${msg.author.firstName}</span>
          <div>
            <p class="small p-2 ms-3 mb-1 rounded-3" style="background-color: #f5f6f7;">${msg.text}</p>
            <p class="small me-3 mb-3 rounded-3 text-muted d-flex justify-content-end">${msg.date}</p></div>`;

        messages.appendChild(item);
      });
    });

    socket.on("newMessage", (msg) => {
      let item = document.createElement("div");
      item.innerHTML = `<img src="${msg.author.avatar}" class="rounded-circle" alt="Avatar del usuario"
            style="width: 45px; height: 45px;">
            <span class="badge bg-dark">${msg.author.firstName}</span>
          <div>
            <p class="small p-2 ms-3 mb-1 rounded-3" style="background-color: #f5f6f7;">${msg.text}</p>
            <p class="small me-3 mb-3 rounded-3 text-muted d-flex justify-content-end">${msg.date}</p></div>`;
      messages.appendChild(item);
    });
  }
};
