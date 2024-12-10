import cart from "./cart.js";
import products from "./products.js";
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
  let productList = document.querySelector(".list__product");
  productList.innerHTML = null;
  products.forEach((product) => {
    let newProduct = document.createElement("div");
    newProduct.classList.add("item");
    newProduct.innerHTML = `
        <img src ="${product.image}"/>
        <h2>${product.name}</h2>
        <div class="price">${product.price}</div>
        <button class="addCart" data-id="${product.id}">
        Add to Cart
        </button>
        `;
    productList.appendChild(newProduct);
  });
};
