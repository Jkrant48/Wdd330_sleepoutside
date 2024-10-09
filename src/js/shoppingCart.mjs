import { getLocalStorage, setLocalStorage, updateCartCount } from './utils.mjs';

function cartItemTemplate(item) {
  const newItem = `<li class='cart-card divider'>
    <span id='remove-btn' data-id=${item.Id}>❌</span>
    <a href='#' class='cart-card__image'>
      <img
        src='${item.Images.PrimarySmall}'
        alt='${item.Name}'
      />
    </a>
    <a href='#'>
      <h2 class='card__name'>${item.Name}</h2>
    </a>
    <p class='cart-card__color'>${item.Colors[0].ColorName}</p>
    <p class='cart-card__quantity'>
    <span id='reduce-btn' data-id=${item.Id}>&minus;</span> qty: ${item.quantity} 
    <span id='increase-btn' data-id=${item.Id}>&plus;</span></p> 
    <p class='cart-card__price'>$${item.FinalPrice}</p>
  </li>`;

  return newItem;
}

//key is the local storage key, productList is: document.querySelector('.product-list'), cartFooter is: document.querySelector('.cart-footer')
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
    increaseInCart(this.key);
    decreaseInCart(this.key);
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

//functions to increase or decrease quantity
function increaseInCart(key) {
  document.querySelectorAll('#increase-btn').forEach((button) => {
    button.addEventListener(
      'click',
      (event) => {
        const productId = event.target.dataset.id;
        increaseItem(key, productId);
        updateCartCount();
        window.location.reload();
      },
      //const productId = event.target.closest('.cart-card divider').dataset.id;
    );
  });
}

function decreaseInCart(key) {
  document.querySelectorAll('#reduce-btn').forEach((button) => {
    button.addEventListener(
      'click',
      (event) => {
        const productId = event.target.dataset.id;
        decreaseItem(key, productId);
        updateCartCount();
        window.location.reload();
      },
      //const productId = event.target.closest('.cart-card divider').dataset.id;
    );
  });
}
//function to increase
function increaseItem(key, productId) {
  const cartItems = getLocalStorage(key);
  const item = cartItems.find((item) => item.Id === productId);
  if (item) {
    item.quantity += 1;
    const updateCart = cartItems.map((cartItem) =>
      cartItem.Id === productId ? item : cartItem,
    );
    setLocalStorage(key, updateCart);
  }
}
//function to decrease
function decreaseItem(key, productId) {
  const cartItems = getLocalStorage(key);
  const item = cartItems.find((item) => item.Id === productId);
  if (item && item.quantity > 1) {
    item.quantity -= 1;
    const updateCart = cartItems.map((cartItem) =>
      cartItem.Id === productId ? item : cartItem,
    );
    setLocalStorage(key, updateCart);
  }
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
  
  cart.map((item) => {   
    tempTotal += item.FinalPrice * item.quantity; 
  });

  cartTotalDOM.innerHTML = `Subtotal: $ ${tempTotal.toFixed(2)}`;
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

  //display cart checkout button if there is a total
  document.getElementById('checkout-btn').addEventListener('click', () => {
    window.location.href = '../checkout/index.html';  // Redirect to checkout page
  });

}
