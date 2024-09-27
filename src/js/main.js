// Import the ProductData and ProductListing classes
import ProductData from './ProductData.js'; // Make sure the path and casing are correct
import ProductListing from './productList.mjs'; // Ensure the path is correct

// Assuming the product list will be rendered in an element with the ID 'product-list'
const productListElement = document.getElementById('product-list');

// Create a new ProductData instance pointing to the JSON file
const productData = new ProductData('/json/tents.json');

// Create an instance of ProductListing for the 'Tents' category
const productListing = new ProductListing('Tents', productData, productListElement);

// Call the init method to load and display the products
productListing.init();