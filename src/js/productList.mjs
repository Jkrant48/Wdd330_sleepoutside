import { renderListWithTemplate } from './utils.mjs';

function productCardTemplate(product) {


    console.log('productDetailsTemplate(product)');
    console.log(product);
  
    let originalPrice = product.SuggestedRetailPrice || product.ListPrice;  // Use SuggestedRetailPrice if available, fallback to ListPrice
    let discountedPrice = product.FinalPrice;  // FinalPrice is already the discounted price
    let discountDisplay = '';  // Initialize discount display message
  
    // Check if the product has a discount by comparing SuggestedRetailPrice and FinalPrice
    if (product.SuggestedRetailPrice && product.SuggestedRetailPrice > product.FinalPrice) {
      // Calculate the discount percentage
      const discountPercent = ((product.SuggestedRetailPrice - product.FinalPrice) / product.SuggestedRetailPrice) * 100;
      discountDisplay = `<p class="product-card__discount">
        <span class="discount-flag">-${discountPercent.toFixed(0)}%</span> off!
      </p>`;
    }
  
    return `<li class="product-card">
          <h3>${product.Brand.Name}</h3>
          <h2 class="divider">${product.NameWithoutBrand}</h2>
          <img
            class="divider"
            src="${product.Images.PrimaryMedium}"  // Use PrimaryMedium image size
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
      </li>`;
  }
  

 
export default class ProductListing {
    constructor(dataSource, productCategory, HtmlElement) {
        this.dataSource = dataSource;
        this.productCategory = productCategory;
        this.HtmlElement = HtmlElement;
        this.productList = []; // Store the product list
    }

    async init() {
        this.productList = await this.dataSource.getData(this.productCategory);
        this.renderList(this.productList);
        console.log('renderList in init()');
        console.log(this.renderList(this.productList));
        document.querySelector('.title').innerHTML = this.productCategory;

        // Add sorting event listener
        const sortOptions = document.getElementById('sortOptions');
        sortOptions.addEventListener('change', () => {
            this.sortProducts(sortOptions.value);
        });
    }

    sortProducts(criteria) {
        // Create a copy of the product list to sort
        const sortedList = [...this.productList]; // Use spread operator to create a shallow copy
        if (criteria === 'name') {
            sortedList.sort((a, b) => a.Name.localeCompare(b.Name));
        } else if (criteria === 'price') {
            sortedList.sort((a, b) => a.ListPrice - b.ListPrice);
        }
        this.renderList(sortedList); // Render the sorted list
    }

    renderList(list) {
        renderListWithTemplate(productCardTemplate, this.HtmlElement, list);
    }
}

function discounted(product) { 
  const retail = `${product.SuggestedRetailPrice}`;
  const price = `${product.FinalPrice}`;

  if (price < retail) { // The price must be less than retail
    const sing = document.createElement('p');
    const discount = retail - price;
    sing.textContent = `Discount ${discount}`;
    document.querySelector('.discount').appendChild(sing);
  }
}
