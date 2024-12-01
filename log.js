async function checkValues() {
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const emailValues = email.value.trim();
  const passwordValue = password.value.trim();
  let isValid = true;

  try {
    if (emailValues.length > 5 && emailValues.length < 30) {
      email.style.border = "1px solid green";
    } else {
      email.style.border = "1px solid red";
      isValid = false;
    }

    if (passwordValue.length > 5 && passwordValue.length < 30) {
      password.style.border = "1px solid green";
    } else {
      password.style.border = "1px solid red";
      isValid = false;
    }

    if (isValid) {
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailValues,
          password: passwordValue,
        }),
      });

      const errorMessage = document.getElementById("errorMessage");
      if (response.ok) {
        const responseData = await response.json();
        localStorage.setItem("isLogged", "true");
        localStorage.setItem("profilePic", responseData.profilePic);

        errorMessage.style.display = "block";
        errorMessage.textContent = "Conectare reusita!";
        setTimeout(() => {
          window.location.href = "index.html";
        }, 3000);
        return true;
      } else {
        const message = await response.text();
        errorMessage.style.display = "block";
        errorMessage.textContent = message;
        return false;
      }
    }
  } catch (error) {
    console.error("Eroare la logare!", error);
    return false;
  }
}
