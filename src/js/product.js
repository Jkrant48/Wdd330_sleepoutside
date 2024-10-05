import { getParams, loadHeaderFooter } from './utils.mjs';
import ProductDetails from './productDetails.mjs';
import ProductData from './ProductData.mjs';

//runs on product_pages/index.html
const dataSource = new ProductData(); //take out specific category

//use the get params function to get the product id from url
const productId = getParams('product');

const product = new ProductDetails(productId, dataSource);
product.init();
loadHeaderFooter();
