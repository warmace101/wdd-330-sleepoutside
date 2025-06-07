import { loadHeaderFooter, getParam } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";

loadHeaderFooter();

const category = getParam("category");
const dataSource = new ExternalServices();
const element = document.querySelector(".product-list");
const listing = new ProductList(category, dataSource, element);

// Initialize the product list with default sort (by name)
listing.init();

// Listen for sort change
document.querySelector("#sort").addEventListener("change", (e) => {
  listing.render(e.target.value); // Re-render with selected sort option
});
