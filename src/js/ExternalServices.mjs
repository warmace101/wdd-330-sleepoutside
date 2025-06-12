const baseURL = import.meta.env.VITE_SERVER_URL || "https://wdd330-backend.onrender.com/";
//const baseURL = import.meta.env.VITE_SERVER_URL;

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ExternalServices {
  constructor() {}

  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
  }

  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);
    return data.Result;
  }

  // Search Products
  async searchProducts(query, category = "") {
  let results = [];

  try {
    // If there's a category, fetch all products under that category
    if (category) {
      //console.log(`Fetching by category: ${category}`);
      const response = await fetch(`${baseURL}products/search/${encodeURIComponent(category)}`);
      const data = await convertToJson(response);
      const allInCategory = data.Result || [];

      if (query) {
        const queryLower = query.toLowerCase();

        // Filter locally
        results = allInCategory.filter(p =>
          p.Name.toLowerCase().includes(queryLower) ||
          (p.NameWithoutBrand && p.NameWithoutBrand.toLowerCase().includes(queryLower)) ||
          (p.Brand?.Name?.toLowerCase().includes(queryLower)) ||
          (p.DescriptionHtmlSimple?.toLowerCase().includes(queryLower))
        );

        //console.log(`Filtered ${results.length} results for query "${query}" in category "${category}"`);
      } else {
        results = allInCategory;
      }
    } else if (query) {
      // If no category, try backend search by name
      //console.log(`Fetching by search query only: ${query}`);
      const response = await fetch(`${baseURL}products/search/${encodeURIComponent(query)}`);
      const data = await convertToJson(response);
      results = data.Result || [];
    }
  } catch (err) {
    //console.error("Search fetch failed:", err);
  }

  return results;
}

async checkout(payload) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    return await fetch(`${baseURL}checkout/`, options).then(convertToJson);
  }
}
