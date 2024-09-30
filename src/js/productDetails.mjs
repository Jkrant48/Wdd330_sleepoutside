import { setLocalStorage } from './utils.mjs';

<<<<<<< HEAD
function productDetailstemplate(product) {
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
=======
function productDetailsTemplate(product) {
  return `<section class="product-detail"> <h3>${product.Brand.Name}</h3>
      <h2 class="divider">${product.NameWithoutBrand}</h2>
      <img
        class="divider"
          src= ${product.Image}
          alt=${product.Name}
      />
      <p class="product-card__price">$${product.FinalPrice}</p>
      <p class="product__color">${product.Colors[0].ColorName}</p>
      <p class="product__description">
      ${product.DescriptionHtmlSimple}
      </p>
      <div class="product-detail__add">
        <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
      </div></section>`;
>>>>>>> 63830a2650201db1f34e4afe67f88c1e81d1cb55
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