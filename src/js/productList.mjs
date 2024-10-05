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
  constructor(category, dataSource, listElement, HtmlElement, productCategory) {
    // We passed in this information to make our class as reusable as possible.
    // Being able to define these things when we use the class will make it very flexible
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.HtmlElement = HtmlElement;
    this.productCategory = productCategory;
  }
  async init() {
    // our dataSource will return a Promise...so we can use await to resolve it.
    const list = await this.dataSource.getData(this.category);
    // render the list
    this.renderList(list);
    //set the title to the current category
    document.querySelector('.title').innerHTML = this.category;

     //get data
    //const list = await this.dataSource.getData(this.productCategory);
     // console.log(list);
   // this.renderList(this.filterPoductList(list));  
  }
  //
   filterPoductList(list) {
     const desiredIds = ['880RR', '985RF', '985PR', '344YJ'];
     return list.filter((product) => desiredIds.includes(product.Id));
   }

  // render after doing the first stretch
  renderList(list) {
     // console.log('HtmlElement:', this.HtmlElement);
    renderListWithTemplate(productCardTemplate, this.listElement, list);
    renderListWithTemplate(productCardTemplate, this.HtmlElement, list);
    renderListWithTemplate(discounted,this.HtmlElement,list);


  }}
    function discounted(product){ 
      
        const retail = `${product.SuggestedRetailPrice}`;
        const price = `${product.FinalPrice}`;
      
         if (price > retail){ // The price must be less than retail
         const sing = document.createElement('p');
         const discount = retail - price
         sing.textContent = `Discount ${discount}`
         document.querySelector('.discount').appendChild(sing)    
         
         
  }}