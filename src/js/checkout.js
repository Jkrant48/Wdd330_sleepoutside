import { loadHeaderFooter } from './utils.mjs';
import CheckoutProcess from './checkoutprocess.mjs';

//runs on checkout/index.html

loadHeaderFooter();
const myCheckOut = new CheckoutProcess('so-cart', 'order-summary');
myCheckOut.init();

document
  .querySelector("#zip")
  .addEventListener("blur", myCheckOut.calculateOrdertotal.bind(myCheckOut));
// listening for click on the button
document.querySelector("#submit-order").addEventListener("click", (e) => {
  e.preventDefault();

  myCheckOut.checkout();
});

