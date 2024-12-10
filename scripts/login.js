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
      // window.location.href = "/index.html";
      localStorage.setItem("loginMessage", "Welcome ❤️ Login Successful");

      // Redirect to index.html after a delay to allow the modal to show
      setTimeout(() => {
        window.location.href = "/index.html"; // Change path if necessary
      }, 200); // Delay of .2 second to show the modal before redirecting
    })
    .catch((error) => {
      console.error("Login failed:", error.response.data.error);
      alert("Invalid credentials. Please try again.");
    });
});
