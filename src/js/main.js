import ProductData from './ProductData.mjs';
import ProductListing from './ProductList.mjs';

const dataSource = new ProductData('tents');
const element = document.querySelector('.product-list');
//category, dataSource, listElement
const dataList = new ProductListing('tents', dataSource, element);

dataList.init();

console.log(dataList);
