/* Upadated import from utils.mjs line 3 */
import {
  getLocalStorage,
  setLocalStorage,
  loadHeaderFooter,
} from "./utils.mjs";

loadHeaderFooter();

// ec -- added lines 6 - 12 for clean re-rendering
function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  enableRemoveButtons(); // Re-attach listeners every time
  updateCartTotal(); // Update the total after render
}

// ec -- modified lines 16 - 35 and, 40 - 58;
// 31 to update hardcoded quantity display to allow flexibility and show actual quantity
function cartItemTemplate(item) {
  const name = item.Name || item.NameWithoutBrand || "Unnamed product";
  const image =
    item.Image || item.Images?.PrimaryMedium || "../images/default.jpg";
  const color = item.Colors?.[0]?.ColorName || "N/A";

  return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${image}" alt="${name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${name}</h2>
    </a>
    <p class="cart-card__color">${color}</p>  
    <p class="cart-card__quantity">qty: ${item.quantity || 1}</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
    <button class="remove-item" data-id="${item.Id}">Remove</button>
  </li>`;
}

renderCartContents();

// ec -- added lines 40 - 58 to handle remove item from cart logic
function enableRemoveButtons() {
  document.querySelectorAll(".remove-item").forEach((button) => {
    button.addEventListener("click", (e) => {
      const itemId = e.target.dataset.id;
      //console.log("Clicked remove for ID:", itemId); // Added for debug purpose

      if (confirm("Are you sure you want to remove this item?")) {
        let cartItems = getLocalStorage("so-cart") || [];
        cartItems = cartItems.filter(
          (item) => String(item.Id) !== String(itemId),
        );
        //console.log("Updated cart:", cartItems); // added for debug purpose

        setLocalStorage("so-cart", cartItems);

        renderCartContents(); // Re-render after update
      }
    });
  });
}

// Calculate and show cart total
document.addEventListener("DOMContentLoaded", () => {
  const cartItems = getLocalStorage("so-cart") || [];
  const cartFooter = document.getElementById("cart-footer");
  const cartTotalElement = document.getElementById("cart-total");

  /*const total = cartItems.reduce((sum, item) => {
  const price = parseFloat(item.FinalPrice.toString().replace(/[^0-9.]/g, ""));
  return sum + (isNaN(price) ? 0 : price * (item.quantity || 1));
}, 0);*/

  if (cartItems.length > 0) {
    cartFooter.classList.remove("cart-footer-hide");

    const total = cartItems.reduce((sum, item) => {
      const rawPrice =
        typeof item.FinalPrice === "string"
          ? item.FinalPrice
          : item.FinalPrice.toString();
      const cleanedPrice = parseFloat(rawPrice.replace(/[^0-9.]/g, ""));
      return (
        sum + (isNaN(cleanedPrice) ? 0 : cleanedPrice * (item.quantity || 1))
      );
    }, 0);

    cartTotalElement.textContent = `$${total.toFixed(2)}`;
  }
});

// ec-- added these lines 88 - 108 to update cart total real time
function updateCartTotal() {
  const cartItems = getLocalStorage("so-cart") || [];
  const cartFooter = document.getElementById("cart-footer");
  const cartTotalElement = document.getElementById("cart-total");

  if (cartItems.length > 0) {
    cartFooter.classList.remove("cart-footer-hide");

    const total = cartItems.reduce((sum, item) => {
      const rawPrice =
        typeof item.FinalPrice === "string"
          ? item.FinalPrice
          : item.FinalPrice.toString();
      const cleanedPrice = parseFloat(rawPrice.replace(/[^0-9.]/g, ""));
      return (
        sum + (isNaN(cleanedPrice) ? 0 : cleanedPrice * (item.quantity || 1))
      );
    }, 0);

    cartTotalElement.textContent = `$${total.toFixed(2)}`;
  } else {
    cartFooter.classList.add("cart-footer-hide");
    cartTotalElement.textContent = "$0.00";
  }
}
