import ExternalServices from './ExternalServices.mjs';
import ProductListing from './productList.mjs';
import { getParams, loadHeaderFooter } from './utils.mjs';
import Alert from './alert.js';

//runs on product-listing.html

loadHeaderFooter();

const category = getParams('category');
// console.log(category);
//first create an instance of our ExternalServices class.
// const dataSource = new ProductData(category);
const dataSource = new ExternalServices();
// console.log(dataSource);
//then get the element we want the product list to render in
const productListDOM = document.querySelector('.product-list');
//then create an instance of our ProductList class and send it the correct information.
const myList = new ProductListing(dataSource, category, productListDOM);
//finally call the init method to show our products
myList.init();

const myAlert = new Alert();
myAlert.loadAlerts();
