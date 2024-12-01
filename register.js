async function checkValues() {
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const profilePic = document.getElementById("profilePic").value.trim();
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
      const response = await fetch("http://localhost:4000/saveUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailValues,
          password: passwordValue,
          profilePic: profilePic,
        }),
      });
      const errorMessage = document.getElementById("errorMessage");
      if (response.ok) {
        errorMessage.style.display = "block";
        errorMessage.textContent = "Cont creat cu succes!";
        setTimeout(function () {
          window.location.href = "log.html";
        }, 3000);
      } else {
        const message = await response.text();
        errorMessage.style.display = "block";
        errorMessage.textContent = message;
      }
    }
  } catch (error) {
    console.error("Eroare la crearea contului!", error);
  }
}
