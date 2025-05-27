import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
  return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${item.Image}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;
}

renderCartContents();

// Calculate and show cart total
document.addEventListener("DOMContentLoaded", () => {
  const cartItems = getLocalStorage("so-cart") || [];
  const cartFooter = document.getElementById("cart-footer");
  const cartTotalElement = document.getElementById("cart-total");

  if (cartItems.length > 0) {
    cartFooter.classList.remove("cart-footer-hide");

    const total = cartItems.reduce((sum, item) => {
      // Ensure it's a clean float (e.g., remove $)
      const rawPrice =
        typeof item.FinalPrice === "string"
          ? item.FinalPrice
          : item.FinalPrice.toString();
      const cleanedPrice = parseFloat(rawPrice.replace(/[^0-9.]/g, ""));
      return sum + (isNaN(cleanedPrice) ? 0 : cleanedPrice);
    }, 0);

    cartTotalElement.textContent = `$${total.toFixed(2)}`;
  }
});
