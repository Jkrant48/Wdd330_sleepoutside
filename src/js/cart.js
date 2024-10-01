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

//Kerri feature code week 2: isCartEmpty, displayTotal and calTotal
function isCartEmpty(cart) { 
  if (cart.length === 0) {
    return true;
  } else {    
    return false;
  }
}

function calcTotal(cart) {
  let tempTotal = 0;
  // let itemsTotal = 0;
  cart.map((item) => {
    //itemsTotal += quantity; - or something like this,
    tempTotal += item.FinalPrice; //* quantity when we get quantity variable added
  });

  cartTotalDOM.innerHTML = `Total: $ ${tempTotal}`;
}

function displayTotal(cart) {
  
  if (isCartEmpty(cart)) {
    cartFooterDOM.classList.add('hide');
  } else {
    cartFooterDOM.classList.remove('hide');
  }  
  calcTotal(cart);
}

renderCartContents();
