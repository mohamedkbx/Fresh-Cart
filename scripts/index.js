import cart from "./cart.js";
import "../sass/main.scss";

let app = document.getElementById("app");
let temporaryContent = document.getElementById("temporary__content");

//load temp file
const loadTemplate = () => {
  fetch("../template.html")
    .then((response) => response.text())
    .then((html) => {
      app.innerHTML = html;
      let contentTap = document.getElementById("content__tap");
      contentTap.innerHTML = temporaryContent.innerHTML;
      temporaryContent.innerHTML = null;
      cart();
      initApp();
    });
};

loadTemplate();

const initApp = () => {
  //Load list product
};
