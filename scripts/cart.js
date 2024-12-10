import products from "./products";
// selection elements
const cart = () => {
  const cartIcon = document.querySelector(".cart__icon");
  const closeBtn = document.querySelector(".close");
  let body = document.querySelector("body");
  let cart = [];

  // event listeners
  cartIcon.addEventListener("click", toggleCart);
  closeBtn.addEventListener("click", closeCart);

  //functions
  function toggleCart() {
    body.classList.toggle("active__tap-cart");
  }
  function closeCart() {
    body.classList.remove("active__tap-cart");
  }

  const setProductInCart = (idProduct, quantity, position) => {
    if (quantity > 0) {
      if (position < 0) {
        cart.push({
          product_id: idProduct,
          quantity: quantity,
        });
      } else {
        cart[position].quantity = quantity;
      }
    } else {
      cart.splice(position, 1);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    refreshCart();
  };
  const refreshCart = () => {
    let listHtml = document.querySelector(".cart__list");
    let totalHtml = document.querySelector(".cart__icon span");
    let totalQuantity = 0;
    listHtml.innerHTML = null;
    cart.forEach((item) => {
      totalQuantity = totalQuantity + item.quantity;
      let postion = products.findIndex((value) => value.id == item.product_id);
      let info = products[postion];
      let newItem = document.createElement("div");
      newItem.classList.add("item");
      newItem.innerHTML = `
       <div class="image">
       <img src="${info.image}"/>
       </div>
        <div class="name">${info.name}</div>
        <div class="totalPrice">$
        ${info.price * item.quantity}
        </div>
        <div class="quantity">
        <span class="minus" data-id="${info.id}">-</span>
        <span>${item.quantity}</span>
        <span class="plus" data-id="${info.id}">+</span>
        </div>
      `;
      listHtml.appendChild(newItem);
    });
    totalHtml.innerText = totalQuantity;
  };

  //EventListeners
  document.addEventListener("click", (event) => {
    let buttonClicked = event.target;
    let idProduct = buttonClicked.dataset.id;
    let postion = cart.findIndex((value) => value.product_id === idProduct);
    let quantity = postion < 0 ? 0 : cart[postion].quantity;

    if (buttonClicked.classList.contains("addCart") || buttonClicked.classList.contains("plus")) {
      quantity++;
      setProductInCart(idProduct, quantity, postion);
    } else if (buttonClicked.classList.contains("minus")) {
      quantity--;
      setProductInCart(idProduct, quantity, postion);
    }
  });
  const initApp = () => {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    refreshCart();
  };
  initApp();
};

export default cart;
