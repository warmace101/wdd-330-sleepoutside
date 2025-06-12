import { renderListWithTemplate, getParam, loadHeaderFooter } from "../js/utils.mjs";
import ExternalServices from "../js/ExternalServices.mjs";

window.ExternalServices = ExternalServices;


loadHeaderFooter();

function productCardTemplate(product) {
  return `
    <li class="product-card">
      <a href="/product_pages/index.html?product=${product.Id}">
        <img src="${product.Images.PrimaryMedium}" alt="${product.Name}">
        <h3>${product.Brand.Name}</h3>
        <p>${product.NameWithoutBrand}</p>
        <p class="product-card__price">$${product.FinalPrice}</p>
      </a>
    </li>
  `;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.products = [];
  }

  // Allow manual setting of product data 
  setProductList(products) {
    this.products = products;
  }

  // Load products by category and then render
  async init() {
    if (this.category) {
      const products = await this.dataSource.getData(this.category);
      this.products = products;
      this.render("name"); // default sort
    }
  }

  // Render product list with optional sort
  render(sortBy = "name") {
    let sorted = [...this.products];

    if (sortBy === "name") {
      sorted.sort((a, b) =>
        a.NameWithoutBrand.toLowerCase().localeCompare(b.NameWithoutBrand.toLowerCase())
      );
    } else if (sortBy === "price") {
      sorted.sort((a, b) => a.FinalPrice - b.FinalPrice);
    }

    if (sorted.length === 0) {
    this.listElement.innerHTML = "<p>No products found.</p>";
    return;
  }

    this.listElement.innerHTML = ""; // to clear old list
    renderListWithTemplate(productCardTemplate, this.listElement, sorted);
  }
}
