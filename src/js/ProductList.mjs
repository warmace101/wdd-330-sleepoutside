import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  return `
    <li class="product-card">
      <a href="/product_pages/?product=${product.Id}">
        <img src="${product.Images.PrimaryMedium}" alt="${product.Name}">
        <h3>${product.Brand.Name}</h3>
        <p>${product.NameWithoutBrand}</p>
        <p class="product-card__price">$${product.FinalPrice}</p>
      </a>
    </li>
    `;
}

// ec -- modified this section lines 16 to 23
export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.products = [];  // stores products to avoid re-fetching
  }


// ec -- added lines 26 to 51; To sort the product list
async init() {
    const products = await this.dataSource.getData(this.category);
    this.products = products;
    this.render("name"); // default sort
  }

  // render takes sort method
  render(sortBy) {
    let sorted = [...this.products]; // do not mutate original array

    // Clear list before inserting new items
    this.listElement.innerHTML = "";

    // Sort by selected option
    if (sortBy === "name") {
      sorted.sort((a, b) =>
        a.NameWithoutBrand.toLowerCase().localeCompare(b.NameWithoutBrand.toLowerCase())
      );
    } else if (sortBy === "price") {
      sorted.sort((a, b) => a.FinalPrice - b.FinalPrice);
    }

    renderListWithTemplate(productCardTemplate, this.listElement, sorted);
  }
} 

