import { getLocalStorage, setLocalStorage, alertMessage, removeAllAlerts } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();

function formDataToJSON(formElement) {
  const formData = new FormData(formElement),  //FormData is part of available WebAPIs with javascritp.  We don't have to define it.
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

  // takes the items currently stored in the cart (localstorage) and returns them in a simplified form.
  function packageItems(items) {
    const simplifiedItems = items.map((item) => {
  
      return {
        id: item.Id,
        price: item.FinalPrice,
        name: item.Name,
        quantity: item.quantity,
      };
    });
    
    return simplifiedItems;
  }
  


export default class CheckoutProcess {
    constructor(key, outputSelector) {
      this.key = key;
      this.outputSelector = outputSelector;
      this.list = [];
      this.quantityTotal = 0;
      this.orderSubtotal = 0;
      this.shipping = 0;
      this.tax = 0;
      this.orderTotal = 0;
    }
  
    init() {
      this.list = getLocalStorage(this.key);
      this.calculateItemSummary(this.list);
    }
  
    calculateItemSummary(list) {    
        let tempTotal = 0;  
        this.list.map((item) => {
        tempTotal += item.FinalPrice * item.quantity; //* quantity when we get quantity variable added
        
        this.orderSubtotal = tempTotal;
  });        
        this.quantityTotal =this.list.reduce((total, item) => total + item.quantity, 0);
        document.querySelector('#num-Items').innerHTML = `${this.quantityTotal}`;
        document.querySelector('#subtotal').innerHTML = ` ${this.orderSubtotal.toFixed(2)}`;
       
        this.calculateOrdertotal();
    }
  
    calculateOrdertotal() {
      // calculate the shipping and tax amounts. Then use them to along with the cart total to figure out the order total
      this.tax = this.orderSubtotal * .06;
     
      this.shipping = 10 + ((this.quantityTotal -1) * 2);
      
      // display the totals.
      this.orderTotal = this.orderSubtotal + this.tax + this.shipping
      this.displayOrderTotals();
    }
  
    displayOrderTotals() {
      // once the totals are all calculated display them in the order summary page
    //   const orderSummaryDOM = document.querySelector('#order-summary');
        // orderSummaryDOM.appendChild(this.checkoutProcessTemplate());

        //this.checkoutProcessTemplate();
        
        document.querySelector('#tax').innerHTML = `${this.tax.toFixed(0)}`;
        document.querySelector('#shipping').innerHTML = `${this.shipping.toFixed(2)}`;
        document.querySelector('#total').innerHTML = `${this.orderTotal.toFixed(2)}`;
    }

    async checkout() {
      // build the data object from the calculated fields, the items in the cart, and the information entered into the form
        const formElement = document.forms["checkout"];
        
        const json = formDataToJSON(formElement);
        
        // add totals, and item details
        json.orderDate = new Date();
        json.orderTotal = this.orderTotal; 
        json.tax = this.tax;
        json.shipping = this.shipping;
        json.items = packageItems(this.list);
        
        try {
          const res = await services.checkout(json);          
          console.log(res);
          // console.log(res.orderId);
          // alert(res.message + '  Order ID: ' + res.orderId);  
          setLocalStorage("so-cart", []);
          location.assign("/checkout/success.html");        
        } catch (err) {
          // console.log('Result error log:  ' + err);
           // get rid of any preexisting alerts.
          removeAllAlerts();
          // alert('Network service error.') + err;
          for (let message in err.message) {
          alertMessage(err.message[message]);
        }
      }      
       
    }
  
}



