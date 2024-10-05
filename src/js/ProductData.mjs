const baseURL = import.meta.env.VITE_SERVER_URL

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error('Bad Response');
  }
}

export default class ProductData {
  constructor(category) {}
  // // (category) {
  //   // this.category = category;
  //   // this.path = `/json/${this.category}.json`;
  // }
  async getData(category = "tents") {    //set default value for category if nothing is passed
    const response = await fetch(baseURL + 'products/search/${category}'); //added forward slash to line before products
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
    // const products = await this.getData();
    // return products.find((item) => item.Id === id);

    const response = await fetch(baseURL + 'product/${Id}');
    const data = await convertToJson(response);
    return data.Result;
  }
}
