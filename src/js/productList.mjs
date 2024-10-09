import { renderListWithTemplate } from './utils.mjs';

function productCardTemplate(product) {
    return `<li class="product-card">
                <a href="../product_pages/index.html?product=${product.Id}">
                    <img src="${product.Images.PrimaryMedium}" alt="Image of ${product.Name}" />
                    <h3 class="card__brand">${product.Brand.Name}</h3>
                    <h2 class="card__name">${product.Name}</h2>
                    <p class="product-card__price">$${product.ListPrice}</p>
                    <div class="discount"></div>
                </a>            
            </li>`;
}

export default class ProductListing {
    constructor(dataSource, productCategory, HtmlElement) {
        this.dataSource = dataSource;
        this.productCategory = productCategory;
        this.HtmlElement = HtmlElement;
        this.productList = []; // Store the product list
    }

    async init(searchQuery) {
        // Fetch the product list
        this.productList = await this.dataSource.getData(this.productCategory);

        // Filter the product list based on the search query if provided
        if (searchQuery) {
            this.productList = this.productList.filter(product =>
                product.Name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Render the filtered product list
        this.renderList(this.productList);
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