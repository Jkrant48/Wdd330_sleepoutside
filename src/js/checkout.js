import { loadHeaderFooter } from './utils.mjs';
import CheckoutProcess from './CheckoutProcess.mjs';
// import CheckoutProcess from './checkoutprocess.mjs';  //this one VSCode likes, but it is wrong and creates errors

//runs on checkout/index.html

loadHeaderFooter();
const myCheckOut = new CheckoutProcess('so-cart', 'order-summary');
myCheckOut.init();

document
  .querySelector('#zip')
  .addEventListener('blur', myCheckOut.calculateOrdertotal.bind(myCheckOut));

// listening for click on the button
document.querySelector('#submit-order').addEventListener('click', (e) => {
  e.preventDefault();
  const myForm = document.forms[0];
  // console.log('myForm: ' + myForm);
  const chk_status = myForm.checkValidity();
  // console.log('chk_status: ' + chk_status);
  myForm.reportValidity();
  if (chk_status) myCheckOut.checkout();
});
