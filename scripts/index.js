import cart from "./cart.js";
import products from "./products.js";
import "../sass/main.scss";

const token = localStorage.getItem("token");
if (!token) {
  window.location.href = "/login.html";
} else {
  loadTemplate();
}

const displayLoginMessage = () => {
  const message = localStorage.getItem("loginMessage");
  if (message) {
    const modal = document.getElementById("welcomeModal");
    const closeBtn = document.getElementById("closeModalBtn"); // Changed to 'closeModalBtn'

    // Show the modal with the message
    modal.style.display = "flex";
    document.getElementById("modalMessage").innerText = message;

    // Remove the message from localStorage after displaying
    localStorage.removeItem("loginMessage");

    // Hide the modal after 3 seconds
    setTimeout(() => {
      modal.style.display = "none";
    }, 1500); // Hide after 3 seconds

    // Close the modal immediately when the button is clicked
    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });
  }
};

let app = document.getElementById("app");
let temporaryContent = document.getElementById("temporary__content");

//load temp file
function loadTemplate() {
  fetch("../template.html")
    .then((response) => response.text())
    .then((html) => {
      const app = document.getElementById("app");
      if (app) {
        app.innerHTML = html;
        const contentTap = document.getElementById("content__tap");
        if (contentTap && temporaryContent) {
          contentTap.innerHTML = temporaryContent.innerHTML;
          temporaryContent.innerHTML = null;
        }
        cart();
        initApp();
        displayLoginMessage();
      } else {
        console.error("App container not found.");
      }
    });
}

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
