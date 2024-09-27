export default class ProductData {
    constructor(jsonFilePath) {
        this.jsonFilePath = jsonFilePath;
        this.products = [];
    }

    // Method to fetch and load product data from the JSON file
    async loadData() {
        try {
            const response = await fetch(this.jsonFilePath);
            if (!response.ok) {
                throw new Error('Failed to fetch product data');
            }
            this.products = await response.json();
        } catch (error) {
            console.error('Error loading product data:', error);
        }
    }

    // Method to return the loaded products
    getProducts() {
        return this.products;
    }
}