import {renderListWithTemplate} from './utils.mjs';

function productCardTemplate(product) {
    return `<li class="product-card">
            <a href="product_pages/index.html?product=${product.Id}">
                <img
                src=${product.Image}
                alt=${product.Name}
                />
                <h3 class="card__brand">${product.Brand.Name}</h3>
                <h2 class="card__name">${product.NameWithoutBrand}</h2>
                <p class="product-card__price">$${product.ListPrice}</p></a
            >
            </li>`        
}

//generate a list of product cards in HTML from an array
export default class ProductListing {
    //takes product category, the dataSource and the HTML element to render product list to
    constructor (category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;  //I set it up here even though I set it in the init()
        this.listElement = listElement;
        
    }

    async init() {
        this.dataSource = await this.dataSource.getData();
        //calling getData() here works as long as a ProductData object is passed 
        // console.log('init() productListing object')
        console.log(this.dataSource);
        let filteredList = this.filterList(this.dataSource);
        this.renderList(filteredList);
        // console.log('ProductListing: this.ListElement');
        // console.log(this.listElement);       
        
    }

    filterList(list) {
        let filteredList = list.filter(
          (product) => product.Id !== "989CG" && product.Id !== "880RT"
        );
        
        return filteredList;
      }

    renderList(list) {
        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }
    // renderList(list) {
    //     // For each product in the array, generate the product card HTML structure
    //     const productListHtml = list.map(product => productCardTemplate(product)).join('');
        
    //     // Insert the generated HTML into the DOM
    //     this.listElement.insertAdjacentHTML('afterbegin', productListHtml);        
    // }
}
