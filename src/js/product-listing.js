import ProductData from './ProductData.mjs';
import ProductListing from './productList.mjs';
import { getParams, loadHeaderFooter } from './utils.mjs';

// Run the header and footer loading function
loadHeaderFooter();

// Get the parameters from the URL
const category = getParams('category');
const searchQuery = getParams('search'); // Get the search parameter

// Create an instance of the ProductData class
const dataSource = new ProductData();

// Get the element where the product list will render
const productListDOM = document.querySelector('.product-list');

// Create an instance of the ProductListing class
const myList = new ProductListing(dataSource, category, productListDOM);

// Call the init method to show products
myList.init(searchQuery); // Pass the searchQuery to the init method