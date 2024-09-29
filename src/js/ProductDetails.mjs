import { setLocalStorage } from './utils.mjs';

function productDetailsTemplate(product) {
  let originalPrice = product.FinalPrice; // Assuming FinalPrice is the discounted price
  let discountedPrice = originalPrice;
  let discountDisplay = '';

  // Check if the product has a discount
  if (product.Discount && product.Discount > 0) {
    // Calculate the original price before discount
    discountedPrice = originalPrice - (originalPrice * product.Discount / 100);
    discountDisplay = `<p class="product-card__discount">
      Discount: <span class="discount-amount">${product.Discount}% off!</span>
    </p>`;
  }

    return `<section class="product-detail">
        <h3>${product.Brand.Name}</h3>

        <h2 class="divider">${product.NameWithoutBrand}</h2>

        <img
          class="divider"
          src= ${product.Image}
          alt=${product.Name}
        />

        <p class="product-card__price">${product.ListPrice}</p>

        <p class="product__color">${product.Colors[0].ColorName}</p>

        <p class="product__description">${product.DescriptionHtmlSimple}</p>

        <div class="product-detail__add">
          <button id="addToCart" data-id=${product.Id}>Add to Cart</button>
        </div>
        </section>`
}


export default class ProductDetails{

    constructor(productId, dataSource){
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }

    async init(){
        this.product = await this.dataSource.findProductById(this.productId);
        
        this.renderProductDetails('main');

        document
       .getElementById('addToCart')
       .addEventListener('click', this.addToCart.bind(this));

    }

    addToCart() {
        setLocalStorage('so-cart', this.product);
    }


    renderProductDetails(selector){
        const element = document.querySelector(selector);
        element.insertAdjacentHTML(
            'Afterbegin', productDetailstemplate(this.product)
        );
    }

}