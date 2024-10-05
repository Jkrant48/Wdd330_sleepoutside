import ProductData from './ProductData.mjs';
import ProductListing from './productList.mjs';
import { getParams, loadHeaderFooter } from './utils.mjs';

loadHeaderFooter();

const category = getParams('category');
//first create an instance of our ProductData class.
const dataSource = new ProductData();
//then get the element we want the product list to render in
const productListDOM = document.querySelector('.product-list');
//then create an instance of our ProductList class and send it the correct information.
const myList = new ProductListing(dataSource, category, productListDOM);
//finally call the init method to show our products
myList.init();

