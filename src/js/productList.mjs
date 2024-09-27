import { renderListWithTemplate } from './utils.mjs';

export default class ProductListing {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init() {
        // Fetch the product list from the dataSource
        const list = await this.dataSource.getData();

        // Filter to show only the first 4 products
        const filteredList = this.filterProducts(list, 4); 

        // Render the filtered list
        this.renderList(filteredList);
    }

    renderList(products) {
        // Use the utility function to render the products
        renderListWithTemplate(productCardTemplate, this.listElement, products, 'afterbegin', true);
    }

    // Method to filter products to a given number (default is 4)
    filterProducts(list, count = 4) {
        return list.slice(0, count);
    }
}

// Template function to generate the HTML for each product card
function productCardTemplate(product) {
    return `
        <li class="product-card">
            <a href="product_pages/index.html?product=${product.id}">
                <img src="${product.image}" alt="Image of ${product.name || 'Product Image'}">
                <h3 class="card__brand">${product.brand || 'Brand not available'}</h3>
                <h2 class="card__name">${product.name}</h2>
                <p class="product-card__price">$${product.price.toFixed(2)}</p>
            </a>
        </li>
    `;
}
