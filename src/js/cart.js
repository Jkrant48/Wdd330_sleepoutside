import { getLocalStorage } from './utils.mjs';

const cartFooterDOM = document.querySelector('.cart-footer');
const cartTotalDOM = document.querySelector('.cart-total');
const cartProductListDOM = document.querySelector('.product-list');

function renderCartContents() {
  const cartItems = getLocalStorage('so-cart') || [];
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  cartProductListDOM.innerHTML = htmlItems.join('');
  displayTotal(cartItems);

  
}

function cartItemTemplate(item) {
  const newItem = `<li class='cart-card divider'>
  <a href='#' class='cart-card__image'>
    <img
      src='${item.Image}'
      alt='${item.Name}'
    />
  </a>
  <a href='#'>
    <h2 class='card__name'>${item.Name}</h2>
  </a>
  <p class='cart-card__color'>${item.Colors[0].ColorName}</p>
  <p class='cart-card__quantity'>qty: 1</p>
  <p class='cart-card__price'>$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

function isCartEmpty(cart) {

  if (cart === null) {
    console.log('cart is null, true');
    return true;
  } else {
    console.log('cart is null, false')
    return false;
  }
}

function displayTotal(cart) {
  if (isCartEmpty(cart)) {
    console.log('displayTotal=false');
    cartFooterDOM.classList.add('.hide');
  } else { 
    console.log('displayTotal == true');
    cartFooterDOM.classList.remove('.hide')
  }  
  calcTotal(cart);
}

function calcTotal(cart) {
  let tempTotal = 0;
  // cart.map()

  cartTotalDOM.innerHTML = `Total: $ ${tempTotal}`;
}

renderCartContents();
