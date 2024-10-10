const baseURL = import.meta.env.VITE_SERVER_URL

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error('Bad Response');
  }
}

export default class ExternalServices {
  
  constructor (category) {
    // console.log('inside ProductData constructor');
    }
  
  async getData(category) {    //set default value for category if nothing is passed
    try {
    // console.log('inside: getData()');
    // console.log(baseURL + `products/search/${category}`);
    const response = await fetch(baseURL + `products/search/${category}`); 
    // console.log('getData: response');
    // console.log(response);
    const data = await convertToJson(response);
    // console.log('getData: data');
    // console.log(data);
    return data.Result;
    } catch (error) {
      console.error('Error fetching product data in getData:', error);
    }
  }


  async findProductById(id) {
    try {
      const url = `${baseURL}product/${id}`;
      // console.log('Fetching product data from URL:', url); // Log the full URL
      const response = await fetch(url);
      const data = await convertToJson(response);
      return data.Result;
    } catch (error) {
      console.error('Error fetching product data in findProductById:', error);
    }
  }
  

} 
