// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener('touchend', (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener('click', callback);
}

// a function to get a parameter from the URL when we need to.
export function getParam(param) {
  //grab the query string
  const queryString = window.location.search;
  //parse the query string's parameter
  const urlParams = new URLSearchParams(queryString);
  // return the first value associated with the given search parameter:
  const product = urlParams.get(param);
  //return result
  return product;

}