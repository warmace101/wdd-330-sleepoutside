// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

//ec-added these lines 6 - 12, to This ensures that getLocalStorage("so-cart") always returns 
// a usable array—even if localStorage is empty, null, or corrupted.
// retrieve data from localstorage
export function getLocalStorage(key) {
  const value = JSON.parse(localStorage.getItem(key));
  return Array.isArray(value) ? value : [];
}

// to save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// to clear data from local storage (optional utility)
export function clearLocalStorage(key) {
  localStorage.removeItem(key);
}

// to set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

// to get the product id from the query string
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}

export function renderListWithTemplate(
  template,
  parentElement,
  list,
  position = "afterbegin",
  clear = false,
) {
  const htmlStrings = list.map(template);
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;
  if (callback) {
    callback(data);
  }
}

async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}

export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("../partials/header.html");
  const footerTemplate = await loadTemplate("../partials/footer.html");

  const headerElement = document.querySelector("#main-header");
  const footerElement = document.querySelector("#main-footer");

  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTemplate, footerElement);
}

// updated to reflect total quantity, not just unique items
export function updateCartCount() {
  const cartItems = getLocalStorage("so-cart");
  const cartCountElement = document.getElementById("cart-count");
  if (cartCountElement) {
    const totalQuantity = cartItems.reduce(
      (sum, item) => sum + (item.quantity || 1),
      0
    );
    cartCountElement.textContent = totalQuantity;
  }
}