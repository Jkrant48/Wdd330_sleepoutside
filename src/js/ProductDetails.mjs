import { setLocalStorage } from './utils.mjs';

function productDetailstemplate(product) {
    let discountMessage = '';
    if (product.SuggestedRetailPrice > product.FinalPrice) {
      const discountAmount = product.SuggestedRetailPrice - product.FinalPrice;
      const discountPercentage = ((discountAmount / product.SuggestedRetailPrice) * 100).toFixed(2);
      discountMessage = `<p class="product__discount">Save $${discountAmount} (${discountPercentage}% off)</p>`;
    }
  
    return `<section class="product-detail">
      <h3>${product.Brand.Name}</h3>
  
      <h2 class="divider">${product.NameWithoutBrand}</h2>
  
      <img
        class="divider"
        src=${product.Image} 
        alt=${product.Name}
      />
  
      <p class="product-card__price">$${product.FinalPrice}</p>
      ${discountMessage}
      
      <p class="product__color">${product.Colors[0].ColorName}</p>
  
      <p class="product__description">${product.DescriptionHtmlSimple}</p>
  
      <div class="product-detail__add">
        <button id="addToCart" data-id=${product.Id}>Add to Cart</button>
      </div>
    </section>`;
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