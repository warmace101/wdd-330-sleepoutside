//console.log("product-listing.js loaded"); // for debug
import { loadHeaderFooter, getParam } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";

loadHeaderFooter();

const category = getParam("category"); // from URL like ?category=tents
const searchQuery = getParam("search"); // from search form like ?search=marmot
//console.log("Search query from URL:", searchQuery); // for debug
const dataSource = new ExternalServices();
const listElement = document.querySelector(".product-list");
const listing = new ProductList(category, dataSource, listElement);

// If there's a search query, override category-based listing

async function init() {
  if (searchQuery) {
    try {
      const results = await dataSource.searchProducts(searchQuery, category);
      //console.log("Search results:", results); // for debug

      if (results.length === 0) {
        listElement.innerHTML = "<p>No products found.</p>";
        return; //retun is placed safely inside the function
      }

      listing.setProductList(results);
      listing.render("name");
      document.querySelector(".title").textContent =
        `Results for "${searchQuery}"`;
    } catch (err) {
      //console.error("Search failed:", err); // for debug
    }
  } else {
    await listing.init();
    document.querySelector(".title").textContent = category;
  }
}

init();

// Sorting functionality
document.querySelector("#sort").addEventListener("change", (e) => {
  listing.render(e.target.value);
});
