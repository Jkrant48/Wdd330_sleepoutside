// import ProductData from './ProductData.mjs';
// import ProductListing from './productList.mjs';
import { getLocalStorage, setLocalStorage } from './utils.mjs';
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

//display banner(made it simple to display and set a key if visted)
document.addEventListener('DOMContentLoaded', () => {
  const banner = document.getElementById('registration-banner');
  const register = document.getElementById('register-btn');
  const close_bnr = document.getElementById('close-banner');

  if (!getLocalStorage('hasVisited')) {
    banner.style.display = 'block';
  }

  close_bnr.addEventListener('click', () => {
    banner.style.display = 'none';
    localStorage.setItem('hasVisited', 'true');
  });
});
