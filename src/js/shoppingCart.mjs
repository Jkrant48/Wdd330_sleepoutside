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
  constructor(key, productList) {
    this.key = key;
    this.productList = productList;
  }

  renderCartContents() {
    let cartItems = getLocalStorage(this.key);
    if (cartItems === undefined || cartItems === null) cartItems = [];
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(this.productList).innerHTML = htmlItems.join('');
    removeFromCart(this.key);
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