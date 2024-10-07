const baseURL = import.meta.env.VITE_SERVER_URL;

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error('Bad Response');
  }
}

export default class ProductData {
  
  constructor(category) {
    this.category = category; // Store category in the instance
  }

  async getData() {    
    try {
      const response = await fetch(baseURL + `products/search/${this.category}`); 
      const data = await convertToJson(response);
      return data.Result; // Ensure this returns data with discount info
    } catch (error) {
      console.error('Error fetching product data in getData:', error);
    }
  }

  async findProductById(id) {
    try {
      const url = `${baseURL}product/${id}`;
      const response = await fetch(url);
      const data = await convertToJson(response);
      return data.Result;
    } catch (error) {
      console.error('Error fetching product data in findProductById:', error);
    }
  }
}
