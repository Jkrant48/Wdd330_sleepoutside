//generate a list of product cards in HTML from an array

export default class ProductListing {
    //takes product category, the dataSource and the HTML element to render product list to
    constructor (category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;  //I declare it here even though I set it in the init()
        this.listElement = listElement;
    }

    async init() {
        this.dataSource = await this.dataSource.getData();
        // console.log(dataSource);
    }
    
}