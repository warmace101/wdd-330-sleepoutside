import { getLocalStorage, setLocalStorage, updateCartCount } from "./utils.mjs";
//import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    // use the datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
    this.product = await this.dataSource.findProductById(this.productId);
    // the product details are needed before rendering the HTML
    this.renderProductDetails();
    // once the HTML is rendered, add a listener to the Add to Cart button
    // Notice the .bind(this). This callback will not work if the bind(this) is missing. Review the readings from this week on "this" to understand why.
    document
      .getElementById("add-to-cart")
      .addEventListener("click", this.addProductToCart.bind(this));
  }

  // ec -- added lines 23 to 44 to check for duplicate items in cart
 addProductToCart() {
  const cartItems = getLocalStorage("so-cart") || [];

  // Check if product already exists in cart
  const existingItem = cartItems.find(item => item.Id === this.product.Id);

  if (existingItem) {
    // If found, increment quantity +1
    existingItem.quantity = (existingItem.quantity || 1) + 1;
  } else {
    // If not found, add with quantity 1
    const productToAdd = {
      ...this.product,
      quantity: 1
    };
    cartItems.push(productToAdd);
  }

  setLocalStorage("so-cart", cartItems);
  updateCartCount(); //This updates the cart count in the header
}

  renderProductDetails() {
    productDetailsTemplate(this.product);
  }
}

function productDetailsTemplate(product) {
  document.querySelector("h2").textContent =
    product.Category.charAt(0).toUpperCase() + product.Category.slice(1);
  document.querySelector("#p-brand").textContent = product.Brand.Name;
  document.querySelector("#p-name").textContent = product.NameWithoutBrand;

  const productImage = document.querySelector("#p-image");
  productImage.src = product.Images.PrimaryExtraLarge;
  productImage.alt = product.NameWithoutBrand;
  const euroPrice = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(Number(product.FinalPrice) * 0.85);
  document.querySelector("#p-price").textContent = `${euroPrice}`;
  document.querySelector("#p-color").textContent = product.Colors[0].ColorName;
  document.querySelector("#p-description").innerHTML =
    product.DescriptionHtmlSimple;

  document.querySelector("#add-to-cart").dataset.id = product.Id;
}

// ec-- added these lines 72 - 92; add safe checks 
// by errors from missing or differently named fields and ensures the cart always displays something.
function cartItemTemplate(item) {
  const name = item.Name || item.NameWithoutBrand || "Unnamed product";
  const image = item.Image || item.Images?.PrimaryMedium || "../images/default.jpg";
  const color = item.Colors?.[0]?.ColorName || "N/A";

// ec -- modified line 88 to update hardcoded quantity display 
// to allow flexibility and show actual quantity
  return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${item.Image}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>  
    <p class="cart-card__quantity">qty: ${item.quantity || 1}</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;
}