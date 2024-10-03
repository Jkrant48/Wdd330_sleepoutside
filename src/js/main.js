import ProductData from './ProductData.mjs';
import ProductListing from './productList.mjs';
import { loadHeaderFooter } from './utils.mjs';

const productData = new ProductData('tents');
const element = document.querySelector('.product-list');
const listProducts = new ProductListing(productData, 'Tents', element);
loadHeaderFooter();
listProducts.init();
