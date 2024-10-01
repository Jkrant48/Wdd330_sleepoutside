import { renderListWithTemplate } from './utils.mjs';

function productCardTemplate(product) {
  return `<li class="product-card">
            <a href="product_pages/?product=${product.Id}">
              <img
                src= ${product.Image}
                alt="Image of ${product.Name}"
              />
              <h3 class="card__brand">${product.Brand.Name}</h3>
              <h2 class="card__name">${product.Name}</h2>
              <p class="product-card__price">$${product.ListPrice}</p>
              <div class="discount"</div></a
            >
          </li>`;
}

export default class ProductListing {
  constructor(dataSource, productCategory, HtmlElement) {
    this.dataSource = dataSource;
    this.productCategory = productCategory;
    this.HtmlElement = HtmlElement;
  }

  async init() {
    //get data
    const list = await this.dataSource.getData(this.productCategory);
    console.log(list);
    this.renderList(this.filterPoductList(list));  
    this.discounted()
  }

  filterPoductList(list) {
    const desiredIds = ['880RR', '985RF', '985PR', '344YJ'];
    return list.filter((product) => desiredIds.includes(product.Id));
  }

  renderList(list) {
    console.log('HtmlElement:', this.HtmlElement);

    renderListWithTemplate(productCardTemplate, this.HtmlElement, list);
  }
 
discounted (product){ 
   const retail = product.SuggestedRetailPrice;
   const price = product.FinalPrice;
  if (price > retail){ 
    const sing = document.createElement('p');
    sing.textContent = `Discount`;
    document.querySelector('.discount').appendChild(sing)   
}
}
}

