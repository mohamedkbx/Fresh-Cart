import axios from "axios";
import "../sass/pages/login.scss";

const submitBtn = document.querySelector(".submit-btn");

submitBtn.addEventListener("click", () => {
  const email = document.getElementById("e-mail-input").value;
  const password = document.getElementById("password-input").value;

  axios
    .post("https://reqres.in/api/login", {
      email,
      password,
    })
    .then((response) => {
      let token = response.data.token;
      localStorage.setItem("token", token);
      console.log("🚀 ~ .then ~ token:", token);
      // Redirect to the index.html
      window.location.href = "/index.html"; // Uncomment this line for redirection
    })
    .catch((error) => {
      console.error("Login failed:", error.response.data.error);
      alert("Invalid credentials. Please try again.");
    });
});
