const baseURL = import.meta.env.VITE_SERVER_URL
// const baseURL = 'https://wdd330-backend.onrender.com/';


async function convertToJson(res) {
  const jsonResponse = await res.json();  // Convert the response to JSON first
  
  if (res.ok) {
    return jsonResponse;  // If response is okay, return the JSON data
  } else {
    // Throw a custom error object with the response body
    throw { 
      name: 'servicesError', 
      message: jsonResponse 
    };
  }
}

export default class ExternalServices {
  
  constructor (category) {    
    }
  
  async getData(category) {    //set default value for category if nothing is passed
    try {
    const response = await fetch(baseURL + `products/search/${category}`);   
    const data = await convertToJson(response);

    return data.Result;
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
  
 
  async checkout(payload) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    
    return await fetch(baseURL + 'checkout/', options).then(convertToJson);
  }

} 
