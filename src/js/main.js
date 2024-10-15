// import ProductData from './ProductData.mjs';
// import ProductListing from './productList.mjs';
import { loadHeaderFooter } from './utils.mjs';
import Alert from './alert.js';

loadHeaderFooter();

// Function to handle search
function handleSearch(event) {
  event.preventDefault(); // Prevents the form from submitting the traditional way
  const searchInput = document.querySelector('#search-input').value.trim();

  if (searchInput) {
    // Navigate to the product list page with the search query as a URL parameter
    window.location.href = `product-listing/index.html?search=${encodeURIComponent(searchInput)}`;
  }
}

// Add event listener to the search form
const searchForm = document.querySelector('#search-form');
if (searchForm) {
  searchForm.addEventListener('submit', handleSearch);
}

//add Alert
const myAlert = new Alert();
myAlert.loadAlerts();
