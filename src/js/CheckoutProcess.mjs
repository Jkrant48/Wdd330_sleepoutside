import { getLocalStorage } from "./utils.mjs";


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
        // console.log(tempTotal);
        this.orderSubtotal = tempTotal;
  });        
        this.quantityTotal =this.list.reduce((total, item) => total + item.quantity, 0);

        document.querySelector('#subtotal').innerHTML = ` ${this.orderSubtotal.toFixed(2)}`;
        // console.log(this.list);
        // console.log(this.quantityTotal);
        // console.log(this.orderSubtotal);


        this.calculateOrdertotal();
    }
  
    calculateOrdertotal() {
      // calculate the shipping and tax amounts. Then use them to along with the cart total to figure out the order total
      this.tax = this.orderSubtotal * .06;
      console.log(this.tax);  
      this.shipping = 10 + ((this.quantityTotal -1) * 2);
        console.log(this.shipping);
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

//     checkoutProcessTemplate() {
//         `<fieldset>
//         <legend>Order Summary</legend>
//         <p>Subtotal: $${this.orderSubtotal}</p>
//         <p>Shipping Estimate: $${this.shipping}</p>
//         <p>Tax: $${this.tax}</p>
//         <p>Total: $${this.orderTotal}</p>
//         </fieldset>
//         <button type="submit" id="submit-order">Checkout</button>`
// }

  }