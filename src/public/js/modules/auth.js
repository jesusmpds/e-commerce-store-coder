export const handleLoginLogOut = (urlPath) => {
  if (urlPath === "/login") {
    const username = document.getElementById("userNameLogIn");
    const password = document.getElementById("passwordlogin");
    const logInButton = document.getElementById("logInButton");

    logInButton.addEventListener("click", async (event) => {
      event.preventDefault();
      try {
        const data = {
          email: username.value,
          password: password.value,
        };
        await fetch("/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          redirect: "follow",
          body: JSON.stringify(data),
        }).then((res) => {
          if (!res.ok) {
            throw new Error("Network response was not OK");
          }
          if (res.redirected) {
            window.location.href = res.url;
          }
        });
      } catch (error) {
        console.trace(error);
      }
    });
  }

  if (urlPath === "/logout") {
    setTimeout(() => (window.location.href = "/login"), 2500);
  }
};
