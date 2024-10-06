import ProductData from './ProductData.mjs';
import ProductListing from './productList.mjs';
import { getParams, loadHeaderFooter } from './utils.mjs';

//runs on product-listing.html

loadHeaderFooter();

const category = getParams('category');
const dataSource = new ProductData(category);
const productListDOM = document.querySelector('.product-list');
const myList = new ProductListing(dataSource, category, productListDOM);
myList.init();

class ProductListing {
  constructor(dataSource, category, productListDOM) {
    this.dataSource = dataSource;
    this.category = category;
    this.productListDOM = productListDOM;
  }

  async init() {
    const products = await this.dataSource.getData();
    this.render(products);
  }

  render(products) {
    this.productListDOM.innerHTML = ''; // Clear existing products
    products.forEach(product => {
      const productItem = document.createElement('li');
      productItem.innerHTML = `
        <h3>${product.name}</h3>
        <p>Price: $${product.price}</p>
        ${product.discount ? <p class="discount">Discount: $${product.discount}</p> : ''}
        <button>Add to Cart</button>
      `;
      this.productListDOM.appendChild(productItem);
    });
  }
}