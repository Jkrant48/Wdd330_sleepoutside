function productCardTemplate(product) {
    return `<ul class="product-list">
            <li class="product-card">
            <a href="product_pages/index.html?product=${product.id}">
                <img
                src=${product.Image}
                alt=${product.Name}
                />
                <h3 class="card__brand">${product.Brand.Name}</h3>
                <h2 class="card__name">${product.NameWithoutBrand}</h2>
                <p class="product-card__price">$${product.ListPrice}</p></a
            >
            </li>
        </ul>`
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
        console.log(this.dataSource);
        this.renderList(this.dataSource);
    }

    renderList(list) {
        // For each product in the array, generate the product card HTML structure
        const productListHtml = list.map(product => productCardTemplate(product)).join('');
        
        // Insert the generated HTML into the DOM
        this.listElement.insertAdjacentHTML('afterbegin', productListHtml);        
    }
}