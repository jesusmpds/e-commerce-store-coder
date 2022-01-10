export const handlePasswordValidation = (urlPath) => {
  if (urlPath === "/signup") {
    const firstPassword = document.getElementById("passwordSignUp");
    const lastPassword = document.getElementById("repeatPasswordSignUp");
    let passwordIsEqual = false;
    let signupForm = document.getElementById("signupForm");

    signupForm.addEventListener("change", (event) => {
      if (event.target === firstPassword || lastPassword) {
        if (
          lastPassword.value === firstPassword.value &&
          firstPassword.value != ""
        ) {
          firstPassword.classList.remove("passwordNotEqual");
          lastPassword.classList.remove("passwordNotEqual");

          firstPassword.classList.add("passwordMatches");
          lastPassword.classList.add("passwordMatches");

          passwordIsEqual = true;
        } else {
          firstPassword.classList.remove("passwordMatches");
          lastPassword.classList.remove("passwordMatches");

          firstPassword.classList.add("passwordNotEqual");
          lastPassword.classList.add("passwordNotEqual");
          passwordIsEqual = false;
        }
      }
    });
    const checkPasswordMatch = (evt) => {
      evt.preventDefault();
      passwordIsEqual === true
        ? signupForm.submit()
        : Swal.fire(
            "Opss",
            "Tus constraseñas no coinciden. Rectifica e intentalo de nuevo",
            "error"
          );
    };
    signupForm.addEventListener("submit", checkPasswordMatch);
  }
};
