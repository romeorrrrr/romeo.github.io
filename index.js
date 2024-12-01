document.addEventListener("DOMContentLoaded", function () {
  const isLogged = localStorage.getItem("isLogged");
  const profilePicUrl = localStorage.getItem("profilePic");
  const icon = document.getElementById("icon");
  icon.style.display = "none";
  if (isLogged && profilePicUrl) {
    icon.style.fontSize = "0px";
    icon.style.display = "block";
    icon.innerHTML = `<img src="${profilePicUrl}" alt="Profile Picture" style="width: 40px; height: 40px; border-radius: 50%;">`;
  }
});
