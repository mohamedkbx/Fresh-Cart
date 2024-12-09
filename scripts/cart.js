// selection elements

const cart = () => {
  const cartIcon = document.querySelector(".cart__icon");
  const closeBtn = document.querySelector(".close");
  let body = document.querySelector("body");

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
};

export default cart;
