const baseURL = import.meta.env.VITE_SERVER_URL

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error('Bad Response');
  }
}

export default class ProductData {
  // constructor() {}
  constructor (category) {console.log('inside ProductData constructor');}
  //   // this.category = category;
  //   // this.path = `/json/${this.category}.json`;
  // }
  async getData(category) {    //set default value for category if nothing is passed
    console.log('inside: getData()');
    console.log(baseURL + `products/search/${category}`);
    const response = await fetch(baseURL + `products/search/${category}`); 
    console.log('getData: response');
    console.log(response);
    const data = await convertToJson(response);
    console.log('getData: data');
    console.log(data);
    return data.Result;

    // return fetch(this.path)
    //   .then(convertToJson)
    //   .then((data) => data);
  }


  async findProductById(id) {
    try {
      const url = `${baseURL}product/${id}`;
      console.log('Fetching product data from URL:', url); // Log the full URL
      const response = await fetch(url);
      const data = await convertToJson(response);
      return data.Result;
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  }
  
  // async findProductById(id) {
  //   // const products = await this.getData();
  //   // return products.find((item) => item.Id === id);

  //   const response = await fetch(`{baseURL} product/${id}`);
  //   const data = await convertToJson(response);
  //   return data.Result;
  // }
}
