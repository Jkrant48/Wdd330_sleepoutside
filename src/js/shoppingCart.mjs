import { getLocalStorage, setLocalStorage } from './utils.mjs';

function cartItemTemplate(item) {
  const newItem = `<li class='cart-card divider'>
    <span id='remove-btn' data-id=${item.Id}>❌</span>
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

export default class ShoppingCart {
  constructor(key, productList, cartFooterDOM) {
    this.key = key;
    this.productList = productList;
    this.cartFooterDOM = cartFooterDOM;
  }

  renderCartContents() {
    const cartItems = getLocalStorage(this.key);
    if (cartItems === undefined || cartItems === null) cartItems = [];
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    // console.log(htmlItems);
    document.querySelector(this.productList).innerHTML = htmlItems.join('');
    removeFromCart(this.key);
    displayTotal(cartItems, this.cartFooterDOM);
  }
}

function removeFromCart(key) {
  document.querySelectorAll('#remove-btn').forEach((button) => {
    button.addEventListener('click', (event) => {
      if (event.target.id === 'remove-btn') {
        const productId = event.target.dataset.id;
        removeItem(key, productId);
      }
    });
  });
}

function removeItem(key, productId) {
  const cartItems = getLocalStorage(key);
  const updateCart = cartItems.filter((item) => item.Id !== productId);
  setLocalStorage(key, updateCart);
  window.location.reload();
}

//Kerri's feature
function isCartEmpty(cart) {
  if (cart.length === 0) {
    return true;
  } else {
    return false;
  }
}

function calcTotal(cart, cartTotalDOM) {
  let tempTotal = 0;
  // let itemsTotal = 0;
  cart.map((item) => {
    //itemsTotal += quantity; - or something like this,
    tempTotal += item.FinalPrice; //* quantity when we get quantity variable added
  });

  cartTotalDOM.innerHTML = `Total: $ ${tempTotal.toFixed(2)}`;
}

function displayTotal(cart, cartFooterDOM) {
  const cartFootDOM = document.querySelector(cartFooterDOM);
  const totalDOM = document.querySelector('.cart-total');
  if (isCartEmpty(cart)) {
    cartFootDOM.classList.add('hide');
  } else {
    cartFootDOM.classList.remove('hide');
  }
  calcTotal(cart, totalDOM);
}
