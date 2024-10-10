import { loadHeaderFooter } from './utils.mjs';
import CheckoutProcess from './checkoutprocess.mjs';

//runs on checkout/index.html

loadHeaderFooter();
const myCheckOut = new CheckoutProcess('so-cart', 'order-summary');
myCheckOut.init();
