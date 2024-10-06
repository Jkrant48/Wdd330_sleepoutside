// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

//get product information from the url
export function getParams(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

//function to render products with a template
export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = 'afterbegin',
  clear = false,
) {
  const htmlStrings = list.map(templateFn);
  // if clear is true we need to clear out the contents of the parent.
  if (clear) {
    parentElement.innerHTML = '';
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(''));
}

//function to render with a template
export function renderWithTemplate(
  template,
  parentElement,
  data,
  callback  
) {
    parentElement.insertAdjacentHTML('afterbegin', template);
    if(callback) {
      callback(data);
    }
    
}


export async function loadTemplate(path) {
  const html = await fetch(path);
  const template = await html.text();
  return template;
}

export async function loadHeaderFooter() {
  //load the header and footer
  const headerTemplate = await loadTemplate('../partials/header.html');
  const footerTemplate = await loadTemplate('../partials/footer.html');

  //get the DOM elements
  const headerDOM = document.querySelector('#main-header');
  const footerDOM = document.querySelector('#main-footer');
  //render the header and footer
  renderWithTemplate(headerTemplate, headerDOM);
  renderWithTemplate(footerTemplate, footerDOM);
  
  updateCartCount();
}

//Kerri added function to update cart count
export function updateCartCount() {
  const cart = getLocalStorage('so-cart') || []; //retrieve the cart or initialize empty array
  // console.log(`cart after getLocalStorage: ${cart}`);
  const cartCount = cart.length;    //this will need to be updated if we create a variable that increase amount of each item
  //update the court count in the header
  const cartCountElement = qs('#cart-count');
  if (cartCountElement) {
    //display count or empty if zero
    cartCountElement.textContent = cartCount;
  }  
}


// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener('touchend', (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener('click', callback);
}