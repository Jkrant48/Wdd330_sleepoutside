import { setLocalStorage, getLocalStorage } from './utils.mjs';

function productDetailsTemplate(product) {
  console.log('productDetailsTemplate(product)');
  console.log(product);
  let originalPrice = product.FinalPrice; // Assuming FinalPrice is the discounted price
  let discountedPrice = originalPrice; // Initialize discounted price
  let discountDisplay = ''; // Initialize discount display message

  // Check if the product has a discount
  if (product.Discount && product.Discount > 0) {
    // Calculate the original price before discount
    discountedPrice = originalPrice - (originalPrice * product.Discount) / 100;
    discountDisplay = `<p class="product-card__discount">
      Discount: <span class="discount-amount">${product.Discount}% off!</span>
    </p>`;
  }

  return `<section class="product-detail">
        <h3>${product.Brand.Name}</h3>
        <h2 class="divider">${product.NameWithoutBrand}</h2>
        <img
          class="divider"
        src="${product.Images.PrimaryLarge}"
        alt="${product.NameWithoutBrand}"
        />
      ${discountDisplay}
      <p class="product-card__price">Original Price: <s>$${originalPrice.toFixed(2)}</s></p>
      <p class="product-card__price">Discounted Price: $${discountedPrice.toFixed(2)}</p>
        <p class="product__color">${product.Colors[0].ColorName}</p>
      <p class="product__description">
        ${product.DescriptionHtmlSimple}
      </p>
        <div class="product-detail__add">
        <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
        </div>
    </section>`;
}

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    // console.log('constructor: productId');
    // console.log(productId);
    this.dataSource = dataSource;
    // console.log('constructor: dataSource');
    // console.log(dataSource);
    this.product = {};
    // console.log('this.product');
    // console.log(this.product);
  }

  async init() {
    // use our datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
    // this.product = await this.dataSource.findProductById(this.productId);
    this.product = await this.dataSource.findProductById(this.productId);
    // console.log('init: ');
    // console.log(this.product);
    //render product details out into html
    this.renderProductDetails('main');
    //add event handlers
    document
      .getElementById('addToCart')
      .addEventListener('click', this.addToCart.bind(this)); //I removed the bind
  }

  addToCart() {
    let cart = getLocalStorage('so-cart') || [];
    if (!Array.isArray(cart)) {
      cart = [];
    }
    //check to see if product is already in cart
    const existsInCart = cart.find((product) => product.Id === this.product.Id);
    //if it exists in cart increase the quantity
    if (existsInCart) {
      existsInCart.quantity++;
    } else {
      this.product.quantity = 1;
      cart.push(this.product);
    }
    // console.log(cart);

    setLocalStorage('so-cart', cart);
  }

  renderProductDetails(selector) {
    const element = document.querySelector(selector);
    // console.log('renderProductDetails: ');
    // console.log(selector);
    // console.log(this.product);
    element.insertAdjacentHTML(
      'afterBegin',
      productDetailsTemplate(this.product),
    );
  }
}
