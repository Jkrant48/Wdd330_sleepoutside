import { loadHeaderFooter } from './utils.mjs';
import ShoppingCart from './shoppingCart.mjs';

//runs on cart/index.html

// const cartFooterDOM = document.querySelector('.cart-footer');
// const cartTotalDOM = document.querySelector('.cart-total');
// const cartProductListDOM = document.querySelector('.product-list');

loadHeaderFooter();

const cart = new ShoppingCart('so-cart', '.product-list', '.cart-footer');
cart.renderCartContents();
