import { getParams, loadHeaderFooter } from './utils.mjs';
import ProductDetails from './productDetails.mjs';
// import ProductData from './ProductData.mjs';
import ProductData from './ProductData.mjs';

//runs on product_pages/index.html

// const dataSource2 = new ProductData('tents');
const dataSource2 = new ProductData();
// console.log('after call: new ProductData(): dataSource2');
// console.log(dataSource2);

const productId = getParams('product');
// console.log('getParams: productId');
// console.log(productId);

const product = new ProductDetails(productId, dataSource2);
product.init();
loadHeaderFooter();
