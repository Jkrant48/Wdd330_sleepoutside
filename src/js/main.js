import ProductData from './ProductData.mjs';
import ProductListing from './ProductList.mjs';

const dataSource = new ProductData('tents');
//category, dataSource, listElement
const dataList = new ProductListing(
  'tents',
  dataSource,
  document.querySelector('.products h2'),
);
dataList.init();

console.log(dataList);
