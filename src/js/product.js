import { getParam } from './utils.mjs';
import ProductData from './ProductData.mjs';
import ProductDetails from './ProductData.mjs';

// get json path for catetory, set up instance
const dataSource = new ProductData('tents');
// console.log(dataSource);
//get id from url search string
const productId = getParam('product');
// console.log(productId);
// console.log(dataSource.findProductById(productId));
//set up instance with json source and product id,
const product = new ProductDetails(productId, dataSource);
//product.init();
console.log(product);

// move code to ProductDetails.mjs file and initialize in product above

// function addProductToCart(product) {
//   const cart = getLocalStorage('so-cart') || []; //get existing items
//   cart.push(product); //add new item
//   setLocalStorage('so-cart', cart); //update local storage
// }
// // add to cart button event handler
// async function addToCartHandler(e) {
//   const product = await dataSource.findProductById(e.target.dataset.id);
//   console.log(dataSource.findProductById(e.target.dataset.id));
//   addProductToCart(product);
// }

// // add listener to Add to Cart button
// document
//   .getElementById('addToCart')
//   .addEventListener('click', addToCartHandler);
