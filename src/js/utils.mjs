// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

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
  const element = qs(selector); // Select the element once
  if (element) {
    element.addEventListener('touchend', (event) => {
      event.preventDefault();
      callback();
    });
    element.addEventListener('click', callback);
  } else {
    console.warn(`Element with selector "${selector}" not found.`);
  }
}

// Utility to render list items with a template function
export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
  if (!parentElement || !Array.isArray(list)) {
    console.error("Invalid parentElement or list provided.");
    return;
  }

  // Clear the element if the clear flag is set to true
  if (clear) {
    parentElement.innerHTML = '';
  }

  // Convert the list to HTML using the template function
  const htmlStrings = list.map(templateFn);
  
  // Insert the HTML string into the parent element at the specified position
  parentElement.insertAdjacentHTML(position, htmlStrings.join(''));
}

// Utility to get query parameters from URL
export function getParams(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}