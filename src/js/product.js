import { getParams } from "./utils.mjs";
import ProductDetails from "./productDetails.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

//use the get params function to get the product id from url
const productId = getParams("product");

const product = new ProductDetails(productId, dataSource);
product.init();

/*function addProductToCart(product) {
  const cart = getLocalStorage("so-cart") || []; //get existing items
  cart.push(product); //add new item
  setLocalStorage("so-cart", cart); //update local storage
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);*/
