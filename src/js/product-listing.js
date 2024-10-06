import ProductData from './ProductData.mjs';
import ProductListing from './productList.mjs';
import { loadHeaderFooter, getParams } from './utils.mjs';

loadHeaderFooter();

const category = getParams('category');

const productData = new ProductData('tents');

const element = document.querySelector('.product-list');
const listProducts = new ProductListing(productData, category, element);

listProducts.init();
